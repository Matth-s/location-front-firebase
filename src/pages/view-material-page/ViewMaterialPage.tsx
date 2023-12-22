import { useAppDispatch, useAppSelector } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { getMaterialsService } from '../../services/material-service';
import { useEffect } from 'react';
import { setModalToOpen } from '../../store/features/modal-slice';
import { bookingSchema } from '../../schema';
import { materialToBooking } from '../../helpers/bookingHelpers';

import Header from '../../components/header/Header';
import MaterielCarousel from '../../components/material-carousel/MaterielCarousel';
import MaterialProvided from '../../components/material-provided/MaterialProvided';
import ActionBar from '../../components/action-bar/ActionBar';
import ModalProvider from '../../components/modal-provider/ModalProvider';
import MaterialPresentation from '../../components/material-presentation/MaterialPresentation';
import Loader from '../../components/loader/Loader';

import './styles.scss';

const booking: bookingSchema = {
  id: '',
  idMaterial: '',
  materialName: '',
  total: 0,
  pricePerDay: 0,
  providedMaterialsBooking: [],
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  street: '',
  unavailableDates: [],
  bookingDates: [],
  coachingPriceHour: 0,
  coachingTime: 0,
  isCompleted: false,
  downPayment: 0,
  timestamp: 0,
  isRead: false,
};

const ViewMaterialPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, materials, error } = useAppSelector(
    (state) => state.materialSlice
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(getMaterialsService());
    }
  }, [isLoading]);

  const findMaterial = materials.find(
    (material) => material.id === (id as string)
  );

  return (
    <div className="view-material-page-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>une erreur est survenue</p>
      ) : findMaterial ? (
        <div className="view-material-container">
          <ActionBar>
            <button onClick={() => dispatch(setModalToOpen(1))}>
              Editer
            </button>
            <button onClick={() => dispatch(setModalToOpen(2))}>
              Ajouter une réservation
            </button>
            <button>Afficher le calendrier</button>
            <button
              onClick={() =>
                navigate(
                  `/reservation?filtre=materiel&search=${findMaterial.name.replaceAll(
                    ' ',
                    '_'
                  )}`
                )
              }
            >
              Réservation
            </button>
            <button onClick={() => dispatch(setModalToOpen(4))}>
              Supprimer
            </button>
          </ActionBar>

          <h1>{findMaterial.name.toUpperCase()}</h1>

          <MaterielCarousel
            arrayPicture={findMaterial.arrayPicture}
            presentationPicture={findMaterial.presentationPicture}
          />

          <MaterialPresentation material={findMaterial} />

          <MaterialProvided
            materialsProvided={findMaterial.providedMaterials}
          />

          <ModalProvider
            material={findMaterial}
            booking={materialToBooking({
              material: findMaterial,
              booking,
            })}
          />
        </div>
      ) : (
        <p>Ce matériel n'existe pas</p>
      )}
    </div>
  );
};

export default ViewMaterialPage;
