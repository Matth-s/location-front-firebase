import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type Props = {
  search: string;
  filter: string;
};

const BookingSearchBar = ({ search, filter }: Props) => {
  let [, setSearchParams] = useSearchParams();

  const { handleSubmit, register } = useForm({
    values: {
      search,
      filter,
    },
  });

  const processForm = (data: { search: string; filter: string }) => {
    setSearchParams(
      `filtre=${data.filter}&search=${data.search.replaceAll(
        ' ',
        '_'
      )}`
    );
  };

  return (
    <div className="search-bar-booking-container">
      <form onSubmit={handleSubmit(processForm)}>
        <select {...register('filter')} id="select">
          <option value="">Choisir un filtre</option>
          <option value="nom">Nom</option>
          <option value="materiel">Matériel</option>
          <option value="prenom">Prénom</option>
          <option value="encours">En cours</option>
          <option value="termine">Terminé</option>
        </select>

        <input
          type="text"
          {...register('search')}
          placeholder="Recherche ..."
        />

        <input type="submit" value="Appliquer les filtres" />
      </form>
    </div>
  );
};

export default BookingSearchBar;
