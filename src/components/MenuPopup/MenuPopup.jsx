import { NavLink } from "react-router-dom";
import profileIcon from '../../images/profile-icon.svg';

function MenuPopup(props) {
  return (
    <div className={`menu-popup ${props.isOpen && 'menu-popup_opened'}`}>
      <div className={`menu-popup__container ${props.isOpen && 'menu-popup__container_opened'}`}>
        <button className='menu-popup__close-btn' type='button' onClick={props.onClosePopup}></button>
        <NavLink exact to='/' className='menu-popup__link menu-popup__link_type_nav' activeClassName='menu-popup__link_active'>Главная</NavLink>
        <NavLink to='/movies' className='menu-popup__link menu-popup__link_type_nav' activeClassName='menu-popup__link_active'>Фильмы</NavLink>
        <NavLink to='/saved-movies' className='menu-popup__link menu-popup__link_type_nav' activeClassName='menu-popup__link_active'>Сохранённые фильмы</NavLink>
        <NavLink to='/profile' className='menu-popup__link menu-popup__link_type_nav' activeClassName='menu-popup__link_active'>
          Аккаунт
          <img className='menu-popup__icon' src={profileIcon} alt='Иконка пользователя' />
        </NavLink>
      </div>
    </div>
  );
}

export default MenuPopup;
