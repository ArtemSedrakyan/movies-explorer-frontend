class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _checkResponse(res) {
    const result = await res.json();
    if (res.ok) {
      return result;
    }
    return Promise.reject({statusCode: res.status, message: result.message});
  };

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, password, name})
    })
    .then(this._checkResponse);
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  };

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse);
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse);
  };

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    })
    .then(this._checkResponse);
  };

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse);
  };

  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    })
    .then(this._checkResponse);
  };

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    })
    .then(this._checkResponse);
  };
};

export const mainApi = new MainApi({
  baseUrl: 'https://api.sedrakyan.movies.nomoredomains.icu',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
