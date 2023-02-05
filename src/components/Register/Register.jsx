import React from "react";
import Form from "../Form/Form";

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="form-page form-page_type_auth">
      <Form
        formName = 'auth'
        title = 'Добро пожаловать!'
        buttonText = 'Зарегистрироваться'
      >
        <label className="form__field-auth">
          <span className="form__input-title-auth">Имя</span>
          <input className="form__input-auth" type="text" value={name}
          onChange={handleChangeName} minLength="2" maxLength="30" required/>
        </label>
        <label className="form__field-auth">
          <span className="form__input-title-auth">E-mail</span>
          <input className="form__input-auth" type="email" value={email}
          onChange={handleChangeEmail} required/>
        </label>
        <label className="form__field-auth">
          <span className="form__input-title-auth">Пароль</span>
          <input className="form__input-auth" type="password" value={password}
          onChange={handleChangePassword} minLength="8" required/>
          <span className="form__input-error">Что-то пошло не так...</span>
        </label>
      </Form>
    </section>
  );
}

export default Register;
