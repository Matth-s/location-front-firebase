import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import iconCross from '../../assets/icon-cross.svg';

import './styles.scss';

type Props = {
  search: string;
};

const MaterialSearchBar = ({ search }: Props) => {
  let [, setSearchParams] = useSearchParams();

  const { handleSubmit, register, watch, setValue } = useForm({
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
        <div>
          <input
            type="text"
            placeholder="Je recherche ..."
            {...register('search')}
          />
          {watch('search') !== '' && (
            <button
              onClick={() => {
                setSearchParams('');
                setValue('search', '');
              }}
            >
              <img src={iconCross} alt="supprimer la recherche" />
            </button>
          )}
        </div>
        <input type="submit" value="Rechercher" />
      </form>
    </div>
  );
};

export default MaterialSearchBar;
