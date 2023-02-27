import { useState, useEffect, useContext } from 'react';
// комоненты верстки
import Header from '../Header/Header';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';
import NotFoundFilms from '../NotFoundFilms/NotFoundFilms';
//функциональные компоненты
import { filterShortMovies, filterMovies, transformMovieImage } from '../../utils/utils'; // функции фильтрации фильмов
import { moviesApi } from '../../utils/MoviesApi'; // компонент с методами запросов к API beat-films
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Movies({ isLoading, onOpenLoader, onCloseLoader, showErrorPopup, savedMovies, onSaveClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [allMovies, setAllMovies] = useState([]); //все фильмы от сервера, полученные единожды
  const [initialMovies, setInitialMovies] = useState([]); //фильмы, полученные из запроса
  const [filteredMovies, setFilteredMovies] = useState([]); //фильмы, отфильтрованные по запросу и чекбоксу
  const [isShortFilms, setIsShortFilms] = useState(true); //состояние чекбокса короткометражек
  const [isEmpty, setIsEmpty] = useState(false);

  //проверка чекбокса в хранилище
  useEffect(() => {
    if (sessionStorage.getItem(`${currentUser.email} - isShortFilms` === 'true')) {
      setIsShortFilms(true);
    } else {
      setIsShortFilms(false);
    }
  }, [currentUser]);

  //добавить рендер фильмов из хранилища
  useEffect(() => {
    if (sessionStorage.getItem(`${currentUser.email} - movies`)) {
      const storageMovies = JSON.parse(sessionStorage.getItem(`${currentUser.email} - movies`));
      setInitialMovies(storageMovies);

      if (sessionStorage.getItem(`${currentUser.email} - isShortFilms`) === 'true') {
        setFilteredMovies(filterShortMovies(storageMovies));
      } else {
        setFilteredMovies(storageMovies);
      }
    }
  }, [currentUser]);

  //колбэк переключения чекбокса и сохранения его состояния в хранилище
  function handleToggleShortFilms() {
    setIsShortFilms(!isShortFilms);
    if (!isShortFilms) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    sessionStorage.setItem(`${currentUser.email} - isShortFilms`, !isShortFilms);
  };

  //колбэк поика фильма по ключевому слову и чекбоксу
  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(isShortFilms ? filterShortMovies(moviesList) : moviesList);

    sessionStorage.setItem(`${currentUser.email} - movies`, JSON.stringify(moviesList));
  };

  //поиск по запросу из SearchForm
  function handleSearchSubmit (inputValue) {
    sessionStorage.setItem(`${currentUser.email} - InputValue`, inputValue);
    sessionStorage.setItem(`${currentUser.email} - isShortFilms`, isShortFilms);

    if (allMovies.length === 0) {
      onOpenLoader();
       moviesApi.getMovies()
        .then((moviesData) => {
          setAllMovies(moviesData);
          const transformedMoviesList = transformMovieImage(moviesData);
          handleSetFilteredMovies(transformedMoviesList, inputValue, isShortFilms);
        })
        .catch((err) => {
          showErrorPopup(err);
        })
        .finally(() => {
          onCloseLoader();
        });
    } else {
      handleSetFilteredMovies(allMovies, inputValue, isShortFilms);
    }
  };

  return (
    <>
      <Header />
      <main className="page__element">
        <SearchForm
          isShortFilms={isShortFilms}
          onToggleShortFilms={handleToggleShortFilms}
          onSearchMovies={handleSearchSubmit}
        />
        {!isEmpty ? (
          <MoviesCardList
            page = "movies"
            isLoading={isLoading}
            movies={filteredMovies}
            savedMovies={savedMovies}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
        />
        ) : <NotFoundFilms />}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
