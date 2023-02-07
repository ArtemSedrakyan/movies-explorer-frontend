function ErrorPopup(props) {
  return(
    <div className={`error-popup ${props.isOpen && 'error-popup_opened'}`}>
      <div className="error-popup__info-container">
        <p className="error-popup__error-code">404</p>
        <p className="error-popup__error-message">Страница не найдена</p>
      </div>
      <button className="error-popup__close-button" type="button"
        onClick={props.onClose}>Назад</button>
    </div>
  );
}

export default ErrorPopup;
