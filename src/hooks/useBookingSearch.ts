import { bookingSchema } from '../schema';

export const useBookingSearch = ({
  bookings,
  searchParam,
  filterParam,
}: {
  bookings: bookingSchema[];
  searchParam: string;
  filterParam: string;
}) => {
  let filtredData: bookingSchema[] = [];
  let searchParamLower = searchParam.toLowerCase();

  if (filterParam === 'encours' || filterParam === 'termine') {
    switch (filterParam) {
      case 'encours':
        filtredData = bookings.filter(
          (booking) => !booking.isCompleted
        );
        break;
      case 'termine':
        filtredData = bookings.filter(
          (booking) => booking.isCompleted
        );
        break;
      default:
        filtredData = bookings;
    }
  } else {
    switch (filterParam) {
      case 'materiel':
        filtredData = bookings.filter((booking) =>
          booking.materialName
            .toLowerCase()
            .includes(searchParamLower)
        );
        break;

      case 'prenom':
        filtredData = bookings.filter((booking) =>
          booking.firstName.toLowerCase().includes(searchParamLower)
        );
        break;

      case 'nom':
        filtredData = bookings.filter((booking) =>
          booking.lastName.toLowerCase().includes(searchParamLower)
        );
        break;

      default:
        filtredData = bookings;
    }
  }

  return filtredData;
};
