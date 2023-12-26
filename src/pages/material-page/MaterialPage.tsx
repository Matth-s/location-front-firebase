import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMaterialsService } from '../../services/material-service';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Header from '../../components/header/Header';
import MaterialCard from '../../components/material-card/MaterialCard';
import MaterialSearchBar from '../../components/material-search-bar/MaterialSearchBar';
import Loader from '../../components/loader/Loader';

import './styles.scss';
import ErrorContainer from '../../components/error-container/ErrorContainer';

const MaterialPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();

  const formatSearch = decodeURIComponent(search)
    .replace('?recherche=', '')
    .toLowerCase()
    .replaceAll('_', ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const { isLoading, materials, error } = useAppSelector(
    (state) => state.materialSlice
  );

  const getMaterial = async () => {
    dispatch(getMaterialsService()).unwrap();
  };

  useEffect(() => {
    if (isLoading) {
      getMaterial();
    }
  }, []);

  const filteredMaterials = formatSearch
    ? materials.filter((item) =>
        item.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(formatSearch)
      )
    : materials;

  return (
    <div className="material-page-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorContainer>
          <button onClick={() => getMaterial()}>Recharger</button>
        </ErrorContainer>
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

          {filteredMaterials.length > 0 ? (
            <div className="material-container">
              {filteredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <button
              className="button-add-material"
              onClick={() => navigate('/ajouter-un-materiel')}
            >
              Ajouter un matériel
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialPage;
