import { useForm } from 'react-hook-form';
import { arrayPictureSchema, materialSchema } from '../../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialValidation } from '../../../validations';
import { useState } from 'react';
import { createMaterialService } from '../../../services/material-service';
import { useAppDispatch } from '../../../store/store';
import { toastifySetup } from '../../../utils/toastifySetup';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { postImageService } from '../../../services/image-service';

import AddMaterialForm from '../../forms-components/add-material-form/AddMaterialForm';
import ImportImageForm from '../../forms-components/import-images-form/ImportImageForm';

import './styles.scss';

const CreateMaterialForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const formValues: materialSchema = {
    id: ``,
    name: '',
    downPayment: 0,
    unavailableDates: [],
    providedMaterials: [],
    presentationPicture: '',
    arrayPicture: [],
    description: '',
    visible: true,
    pricePerDay: 0,
    coachingPriceHour: 0,
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formValues,
    resolver: zodResolver(materialValidation),
  });

  const processForm = async (data: materialSchema) => {
    data.id = uuidv4();

    setFormLoading(true);

    if (imagesToUpload.length > 0) {
      const urls: arrayPictureSchema[] = await dispatch(
        postImageService({ images: imagesToUpload, id: data.id })
      ).unwrap();

      data.arrayPicture = [...urls];

      if (data.presentationPicture === '') {
        data.presentationPicture = urls[0].src;
      }

      if (data.presentationPicture !== '') {
        const findImage = data.arrayPicture.find(
          (item) => item.id === data.presentationPicture
        );

        findImage ? (data.presentationPicture = findImage.src) : '';
      }
    }

    await dispatch(createMaterialService({ material: data }))
      .unwrap()
      .then((res: { status: number; id: string }) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: 'Le materiel à bien été crée',
          });
          navigate(`/materiel/${res.id}`);
        }
      })
      .catch(() =>
        toastifySetup({
          success: false,
          message:
            'Une erreur est survenue lors de la création du materiel',
        })
      )
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="create-material-form-container">
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
          className={formLoading ? 'form-loading' : ''}
          type="submit"
          value="Envoyer"
        />
      </form>
    </div>
  );
};

export default CreateMaterialForm;
