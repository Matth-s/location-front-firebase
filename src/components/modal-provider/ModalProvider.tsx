import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/store';
import {
  bookingSchema,
  materialSchema,
  messagingSchema,
} from '../../schema';

import CloseModalButton from '../close-modal-button/CloseModalButton';
import DeleteMaterialForm from '../forms/delete-material-form/DeleteMaterialForm';
import EditMaterialForm from '../forms/edit-material-form/EditMaterialForm';
import CreateBookingForm from '../forms/create-booking-form/CreateBookingForm';
import DeleteBookingForm from '../forms/delete-booking-form/DeleteBookingForm';
import BookingPdf from '../booking-pdf/BookingPdf';
import EditBookingForm from '../forms/edit-booking-form/EditBookingForm';

import './styles.scss';
import DeleteMessagingForm from '../forms/delete-messaging-form/DeleteMessagingForm';

type Props = {
  material?: materialSchema;
  booking?: bookingSchema;
  messaging?: messagingSchema;
};

const ModalProvider = ({ material, booking, messaging }: Props) => {
  const { modalToOpen } = useAppSelector((state) => state.modalSlice);

  switch (modalToOpen) {
    case 1:
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <EditMaterialForm material={material as materialSchema} />
          </div>
        </div>,
        document.body
      );

    case 2:
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <CreateBookingForm booking={booking as bookingSchema} />
          </div>
        </div>,
        document.body
      );

    case 4:
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <DeleteMaterialForm
              material={material as materialSchema}
            />
          </div>
        </div>,
        document.body
      );

    case 5:
      if (booking) {
        return createPortal(
          <div className="modal-container">
            <CloseModalButton />
            <div className="modal-content">
              <DeleteBookingForm
                idBooking={booking.id}
                idMaterial={booking.idMaterial}
                bookingDates={booking.bookingDates}
              />
            </div>
          </div>,
          document.body
        );
      }
      return <></>;

    case 6:
      if (booking) {
        return createPortal(
          <div className="modal-container">
            <CloseModalButton />
            <div className="modal-content">
              <BookingPdf booking={booking} />
            </div>
          </div>,
          document.body
        );
      }

      return <></>;

    case 7:
      if (booking) {
        return createPortal(
          <div className="modal-container">
            <CloseModalButton />
            <div className="modal-content">
              <EditBookingForm booking={booking} />
            </div>
          </div>,
          document.body
        );
      }

      return <></>;

    case 8:
      if (messaging) {
        return createPortal(
          <div className="modal-container">
            <CloseModalButton />
            <div className="modal-content">
              <DeleteMessagingForm id={messaging.id} />
            </div>
          </div>,
          document.body
        );
      }
  }
};

export default ModalProvider;
