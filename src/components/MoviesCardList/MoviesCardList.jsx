import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { DEVICE_PARAMS } from "../../utils/constants";
import useDisplayWidth from "../../hooks/useDisplayWidth";
import { getSavedMovieCard } from "../../utils/utils";

function MoviesCardList({page, isLoading, movies, savedMovies, onSaveClick, onDeleteClick}) {
  const displayWidth = useDisplayWidth();
  const { desktop, tablet, mobile } = DEVICE_PARAMS;

  const [currentMovies, setCurrentMovies] = useState([]);
  const [moviesAmmount, setMoviesAmmount] = useState({ total: 12, more: 3 });

  //хук отображения карточек на разной ширине дисплея
  useEffect(() => {
    if (page === 'movies') {
      if (displayWidth > desktop.width) {
        setMoviesAmmount(desktop.cards);
      } else if (displayWidth <= desktop.width && displayWidth > mobile.width) {
        setMoviesAmmount(tablet.cards);
      } else {
        setMoviesAmmount(mobile.cards);
      }
    }
  }, [page, displayWidth, desktop, tablet, mobile]);

  //хук изменения отображаемого массива карточек при разной ширине дисплея
  useEffect(() => {
    if (movies.length) {
      const displayedMovies = movies.filter((item, i) => i < moviesAmmount.total);
      setCurrentMovies(displayedMovies);
    }
  }, [movies, moviesAmmount.total]);

  //колбэк добавления карточек на страницу по клику кнопки 'Ещё'
  function handleClickMoreMovies() {
    const start = currentMovies.length;
    const end = start + moviesAmmount.more;
    const additional = movies.length - start;

    if (additional > 0) {
      const newCards = movies.slice(start, end);
      setCurrentMovies([...currentMovies, ...newCards]);
    }
  };

  return (
  <section className="movies-list">
    {
      !isLoading
      ? <>
          <ul className="movies-list__container">
            {currentMovies.map((movie) => {
              return (
                <MoviesCard key = {movie.id || movie._id} page = {page} movie = {movie} savedCard={getSavedMovieCard(savedMovies, movie)}
                  onSaveClick={onSaveClick} onDeleteClick={onDeleteClick}
                />
              );
            })}
        </ul>
        {page === "movies" && currentMovies.length >= 3 && currentMovies.length < movies.length && (
          <button className="movies-list__button" type="button"
            onClick={handleClickMoreMovies}>
            Ещё
          </button>
        )}
      </>
      : <Preloader />
    }
  </section>
  );
}

export default MoviesCardList;
