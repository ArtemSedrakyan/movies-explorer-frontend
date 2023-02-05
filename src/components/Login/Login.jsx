import React from "react";
import Form from "../Form/Form";

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
        title = 'Рады видеть!'
        buttonText = 'Войти'
      >
        <label className="form__field-auth">
          <span className="form__input-title-auth">E-mail</span>
          <input className="form__input-auth" type="email" value={email}
          onChange={handleChangeEmail} required/>
          {/* <span> add error message using positioning 100%+px</span> */}
        </label>
        <label className="form__field-auth">
          <span className="form__input-title-auth">Пароль</span>
          <input className="form__input-auth form__input-auth_error" type="password" value={password}
          onChange={handleChangePassword} minLength="8" required/>
          {/* <span> add error message using positioning 100%+px</span> */}
        </label>
      </Form>
    </section>
  );
}

export default Login;
