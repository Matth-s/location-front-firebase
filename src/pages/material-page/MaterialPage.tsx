import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMaterialsService } from '../../services/material-service';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Header from '../../components/header/Header';
import MaterialCard from '../../components/material-card/MaterialCard';
import MaterialSearchBar from '../../components/material-search-bar/MaterialSearchBar';
import Loader from '../../components/loader/Loader';

import './styles.scss';

const MaterialPage = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();

  const formatSearch = search
    .replace('?recherche=', '')
    .toLowerCase();

  const { isLoading, materials, error } = useAppSelector(
    (state) => state.materialSlice
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(getMaterialsService());
    }
  }, []);

  const filteredMaterials = formatSearch
    ? materials.filter((item) =>
        item.name.toLowerCase().includes(formatSearch)
      )
    : materials;

  return (
    <div className="material-page-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Une erreur est survenue</p>
      ) : (
        <>
          <MaterialSearchBar search={formatSearch} />

          {formatSearch.length > 0 && (
            <h3>
              {filteredMaterials.length} résultat
              {filteredMaterials.length > 1 && 's'} trouvé pour la
              recherche "{formatSearch}"
            </h3>
          )}

          {filteredMaterials.length > 0 && (
            <div className="material-container">
              {filteredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialPage;
