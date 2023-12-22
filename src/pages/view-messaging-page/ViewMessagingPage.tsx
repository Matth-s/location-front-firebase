import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import {
  changeStatusMessaging,
  getMessagingService,
} from '../../services/messaging-service';
import { toastifySetup } from '../../utils/toastifySetup';
import { setModalToOpen } from '../../store/features/modal-slice';

import Loader from '../../components/loader/Loader';
import ActionBar from '../../components/action-bar/ActionBar';
import ModalProvider from '../../components/modal-provider/ModalProvider';

const ViewMessagingPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { isLoading, error, messagings } = useAppSelector(
    (state) => state.messagingSlice
  );

  const findMessaging = messagings.find(
    (messaging) => messaging.id === id
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(getMessagingService());
    }
  }, [isLoading]);

  const changeMessagingStatus = async (id: string) => {
    if (findMessaging) {
      await dispatch(changeStatusMessaging({ id }))
        .unwrap()
        .then((res) => {
          if (res.status === 201) {
            toastifySetup({
              success: true,
              message: `Le status à été modifié avec succès`,
            });
          }
        })
        .catch((error) => {
          toastifySetup({
            success: false,
            message: error,
          });
        });
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>une erreur est survenue</p>
      ) : findMessaging ? (
        <>
          <ActionBar>
            <button onClick={() => dispatch(setModalToOpen(2))}>
              Créer la réservation
            </button>
            <button
              onClick={() => changeMessagingStatus(findMessaging.id)}
            >
              Marquer comme {findMessaging.isRead ? 'non lu' : 'lu'}
            </button>
            <button>Supprimer</button>
          </ActionBar>

          <ModalProvider booking={findMessaging} />
        </>
      ) : (
        <p>message introuvable</p>
      )}
    </div>
  );
};

export default ViewMessagingPage;
