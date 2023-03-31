function MoviesCard({ page, movie, savedCard, onSaveClick, onDeleteClick }) {
  const moviesCardSaveClass = !savedCard ? 'movies-card__save-buton_active' : 'movies-card__save-button_disabled'
  const cardButtonStyle = page === 'movies' ? moviesCardSaveClass : 'movies-card__save-button_remove';

  function handleSaveFilm() {
    onSaveClick(movie);
  };

  function handleDeleteFilm() {
    onDeleteClick(movie);
  };

  return(
    <li className="movies-card">
      <div className="movies-card__text">
        <cite className="movies-card__text_type_title">{movie.nameRU}</cite>
        <p className="movies-card__text_type_duration">{movie.duration} мин</p>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__poster" src={movie.image} alt={movie.nameRU} />
      </a>
      <button className={`movies-card__save-button ${cardButtonStyle}`}
        type="button" aria-label={savedCard ? "Сохранить" : "Удалить" } onClick={!savedCard ? handleSaveFilm : handleDeleteFilm}>
        Сохранить
      </button>
    </li>
  );
}

export default MoviesCard;
