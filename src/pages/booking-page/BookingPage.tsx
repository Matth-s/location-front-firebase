import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getBookingService } from '../../services/booking-service';
import { useSearchParams } from 'react-router-dom';

import BookingCard from '../../components/booking-card/BookingCard';
import Header from '../../components/header/Header';
import BookingSearchBar from '../../components/booking-search-bar/BookingSearchBar';

import './styles.scss';
import Loader from '../../components/loader/Loader';

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, bookings, error } = useAppSelector(
    (state) => state.bookingSlice
  );
  let [searchParams] = useSearchParams();

  let filterParam = searchParams.get('filtre');
  let searchParam = searchParams.get('search');

  if (!filterParam) {
    filterParam = '';
  }

  if (searchParam) {
    searchParam = searchParam.replaceAll('_', ' ');
  } else {
    searchParam = '';
  }

  useEffect(() => {
    dispatch(getBookingService());
  }, [isLoading]);

  return (
    <div className="booking-page-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>une erreur est survenue</p>
      ) : (
        <div className="booking-page-content">
          <BookingSearchBar
            filter={filterParam}
            search={searchParam}
          />

          {filterParam.length > 0 && searchParam.length > 0 && (
            <p>
              4 resultats pour le filtre '{filterParam}' et avec le
              nom {searchParam}{' '}
            </p>
          )}

          <table>
            <thead>
              <tr>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Matériel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <tr>
                  <td>Aucun</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
