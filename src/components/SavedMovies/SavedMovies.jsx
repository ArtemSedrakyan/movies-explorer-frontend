import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return(
    <>
    <Header />
    <main className="page__element">
      <SearchForm />
      <MoviesCardList
        page = "saved-movies"
      />
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;
