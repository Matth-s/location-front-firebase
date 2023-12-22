import {
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

import { bookingSchema } from '../../schema';

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
  },

  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#3E3E3E',
  },

  titleContainer: { flexDirection: 'row', marginTop: 24 },

  logo: { width: 90 },

  reportTitle: { fontSize: 16, textAlign: 'center' },

  addressTitle: { fontSize: 11, fontStyle: 'bold' },

  invoice: { fontWeight: 'bold', fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

  address: { fontWeight: 400, fontSize: 10 },

  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: 'bold',
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: '#DEDEDE',
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: 'whitesmoke',
    borderBottomWidth: 1,
  },

  tbody2: { flex: 2, borderRightWidth: 1 },
});

type Props = {
  receiptData: bookingSchema;
};

const BookingCardPdf = ({ receiptData }: Props) => {
  const bookingDate = new Date(receiptData.timestamp);
  const day = String(bookingDate.getDate()).padStart(2, '0');
  const month = String(bookingDate.getMonth() + 1).padStart(2, '0');
  const year = bookingDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        {/*<Image style={styles.logo} src={logo} /> */}
        <Text style={styles.reportTitle}>Entreprise Senosiain </Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Réservation </Text>
          <Text style={styles.invoiceNumber}>
            Réservation id: {receiptData.id}{' '}
          </Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>
            12 Rue Source du Luy
          </Text>
          <Text style={styles.addressTitle}>Limendous, France</Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Facturé à </Text>
          <Text style={styles.address}>
            {`${receiptData.street} ${receiptData.city}`}
          </Text>
        </View>
        <Text style={styles.addressTitle}>{formattedDate}</Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View
      style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}
    >
      <View style={[styles.theader, styles.theader2]}>
        <Text>Description</Text>
      </View>
      <View style={styles.theader}>
        <Text>Prix</Text>
      </View>
      <View style={styles.theader}>
        <Text>Quantité</Text>
      </View>
      <View style={styles.theader}>
        <Text>Total</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    receiptData.providedMaterialsBooking.length > 0 ? (
      receiptData.providedMaterialsBooking.map(
        (item) =>
          item.quantity > 0 && (
            <View key={item.id}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                  <Text>{item.materialName}</Text>
                </View>
                <View style={styles.tbody}>
                  <Text>{item.price.toFixed(2)} </Text>
                </View>
                <View style={styles.tbody}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.tbody}>
                  <Text>{item.total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )
      )
    ) : (
      <View></View>
    );

  const TableOthers = () => (
    <View>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Jour de location</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{receiptData.pricePerDay.toFixed(2)}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{receiptData.bookingDates.length}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>
            {(
              receiptData.bookingDates.length *
              receiptData.pricePerDay
            ).toFixed(2)}
          </Text>
        </View>
      </View>

      {receiptData.coachingTime > 0 && (
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>Coaching</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receiptData.coachingPriceHour.toFixed(2)}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receiptData.coachingTime}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {(
                receiptData.coachingPriceHour *
                receiptData.coachingTime
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Acompte</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{receiptData.downPayment.toFixed(2)}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>1</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{receiptData.downPayment.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{receiptData.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableOthers />
        <TableTotal />
      </Page>
    </Document>
  );
};

export default BookingCardPdf;
