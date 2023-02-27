import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm({ isShortFilms, onToggleShortFilms, onSearchMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, isValid, setIsValid, handleChange } = useFormWithValidation();

  const [errorMessage, setErrorMessage] = useState('');

  //хук показа сообщения об ошибке в инпуте
  useEffect(() => {
    setErrorMessage('')
  }, [isValid]);

  //хук подстановки текста запроса на страницу movies
  useEffect(() => {
    if (location.pathname === '/movies' && sessionStorage.getItem(`${currentUser.email} - InputValue`)) {
      const searchValue = sessionStorage.getItem(`${currentUser.email} - InputValue`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid ? onSearchMovies(values.search) : setErrorMessage('Нужно ввести ключевое слово.');
  };

  return (
    <form className='search-form' name='form-type-search' onSubmit={handleSubmit}>
      <fieldset className='search-form__container'>
        <img className='search-form__icon' src={searchIcon} alt='иконка поиска'></img>
        <input type='text' name='search' placeholder='Фильм'
          className='search-form__input' value={values.search || ''}
          onChange={handleChange} autoComplete="off" required
        />
        <span className='search-form__error'>{errorMessage}</span>
        <button className='search-form__submit-button' type='submit'></button>
      </fieldset>
      <FilterCheckbox
        isShortFilms={isShortFilms}
        onToggleShortFilms={onToggleShortFilms}
      />
    </form>
  );
}

export default SearchForm;
