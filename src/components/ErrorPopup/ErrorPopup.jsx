function ErrorPopup({ status : { isOpen, errCode, errMessage }, onClose }) {
  return(
    <div className={`error-popup ${isOpen && 'error-popup_opened'}`}>
      <div className="error-popup__info-container">
        <p className="error-popup__error-code">{errCode}</p>
        <p className="error-popup__error-message">{errMessage}</p>
        <button className="error-popup__close-button" type="button"
          onClick={onClose}>Назад</button>
      </div>
    </div>
  );
}

export default ErrorPopup;
