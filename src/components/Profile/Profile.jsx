import React from 'react';
import Header from '../Header/Header';
import Form from "../Form/Form";

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
    <Header />
    <section className="form-page form-page_type_edit">
      <Form
        formName = 'edit'
        title = {`Привет, ${name}!`}
        buttonText = 'Редактировать'
      >
        <label className="form__field">
          <span className="form__input-title">Имя</span>
          <input className="form__input" type="text" value={name}
            onChange={handleChangeName} minLength="2" maxLength="30" required/>
        </label>
        <label className="form__field">
          <span className="form__input-title">E-mail</span>
          <input className="form__input" type="email" value={email}
            onChange={handleChangeEmail} required/>
        </label>
      </Form>
    </section>
    </>
  );
}

export default Profile;
