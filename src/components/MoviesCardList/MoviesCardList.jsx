import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({page}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleLoading() {
    !isLoading ? setIsLoading(true) : setIsLoading(false);
  };

  return (
  <section className="movies-list">
    {
      !isLoading
      ? <>
          <ul className="movies-list__container">
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
            <MoviesCard page = {page}/>
        </ul>
        {page === "movies" && <button className="movies-list__button" type="button">Ещё</button>}
      </>
      : <Preloader />
    }
  </section>
  );
}

export default MoviesCardList;
