import { useSearchParams } from 'react-router-dom';

import './styles.scss';
import { useForm } from 'react-hook-form';

type Props = {
  search: string;
};

const MaterialSearchBar = ({ search }: Props) => {
  let [, setSearchParams] = useSearchParams();

  const { handleSubmit, register } = useForm({
    values: {
      search: search,
    },
  });

  const processForm = (data: { search: string }) => {
    setSearchParams(`recherche=${data.search}`);
  };

  return (
    <div className="material-search-bar">
      <form onSubmit={handleSubmit(processForm)}>
        <input
          type="text"
          placeholder="Je recherche ..."
          {...register('search')}
        />
        <input type="submit" value="Rechercher" />
      </form>
    </div>
  );
};

export default MaterialSearchBar;
