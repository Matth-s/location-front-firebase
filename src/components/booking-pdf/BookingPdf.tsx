import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import BookingCardPdf from '../booking-card-pdf/BookingCardPdf';
import { bookingSchema } from '../../schema';

import './style.scss';

type Props = {
  booking: bookingSchema;
};

const BookingPdf = ({ booking }: Props) => {
  const styles = {
    container: {
      width: '220px',
      borderRadius: '5px',
      padding: '15px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    },
    flex: {
      width: '100%',
      display: 'flex',
      gap: '50px',
      alignItems: 'center',
    },
    bold: { fontSize: '13px', fontWeight: 600 },
    thin: { fontSize: '11px', color: '#6f6f6f', fontWeight: 500 },
    btn: {
      borderRadius: '3px',
      border: '1px solid gray',
      display: 'flex',
      gap: '2px',
      padding: '3px',
      fontSize: '11px',
      color: '#4f4f4f',
      fontWeight: 600,
      cursor: 'pointer',
      userSelect: 'none',
    },
  };

  return (
    <div className="view-booking-pdf-container  absolute absolute__center">
      <div
        style={{
          ...styles.flex,
        }}
      >
        <PDFDownloadLink
          document={<BookingCardPdf receiptData={booking} />}
          fileName={booking.id}
        >
          <span>Télécharger</span>
        </PDFDownloadLink>

        <BlobProvider
          document={<BookingCardPdf receiptData={booking} />}
        >
          {({ url }) => (
            <a href={url as string} target="_blank">
              <span>Imprimer</span>
            </a>
          )}
        </BlobProvider>
      </div>
    </div>
  );
};

export default BookingPdf;
