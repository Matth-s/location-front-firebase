import { useNavigate } from 'react-router-dom';
import { materialSchema } from '../../schema';

import iconEmpty from '../../assets/empty-image.svg';

import './styles.scss';

type Props = {
  material: materialSchema;
};

const MaterialCard = ({ material }: Props) => {
  const { description, presentationPicture, id, name } = material;
  const navigate = useNavigate();

  return (
    <div className="material-card-container">
      <div className="image-div">
        <img
          src={`${
            presentationPicture === ''
              ? iconEmpty
              : presentationPicture
          }`}
          alt={name}
        />
      </div>

      <div className="presentation-product">
        <h2>{name}</h2>

        <div className="cut-text">{description}</div>
      </div>

      <button onClick={() => navigate(`/materiel/${id}`)}>
        Afficher
      </button>
    </div>
  );
};

export default MaterialCard;
