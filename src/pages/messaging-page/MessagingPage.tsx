import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMessagingService } from '../../services/messaging-service';
import { formatDate } from '../../helpers/fomatDate';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';

import './styles.scss';

const MessagingPage = () => {
  const navigate = useNavigate();
  const [refechLoading, setRefrechLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, error, messagings } = useAppSelector(
    (state) => state.messagingSlice
  );

  const refrechMessaging = async () => {
    setRefrechLoading(true);

    await dispatch(getMessagingService()).finally(() =>
      setRefrechLoading(false)
    );
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(getMessagingService());
    }
  }, [isLoading]);

  return (
    <div className="messaging-page-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>une erreur est survenue</p>
      ) : (
        <section className="table-section">
          <button onClick={() => refrechMessaging()}>
            Actualiser
          </button>

          {refechLoading ? (
            <Loader />
          ) : (
            <div className="div-table">
              <table>
                <thead>
                  <tr>
                    <td>Début</td>
                    <td>Fin</td>
                    <td>Nom</td>
                    <td>Prenom</td>
                    <td>Matériel</td>
                    <td>Téléphone</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {messagings.length > 0 &&
                    messagings
                      .slice()
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((messaging) => (
                        <tr
                          onClick={() =>
                            navigate(`/messagerie/${messaging.id}`)
                          }
                          key={messaging.id}
                        >
                          <td>
                            {formatDate(messaging.bookingDates[0])}
                          </td>
                          <td>
                            {formatDate(
                              messaging.bookingDates[
                                messaging.bookingDates.length - 1
                              ]
                            )}
                          </td>
                          <td>{messaging.firstName}</td>
                          <td>{messaging.lastName}</td>
                          <td>{messaging.materialName}</td>
                          <td>{messaging.phone}</td>
                          <td>
                            {messaging.isRead ? 'Lu' : 'Non lu'}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default MessagingPage;
