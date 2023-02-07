import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import profileIcon from '../../images/profile-icon.svg';

function Navigation(props) {
  const location = useLocation();

  return (
      <nav className='menu'>
        <Logo />
        {
          location.pathname === '/'
          ?
            <>
              <NavLink to='/signup' className='menu__link menu__link_type_auth' >Регистрация</NavLink>
              <NavLink to='/signin' className='menu__link menu__link_type_auth' >Войти</NavLink>
            </>
          : location.pathname === '/movies' || '/saved-movies' || '/profile'
          ?
            <>
              <NavLink to='/movies' className='menu__link menu__link_type_nav' activeClassName='menu__link_active'>Фильмы</NavLink>
              <NavLink to='/saved-movies' className='menu__link menu__link_type_nav' activeClassName='menu__link_active'>Сохранённые фильмы</NavLink>
              <NavLink to='/profile' className='menu__link menu__link_type_nav' activeClassName='menu__link_active'>
                Аккаунт
                <img className='menu__icon' src={profileIcon} alt='Иконка пользователя' />
              </NavLink>
              <button className='menu__popup-button' type='button' onClick={props.onOpenMenuPopup}></button>
            </>
          :
            <></>
        }
      </nav>
  );
}

export default Navigation;
