import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { bookingSchema } from '../../../schema/index';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles.scss';

type Props = {
  disabledDates: string[];
  setValue: UseFormSetValue<bookingSchema>;
  bookingDates: string[] | [];
};

const BookingCalendar = ({
  disabledDates,
  setValue,
  bookingDates,
}: Props) => {
  const [focusedInput, setFocusedInput] = useState<any>(null);

  const [startDate, setStartDate] = useState<null | moment.Moment>(
    bookingDates.length > 0 ? moment(bookingDates[0]) : null
  );
  const [endDate, setEndDate] = useState<null | moment.Moment>(
    bookingDates.length > 0
      ? moment(bookingDates[bookingDates.length - 1])
      : null
  );

  const isDayBlocked = (day: moment.Moment) => {
    return disabledDates.includes(day.format('YYYY-MM-DD'));
  };

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate) {
      const datesInRange: string[] = [];
      let currentDate = moment(startDate);

      while (currentDate <= endDate) {
        datesInRange.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.clone().add(1, 'day');
      }

      setValue('bookingDates', datesInRange);
    }
  };
  useEffect(() => {
    const checkDisableDateError = bookingDates.filter((date) =>
      disabledDates.includes(date)
    );

    if (checkDisableDateError.length > 0) {
      setEndDate(null);
      setFocusedInput('endDate');
    }
  }, [bookingDates]);

  return (
    <div
      className={`booking-calendar-container`}
      style={{
        height: focusedInput ? '445px' : 'auto',
      }}
    >
      <h2>Dates de réservation</h2>
      <DateRangePicker
        startDate={startDate}
        startDateId="test_start_date_id"
        endDate={endDate}
        endDateId="test_end_date_id"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) =>
          setFocusedInput(
            focusedInput === 'endDate' ? 'endDate' : 'startDate'
          )
        }
        isDayBlocked={isDayBlocked}
        numberOfMonths={1}
        startDatePlaceholderText="Début"
        endDatePlaceholderText="Fin"
        hideKeyboardShortcutsPanel={true}
      />
    </div>
  );
};

export default BookingCalendar;
