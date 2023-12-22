import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { deleteBookingService } from '../../../services/booking-service';
import { toastifySetup } from '../../../utils/toastifySetup';
import { setModalToOpen } from '../../../store/features/modal-slice';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  idBooking: string;
  idMaterial: string;
  bookingDates: string[];
};

const DeleteBookingForm = ({
  idBooking,
  idMaterial,
  bookingDates,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const { handleSubmit } = useForm();

  const processForm = async () => {
    setFormLoading(true);

    await dispatch(
      deleteBookingService({
        idBooking,
        idMaterial,
        bookingDates,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: 'Réservation supprimé',
          });
          navigate('/reservation');
        }
      })
      .catch(() =>
        toastifySetup({
          success: false,
          message: 'Une erreur est survenue',
        })
      )
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="delete-booking-container">
      <form onSubmit={handleSubmit(processForm)}>
        <p>Confirmez-vous la suppression de cette réservation ?</p>

        <div className="submit-div">
          <button
            type="button"
            value="Annuler"
            className={`${formLoading ? 'form-loading' : ''}`}
            onClick={() => dispatch(setModalToOpen(0))}
          >
            Annuler
          </button>

          <input
            type="submit"
            value="Supprimer"
            className={`${formLoading ? 'form-loading' : ''}`}
          />
        </div>
      </form>
    </div>
  );
};

export default DeleteBookingForm;
