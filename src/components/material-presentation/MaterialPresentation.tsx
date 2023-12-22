import { materialSchema } from '../../schema';

import './styles.scss';

type Props = {
  material: materialSchema;
};

const MaterialPresentation = ({ material }: Props) => {
  const { description, downPayment, pricePerDay, coachingPriceHour } =
    material;

  return (
    <section className="material-presentation-container">
      <h2>Description : </h2>
      <div className="information-content">
        <p>
          <span>Description:</span> {description}
        </p>
        <p>
          <span>Prix par jour :</span>
          {pricePerDay}€
        </p>
        <p>
          <span>Tarif de coaching par heure :</span>
          {coachingPriceHour}€
        </p>
        <p>
          <span>Acompte :</span> {downPayment}€
        </p>
      </div>
    </section>
  );
};

export default MaterialPresentation;
