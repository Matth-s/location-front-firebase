import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { logOutService } from '../../services/auth-service';

import iconMenu from '../../assets/icon-menu.svg';
import iconCross from '../../assets/icon-cross.svg';

import './styles.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogOut = () => {
    dispatch(logOutService());
  };

  return (
    <header className="header-container">
      <img
        onClick={() => setOpenMenu((prev) => !prev)}
        src={openMenu ? iconCross : iconMenu}
        alt="Menu"
      />
      <nav className={`${openMenu ? '' : 'close'}`}>
        <ul>
          <NavLink to={'/materiel'}>Matériel</NavLink>
          <NavLink to={'/ajouter-un-materiel'}>
            Ajouter un matériel
          </NavLink>
          <NavLink to={'/reservation'}>Réservation</NavLink>
          <NavLink to={'/messagerie'}>Messagerie</NavLink>

          <button onClick={() => handleLogOut()}>
            Se déconnecter
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
