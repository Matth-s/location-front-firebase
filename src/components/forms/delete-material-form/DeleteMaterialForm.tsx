import { useAppDispatch } from '../../../store/store';
import { setModalToOpen } from '../../../store/features/modal-slice';
import { useState } from 'react';
import { deleteMaterialService } from '../../../services/material-service';
import { materialSchema } from '../../../schema';
import { useNavigate } from 'react-router-dom';
import { toastifySetup } from '../../../utils/toastifySetup';
import { deleteDirectoryService } from '../../../services/image-service';

import './styles.scss';

type Props = {
  material: materialSchema;
};

const DeleteMaterialForm = ({ material }: Props) => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch(setModalToOpen(0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    await dispatch(deleteDirectoryService({ id: material.id }));

    await dispatch(deleteMaterialService({ id: material.id }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: `Le matériel : "${material.name}" a bien été supprimé`,
          });
          navigate('/materiel');
        }
      })
      .catch(() => {
        toastifySetup({
          success: false,
          message:
            'Une erreur est survenue lors de la suppression du materiel',
        });
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="delete-material-form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          Confimez-vous la suppression du matériel `{material.name}`,
          cette action sera irréversible
        </p>
        <div className="submit-div">
          <button
            type="button"
            onClick={() => handleCancel()}
            className={`${formLoading ? 'form-loading' : ''}`}
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

export default DeleteMaterialForm;
