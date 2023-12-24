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
          <li>
            <span className="body-1">Nom: </span>
            {lastName}
          </li>
          <li>
            <span className="body-1">Prénom: </span>
            {firstName}
          </li>
          <li>
            <span className="body-1">Ville: </span>
            {city}
          </li>
          <li>
            <span className="body-1">Rue: </span> {street}
          </li>
          <li>
            <span className="body-1">Téléphone: </span> {phone}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BookingInformation;
