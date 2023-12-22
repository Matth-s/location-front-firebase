import { useAppDispatch } from '../../store/store';
import { setModalToOpen } from '../../store/features/modal-slice';

import iconCross from '../../assets/icon-cross.svg';

import './styles.scss';

const CloseModalButton = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setModalToOpen(0));
  };

  return (
    <button
      className="close-modal-button"
      onClick={() => handleCloseModal()}
    >
      <img src={iconCross} alt="fermer" />
    </button>
  );
};

export default CloseModalButton;
