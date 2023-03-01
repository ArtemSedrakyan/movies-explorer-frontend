import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, useLocation, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";

function App({ history }) {
  const location = useLocation();
  const [errorPopupStatus, setErrorPopupStatus] = useState(
    { isOpen: false,
      errCode: "",
      errMessage: "",
    });
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(false);

  function closeErrorPopup() {
    setErrorPopupStatus({
      isOpen: false,
      errCode: "",
      errMessage: "",
    });
  }

  function showErrorPopup(err) {
    setErrorPopupStatus({
      isOpen: true,
      errCode: err.statusCode,
      errMessage: err.message,
    });
  };

  function handleOpenLoader() {
    setIsLoading(true);
  };

  function handleCloseLoader() {
    setIsLoading(false);
  }

  //проверка авторизованного пользователя
  useEffect(() => {
    const token = Cookies.get('jwt');
    const userPath = location.pathname;
    if (token) {
      mainApi.getUserInfo()
        .then(userData => {
          if (userData) {
            setLoggedIn(true);
            setCurrentUser(userData);
            history.push(userPath);
          }
        })
        .catch(err => {
          showErrorPopup(err);
        })
    }
  }, []);

  //получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then(userData => setCurrentUser(userData))
        .catch((err) => {
          showErrorPopup(err);
        })
    }
  }, [loggedIn]);

  //получение объекта с соханенными фильмами
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(moviesList => {
          setSavedMovies(moviesList);
        })
        .catch(err => {
          showErrorPopup(err);
        });
    }
  }, [loggedIn, currentUser]);

  const handleRegister = async ({ email, password, name }) => {
    await mainApi.register(email, password, name)
      .then(res => {
        if (res._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err => {
        showErrorPopup(err);
      })
  };

  const handleLogin = async ({ email, password }) => {
    await mainApi.authorize(email, password)
      .then(jwt => {
        if (jwt.token) {
          Cookies.set('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(err => {
        showErrorPopup(err);
      })
  };

  function handleLogOut() {
    mainApi.signOut(); //возвращается сообщение с бэка
    setCurrentUser({});
    setSavedMovies([]);
    setLoggedIn(false);
    Cookies.remove('jwt');
    localStorage.clear();
    history.push('/');
  };

  //колбэк редактирования профиля
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi.updateUserInfo(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setIsSuccessful(true);
        setTimeout(() => {
          setIsSuccessful(() => {
            return false;
          });
        }, 5000);
      })
      .catch(err => {
        showErrorPopup(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function handleSaveMovie(movie) {
    mainApi.addNewMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch(err => {
        showErrorPopup(err);
      })
  };

  function handleDeleteMovie(movie) {
    const targetMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId || item.movieId === movie.id
    );
    mainApi.deleteMovie(targetMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });

        setSavedMovies(newMoviesList);
      })
      .catch(err => {
        showErrorPopup(err);
      })
  };

  const handleClickRouteBack = () => {
    history.goBack();
    console.dir(history)
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main
            loggedIn={loggedIn}
          />
        </Route>
        <ProtectedRoute
          path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          isLoading={isLoading}
          onOpenLoader={handleOpenLoader}
          onCloseLoader={handleCloseLoader}
          showErrorPopup={showErrorPopup}
          savedMovies={savedMovies}
          onSaveClick={handleSaveMovie}
          onDeleteClick={handleDeleteMovie}
        />
        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          savedMovies={savedMovies}
          onDeleteClick={handleDeleteMovie}
        />
        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onUpdateProfile={handleUpdateUser}
          onLogOut={handleLogOut}
          isLoading={isLoading}
          isSuccessful={isSuccessful}
        />
        <Route path="/signin">
          {!loggedIn
            ? (
              <Login
                onLogin={handleLogin}
                isLoading={isLoading}
              />
            )
            : (<Redirect to="/" />
          )}

        </Route>
        <Route exact path="/signup">
          {!loggedIn
            ? (
              <Register
                onRegister={handleRegister}
                isLoading={isLoading}
              />
            )
            : (<Redirect to="/" />
          )}
        </Route>
        <Route path="*">
          <NotFoundPage
            handleClickRouteBack={handleClickRouteBack}
          />
        </Route>
      </Switch>
      <ErrorPopup status={errorPopupStatus} onClose={closeErrorPopup} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
