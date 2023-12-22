import { NavLink } from 'react-router-dom';

import './styles.scss';
import { useAppDispatch } from '../../store/store';
import { logOutService } from '../../services/auth-service';

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOutService());
  };

  return (
    <header className="header-container">
      <nav>
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
