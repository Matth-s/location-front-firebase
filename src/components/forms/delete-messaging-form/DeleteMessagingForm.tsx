import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store/store';
import { deleteMessagingService } from '../../../services/messaging-service';
import { useNavigate } from 'react-router-dom';

import './styles.scss';
import { setModalToOpen } from '../../../store/features/modal-slice';

type Props = {
  id: string;
};

const DeleteMessagingForm = ({ id }: Props) => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const processForm = async () => {
    setFormLoading(true);

    await dispatch(deleteMessagingService({ id }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          navigate('/messagerie');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="delete-messaging-container">
      <form onSubmit={handleSubmit(processForm)}>
        <p>Confimer la suppression de cette réservation</p>

        <div className="div-submit">
          <button
            type="button"
            onClick={() => dispatch(setModalToOpen(0))}
          >
            Annuler
          </button>
          <input
            type="submit"
            value="Supprimer"
            className={`${formLoading ? 'form-loading' : ''}`}
          />
        </div>
      </form>
    </div>
  );
};

export default DeleteMessagingForm;
