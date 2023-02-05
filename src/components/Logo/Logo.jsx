import { NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';

function Logo() {
  return(
    <NavLink to='/' className='logo'>
      <img className='logo__image' src={logo} alt='логотип movie-explorer' />
    </NavLink>
  );
}

export default Logo;
