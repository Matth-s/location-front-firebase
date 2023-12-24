import { useForm } from 'react-hook-form';
import { arrayPictureSchema, materialSchema } from '../../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialValidation } from '../../../validations';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { toastifySetup } from '../../../utils/toastifySetup';
import { updateMaterialService } from '../../../services/material-service';
import { updateImageService } from '../../../services/image-service';

import isEqual from 'lodash.isequal';

import AddMaterialForm from '../../forms-components/add-material-form/AddMaterialForm';
import ImportImageForm from '../../forms-components/import-images-form/ImportImageForm';

import './styles.scss';

type Props = {
  material: materialSchema;
};

const EditMaterialForm = ({ material }: Props) => {
  const dispatch = useAppDispatch();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: material,
    resolver: zodResolver(materialValidation),
  });

  const processForm = async (data: materialSchema) => {
    setFormLoading(true);

    if (
      !isEqual(data.arrayPicture, material.arrayPicture) ||
      imagesToUpload.length > 0
    ) {
      const newArrayPicture: arrayPictureSchema[] = await dispatch(
        updateImageService({
          id: data.id,
          arrayPicture: data.arrayPicture,
          imagesToUpload: imagesToUpload,
        })
      ).unwrap();

      data.arrayPicture = [...newArrayPicture];
    }

    if (
      data.presentationPicture === '' &&
      data.arrayPicture.length > 0
    ) {
      data.presentationPicture = data.arrayPicture[0].src;
    }

    if (
      !data.presentationPicture.includes('https') &&
      data.arrayPicture.length > 0
    ) {
      const findImage = data.arrayPicture.find(
        (image) => image.id === data.presentationPicture
      );
      data.presentationPicture = findImage
        ? findImage.src
        : data.arrayPicture[0].src;
    }

    if (data.arrayPicture.length === 0) {
      data.presentationPicture = '';
    }

    await dispatch(updateMaterialService({ material: data }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: 'Le materiel à été mis à jour avec success',
          });
        }
      })
      .catch(() => {
        toastifySetup({
          success: false,
          message:
            'Une erreur est survenue lors de la mise a jour du matériel',
        });
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="edit-material-form-container">
      <h2>Modifier le matériel {material.name}</h2>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="form-div">
          <label htmlFor="name">Nom du matériel</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name?.message && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
          ></textarea>
          {errors.description?.message && (
            <p className="error-message">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="pricePerDay">Tarif par jour</label>
          <input
            type="number"
            id="pricePerDay"
            onWheel={(event) => event.currentTarget.blur()}
            {...register('pricePerDay')}
          />
          {errors.pricePerDay?.message && (
            <p className="error-message">
              {errors.pricePerDay.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="downPayment">Acompte</label>
          <input
            type="number"
            onWheel={(event) => event.currentTarget.blur()}
            id="downPayment"
            {...register('downPayment')}
          />
          {errors.downPayment?.message && (
            <p className="error-message">
              {errors.downPayment.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="coachingPriceHour">Tarif coaching</label>
          <input
            type="number"
            onWheel={(event) => event.currentTarget.blur()}
            id="coachingPriceHour"
            {...register('coachingPriceHour')}
          />
          {errors.coachingPriceHour?.message && (
            <p className="error-message">
              {errors.coachingPriceHour.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <AddMaterialForm
            providedMaterials={watch('providedMaterials')}
            setValue={setValue}
            errors={errors}
            register={register}
          />
        </div>

        <ImportImageForm
          presentationPicture={watch('presentationPicture')}
          arrayPicture={watch('arrayPicture')}
          imagesToUpload={imagesToUpload}
          setImagesToUpload={setImagesToUpload}
          setValue={setValue}
        />

        <div className="status-div">
          <input
            type="checkbox"
            id="status"
            {...register('visible')}
          />
          <label htmlFor="status">Mettre en ligne</label>
        </div>

        <input
          className={` ${formLoading ? 'form-loading' : ''} `}
          type="submit"
          value="Modifier"
        />
      </form>
    </div>
  );
};

export default EditMaterialForm;
