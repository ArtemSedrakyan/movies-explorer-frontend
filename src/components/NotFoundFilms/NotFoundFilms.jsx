import { useLocation } from "react-router-dom";

function NotFoundFilms() {
  const location = useLocation();

  return (
    <span className="films-replacement">
      {location.pathname === "/movies" && "Ничего не найдено"}
      {location.pathname === "/saved-movies" && "Нет сохраненных фильмов"}
    </span>
  );
}

export default NotFoundFilms;
