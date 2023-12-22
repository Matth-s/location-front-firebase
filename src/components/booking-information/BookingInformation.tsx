import { bookingSchema } from '../../schema';

import './style.scss';

type Props = {
  booking: bookingSchema;
};

const BookingInformation = ({ booking }: Props) => {
  const { lastName, firstName, city, street, phone } = booking;

  return (
    <section className="booking-information-container">
      <div>
        <h3>Information client : </h3>
        <ul>
          <li>Nom: {lastName}</li>
          <li>Prénom: {firstName}</li>
          <li>Ville: {city}</li>
          <li>Rue: {street}</li>
          <li>Téléphone: {phone}</li>
        </ul>
      </div>
    </section>
  );
};

export default BookingInformation;
