import React from 'react';
import { useNavigate } from 'react-router-dom';

import iconArrow from '../../assets/icon-back-arrow.svg';

import './styles.scss';

type Props = {
  children: React.ReactNode;
};

const ActionBar = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="action-bar-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={iconArrow} alt="retour" />
        Retour
      </button>
      <div>{children}</div>
    </div>
  );
};

export default ActionBar;
