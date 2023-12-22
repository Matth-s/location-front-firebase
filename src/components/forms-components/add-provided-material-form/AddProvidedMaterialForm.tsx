import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {
  bookingSchema,
  providedMaterialsBookingSchema,
} from '../../../schema';

import iconCross from '../../../assets/icon-cross.svg';

import './styles.scss';

type Props = {
  providedMaterials: providedMaterialsBookingSchema[] | [];
  setValue: UseFormSetValue<bookingSchema>;
  register: UseFormRegister<bookingSchema>;
};

const AddProvidedMaterialForm = ({
  providedMaterials,
  setValue,
  register,
}: Props) => {
  const deleteProvidedMaterial = (id: string) => {
    const filtredProvidedMaterials = providedMaterials.filter(
      (providedMaterial) => providedMaterial.id !== id
    );

    setValue('providedMaterialsBooking', filtredProvidedMaterials);
  };

  return (
    <div className="add-provided-material-form-container">
      <h2>Materiel à founir</h2>

      {providedMaterials.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Matériel</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {providedMaterials.map((providedMaterial, index) => (
              <tr key={providedMaterial.id}>
                <td>
                  <input
                    type="text"
                    {...register(
                      `providedMaterialsBooking.${index}.materialName`
                    )}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onWheel={(event) => event.currentTarget.blur()}
                    {...register(
                      `providedMaterialsBooking.${index}.quantity`
                    )}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onWheel={(event) => event.currentTarget.blur()}
                    {...register(
                      `providedMaterialsBooking.${index}.price`
                    )}
                  />
                </td>
                <td>{providedMaterial.total}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      deleteProvidedMaterial(providedMaterial.id)
                    }
                  >
                    <img src={iconCross} alt="supprimer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Aucun</h3>
      )}
    </div>
  );
};

export default AddProvidedMaterialForm;
