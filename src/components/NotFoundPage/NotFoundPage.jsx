function NotFoundPage({ handleClickRouteBack }) {
  return(
    <main className="not-found">
      <div className="not-found__container">
        <p className="not-found__error-code">404</p>
        <p className="not-found__error-message">Страница не найдена</p>
      </div>
      <button className="not-found__button" type="button"
        onClick={handleClickRouteBack}>Назад</button>
    </main>
  );
}

export default NotFoundPage;
