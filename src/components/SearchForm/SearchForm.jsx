import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [searchValue, setSearchValue] = React.useState('');

  function handleChangeSearchValue(e) {
    setSearchValue(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
  };

  return (
    <form className='search-form' name='form-type-search' onSubmit={handleSubmit}>
      <fieldset className='search-form__container'>
        <img className='search-form__icon' src={searchIcon} alt='иконка поиска'></img>
        <input type='search' name='search' placeholder='Фильм'
          className='search-form__input' value={searchValue}
          onChange={handleChangeSearchValue}
        />
        <button className='search-form__submit-button' type='submit'></button>
      </fieldset>
      <FilterCheckbox
        isShortFilms={props.isShortFilms}
        onToggleShortFilms={props.onToggleShortFilms}
      />
    </form>

  );
}

export default SearchForm;
