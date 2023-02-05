function FilterCheckbox(props) {
  return (
    <label className='search-form__toggle'>
      <input type='checkbox' className='search-form__toggle_type_checkbox'
        checked={props.isShortFilms} onChange={props.onToggleShortFilms} />
      <span className='search-form__toggle_type_track'></span>
      Короткометражки
  </label>
  );
}

export default FilterCheckbox;
