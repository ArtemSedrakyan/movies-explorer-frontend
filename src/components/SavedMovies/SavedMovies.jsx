import { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import NotFoundFilms from "../NotFoundFilms/NotFoundFilms";
import { filterMovies, filterShortMovies } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({ savedMovies, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [displayedMovies, setDisplayedMovies] = useState(savedMovies); //все сохраненные фильмы отображены
  const [filteredMovies, setFilteredMovies] = useState(displayedMovies); //отфильтрованные фильмы
  const [isShortFilms, setIsShortFilms] = useState(false); //состояние чекбокса короткометражек
  const [isEmpty, setIsEmpty] = useState(false);

  //при изменении массива сохр. фильмов меняем массив отфильтрованных по запросу
  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setIsEmpty(false) : setIsEmpty(true);
  }, [savedMovies]);

  //проверка чекбокса в хранилище
  useEffect(() => {
    if (sessionStorage.getItem(`${currentUser.email} - isShortFilms` === 'true')) {
      setIsShortFilms(true);
      setDisplayedMovies(filterShortMovies(savedMovies));
    } else {
      setIsShortFilms(false);
      setDisplayedMovies(savedMovies);
    }
  }, [currentUser, savedMovies]);

  function handleToggleShortFilms() {
    if (!isShortFilms) {
      setIsShortFilms(true);
      sessionStorage.getItem(`${currentUser.email} - isShortFilms`, 'true');
      setDisplayedMovies(filterShortMovies(filteredMovies));
    } else {
      setIsShortFilms(false);
      sessionStorage.getItem(`${currentUser.email} - isShortFilms`, 'false');
      setDisplayedMovies(filteredMovies);
    }
  };

  function handleSearchSubmit(inputValue) {
    const filteredMoviesList = filterMovies(savedMovies, inputValue, isShortFilms);

    if (filteredMoviesList.length !== 0) {
      setFilteredMovies(filteredMoviesList);
      setDisplayedMovies(filteredMoviesList);
    }
  };

  return(
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
          page = "saved-movies"
          movies={displayedMovies}
          savedMovies={savedMovies}
          onDeleteClick={onDeleteClick}
        />
      ) : <NotFoundFilms />}
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;
