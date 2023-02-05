import Header from '../Header/Header';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header />
      <main className="page__element">
        <SearchForm
          isShortFilms={props.isShortFilms}
          onToggleShortFilms={props.onToggleShortFilms}
        />
        <MoviesCardList
          page = "movies"
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
