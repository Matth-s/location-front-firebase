import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type Props = {
  search: string;
};

const MaterialSearchBar = ({ search }: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>(search);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSearchParams(`recherche=${searchInput}`);
  };

  return (
    <div className="material-search-bar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Je recherche ..."
          onChange={(e) => setSearchInput(e.target.value.trim())}
          defaultValue={searchInput}
        />
        <input type="submit" value="Rechercher" />
      </form>
    </div>
  );
};

export default MaterialSearchBar;
