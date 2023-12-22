import { providedMaterialsBookingSchema } from '../../schema';

import './styles.scss';

type Props = {
  material: providedMaterialsBookingSchema[] | [];
};

const BookingProvidedMaterial = ({ material }: Props) => {
  return (
    <div className="booking-provided-material-container">
      <h3>Materiel à fournir :</h3>
      {material.length > 0 ? (
        <table className="material-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {material.map((item) => (
              <tr key={item.id}>
                <td>{item.materialName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun matériel</p>
      )}
    </div>
  );
};

export default BookingProvidedMaterial;
