import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  getBookingService,
  patchStatusBookingService,
} from '../../services/booking-service';
import { useParams } from 'react-router-dom';
import { setModalToOpen } from '../../store/features/modal-slice';
import { toastifySetup } from '../../utils/toastifySetup';
import { formatDate } from '../../helpers/fomatDate';

import ActionBar from '../../components/action-bar/ActionBar';
import Header from '../../components/header/Header';
import ModalProvider from '../../components/modal-provider/ModalProvider';
import BookingInformation from '../../components/booking-information/BookingInformation';
import BookingProvidedMaterial from '../../components/boooking-provided-material/BookingProvidedMaterial';
import Loader from '../../components/loader/Loader';

import './styles.scss';

const ViewBookingPage = () => {
  const { isLoading, bookings, error } = useAppSelector(
    (state) => state.bookingSlice
  );

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (isLoading) {
      dispatch(getBookingService());
    }
  }, [isLoading]);

  const findBooking = bookings.find((booking) => booking.id === id);

  const handlePatchStatus = async () => {
    await dispatch(patchStatusBookingService({ id: id as string }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: 'Le status de la réservation à été modifé',
          });
        }
      })
      .catch(() =>
        toastifySetup({
          success: false,
          message:
            'Une erreur est survenue lors du changement de status',
        })
      );
  };

  return (
    <div>
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>une erreur est survenue</p>
      ) : findBooking ? (
        <div className="view-booking-container">
          <ActionBar>
            <button onClick={() => dispatch(setModalToOpen(7))}>
              Modifier
            </button>
            <button onClick={() => handlePatchStatus()}>
              {findBooking.isCompleted
                ? 'Marquer comme en cours'
                : 'Marquer comme terminé'}
            </button>
            <button onClick={() => dispatch(setModalToOpen(6))}>
              Devis
            </button>
            <button onClick={() => dispatch(setModalToOpen(5))}>
              Supprimer
            </button>
          </ActionBar>

          <h2>
            Réservation de {findBooking.materialName} du{' '}
            {formatDate(findBooking.bookingDates[0])} au{' '}
            {formatDate(
              findBooking.bookingDates[
                findBooking.bookingDates.length - 1
              ]
            )}
          </h2>

          <div className="content-div">
            <BookingInformation booking={findBooking} />
            <BookingProvidedMaterial
              material={findBooking.providedMaterialsBooking}
            />
          </div>

          <ModalProvider booking={findBooking} />
        </div>
      ) : (
        <p>cette reservation n'existe pas</p>
      )}
    </div>
  );
};

export default ViewBookingPage;
