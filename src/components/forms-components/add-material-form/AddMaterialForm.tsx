import {
  materialSchema,
  providedMaterialsSchema,
} from '../../../schema';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';

type Props = {
  providedMaterials: providedMaterialsSchema[];
  setValue: UseFormSetValue<materialSchema>;
  register: UseFormRegister<materialSchema>;
  errors: FieldErrors<materialSchema>;
};

const AddMaterialForm = ({
  providedMaterials,
  setValue,
  errors,
  register,
}: Props) => {
  const handleDeleteMaterial = (id: string) => {
    const providedMaterialsFiltred = providedMaterials.filter(
      (providedMaterial) => providedMaterial.id !== id
    );

    setValue('providedMaterials', providedMaterialsFiltred);
  };

  const handleAddMaterial = () => {
    const newProviedMaterial: providedMaterialsSchema = {
      id: uuidv4(),
      materialName: '',
      price: 1,
    };

    setValue('providedMaterials', [
      ...providedMaterials,
      newProviedMaterial,
    ]);
  };

  return (
    <div className="add-material-form">
      <h2>Matériel founit</h2>

      {errors.providedMaterials && (
        <p>
          Les noms de materiels doivent être renseigné et les prix
          doivent être supérieur à 1
        </p>
      )}

      {providedMaterials.length > 0 &&
        providedMaterials.map((providedMaterial, index) => (
          <div key={providedMaterial.id}>
            <input
              type="text"
              {...register(`providedMaterials.${index}.materialName`)}
              placeholder="Nom du materiel"
            />
            <input
              type="number"
              {...register(`providedMaterials.${index}.price`)}
              onWheel={(event) => event.currentTarget.blur()}
              placeholder="prix"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteMaterial(providedMaterial.id)
              }
            >
              X
            </button>
          </div>
        ))}
      <button type="button" onClick={() => handleAddMaterial()}>
        Ajouter un matériel
      </button>
    </div>
  );
};

export default AddMaterialForm;
