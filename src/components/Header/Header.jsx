import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import MenuPopup from '../MenuPopup/MenuPopup';

function Header({ loggedIn }) {
  const location = useLocation();
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  function openMenuPopup() {
    setIsMenuPopupOpen(true);
  };

  function closeMenuPopup() {
    setIsMenuPopupOpen(false);
  };

  return (
    <header className={
      `page__element header ${location.pathname === '/' ? 'header__main' : ''}`
    }>
      <Navigation
        onOpenMenuPopup={openMenuPopup}
        loggedIn={loggedIn}
      />
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClosePopup={closeMenuPopup}
      />
    </header>
  );
}

export default Header;
