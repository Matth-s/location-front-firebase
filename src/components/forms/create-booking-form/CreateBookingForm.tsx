import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormBookingSchema } from '../../../validations';
import { bookingSchema } from '../../../schema';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { createBookingService } from '../../../services/booking-service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { toastifySetup } from '../../../utils/toastifySetup';
import { totalSumBooking } from '../../../helpers/bookingHelpers';

import AddProvidedMaterialForm from '../../forms-components/add-provided-material-form/AddProvidedMaterialForm';
import DatePicker from '../../forms-components/date-picker-form/DatePickerFrom';

import './styles.scss';

type Props = {
  booking: bookingSchema;
};

const CreateBookingForm = ({ booking }: Props) => {
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: booking,
    resolver: zodResolver(FormBookingSchema),
  });

  const processForm = async (data: bookingSchema) => {
    setFormLoading(true);

    data = {
      ...data,
      id: uuidv4(),
      timestamp: Date.now(),
      total: totalSumBooking(data),
    };

    await dispatch(createBookingService({ booking: data }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          navigate(`/reservation/${res.id}`);
          toastifySetup({
            success: true,
            message: 'Reservation crée',
          });
        }
      })
      .catch(() => {
        toastifySetup({
          success: false,
          message: 'Une erreur est survenue',
        });
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="create-booking-form-container">
      <h2>Créer une réservation</h2>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="form-div">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
          />
          {errors.firstName?.message && (
            <p className="error-message">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
          />
          {errors.lastName?.message && (
            <p className="error-message">{errors.lastName.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="phone">Téléphone</label>
          <input type="tel" id="phone" {...register('phone')} />
          {errors.phone?.message && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="city">Ville</label>
          <input type="text" id="city" {...register('city')} />
          {errors.city?.message && (
            <p className="error-message">{errors.city.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="street">Rue</label>
          <input type="text" id="street" {...register('street')} />
          {errors.street?.message && (
            <p className="error-message">{errors.street.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="materialName">Nom du matériel</label>
          <input
            type="text"
            id="materialName"
            {...register('materialName')}
            disabled
          />
          {errors.materialName?.message && (
            <p className="error-message">
              {errors.materialName.message}
            </p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="coachingTime">Durée de coaching</label>
          <input
            type="number"
            id="coachingTime"
            {...register('coachingTime')}
            onWheel={(event) => event.currentTarget.blur()}
          />
          {errors.coachingTime?.message && (
            <p className="error-message">
              {errors.coachingTime.message}
            </p>
          )}
        </div>

        <AddProvidedMaterialForm
          setValue={setValue}
          register={register}
          providedMaterials={watch('providedMaterialsBooking')}
        />

        <DatePicker
          disabledDates={watch('unavailableDates')}
          setValue={setValue}
          bookingDates={watch('bookingDates')}
        />

        <input
          type="submit"
          className={`${formLoading ? 'form-loading' : ''}`}
          value="Créer la réservation"
        />
      </form>
    </div>
  );
};

export default CreateBookingForm;
