import { providedMaterialsSchema } from '../../schema';

import './styles.scss';

type Props = {
  materialsProvided: providedMaterialsSchema[];
};

const MaterialProvided = ({ materialsProvided }: Props) => {
  return (
    <div className="provided-material-container">
      <h2>Matériel founi :</h2>
      <ul>
        {materialsProvided.length > 0 ? (
          materialsProvided.map((materialProvided) => (
            <li key={materialProvided.id}>
              <span>{materialProvided.materialName}</span> :{' '}
              {materialProvided.price}€
            </li>
          ))
        ) : (
          <li>
            <span>Aucun</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MaterialProvided;
