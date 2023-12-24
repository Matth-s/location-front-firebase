import { useNavigate } from 'react-router-dom';
import { bookingSchema } from '../../schema';
import BookingStatus from '../booking-status/BookingStatus';
import { formatDate } from '../../helpers/fomatDate';

type Props = {
  booking: bookingSchema;
};

const BookingCard = ({ booking }: Props) => {
  const navigate = useNavigate();

  const {
    bookingDates,
    firstName,
    lastName,
    isCompleted,
    materialName,
    id,
  } = booking;

  const handleViewBooking = (id: string) => {
    navigate(`/reservation/${id}`);
  };

  return (
    <tr onClick={() => handleViewBooking(id)}>
      <td>{formatDate(bookingDates[0])}</td>
      <td>{formatDate(bookingDates[bookingDates.length - 1])}</td>
      <td>{lastName}</td>
      <td>{firstName}</td>
      <td>{materialName}</td>
      <td>
        <BookingStatus status={isCompleted} />
      </td>
    </tr>
  );
};

export default BookingCard;
