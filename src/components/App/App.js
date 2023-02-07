import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function App() {
  const [isShortFilms, setIsShortFilms] = useState(true);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);

  function handleToggleShortFilms() {
    !isShortFilms ? setIsShortFilms(true) : setIsShortFilms(false);
  };

  function closeErrorPopup() {
    setIsErrorPopupOpened(false);
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies
            isShortFilms={isShortFilms}
            onToggleShortFilms={handleToggleShortFilms}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <Main />
        </Route>
      </Switch>
      <ErrorPopup
        isOpen={isErrorPopupOpened}
        onClose={closeErrorPopup}
      />
    </>
  );
}

export default App;
