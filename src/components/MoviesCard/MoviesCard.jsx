import { useState } from 'react';
import picture from '../../images/picture-1.jpg';


function MoviesCard({page}) {
  const [isSaved, setIsSaved] = useState(false);
  const moviesCardSaveClass = !isSaved ? 'movies-card__save-buton_active' : 'movies-card__save-button_disabled'
  const cardButtonStyle = page === 'movies' ? moviesCardSaveClass : 'movies-card__save-button_remove';

  function handleSaveFilm() {
    setIsSaved(true);
  }

  return(
    <li className="movies-card">
      <div className="movies-card__text">
        <cite className="movies-card__text_type_title">В погоне за Бенкси</cite>
        <p className="movies-card__text_type_duration">27 минут</p>
      </div>
      <img className="movies-card__poster" src={picture} alt="постер фильма" />
      <button className={`movies-card__save-button ${cardButtonStyle}`}
        type="button" aria-label="Сохранить" onClick={handleSaveFilm}>
        Сохранить
      </button>
    </li>
  );
}

export default MoviesCard;
