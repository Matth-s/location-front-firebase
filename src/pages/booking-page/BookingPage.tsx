import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getBookingService } from '../../services/booking-service';
import { useSearchParams } from 'react-router-dom';
import { useBookingSearch } from '../../hooks/useBookingSearch';

import BookingCard from '../../components/booking-card/BookingCard';
import Header from '../../components/header/Header';
import BookingSearchBar from '../../components/booking-search-bar/BookingSearchBar';
import Loader from '../../components/loader/Loader';

import './styles.scss';

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, bookings, error } = useAppSelector(
    (state) => state.bookingSlice
  );
  let [searchParams] = useSearchParams();

  let filterParam = searchParams.get('filtre') as string;
  let searchParam = searchParams.get('search') as string;

  if (!filterParam) {
    filterParam = '';
  }

  if (searchParam) {
    searchParam = searchParam.replaceAll('_', ' ');
  } else {
    searchParam = '';
  }

  const memoBookings = useMemo(() => {
    return useBookingSearch({ bookings, searchParam, filterParam });
  }, [filterParam, searchParam, bookings]);

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

          {(filterParam.length > 0 || searchParam.length > 0) && (
            <h3>
              {memoBookings.length} resultat
              {memoBookings.length > 1 && 's'} pour le filtre '
              {filterParam === ('encours' || 'termine')
                ? ''
                : `${filterParam}`}
              '
            </h3>
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
              {memoBookings.length > 0 ? (
                memoBookings.map((booking) => (
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
