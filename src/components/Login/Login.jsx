import { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Preloader from "../Preloader/Preloader";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({ onLogin, isLoading }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

    useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <section className="form-page form-page_type_auth">
      <Form
        formName = "auth"
        title = "Рады видеть!"
        onSubmit={handleSubmit}
      >
        { !isLoading
          ?
            <>
              <label className="form__field-auth">
                <span className="form__input-title-auth">E-mail</span>
                <input className="form__input-auth" type="email" name="email" value={values.email || ""}
                onChange={handleChange} required/>
                <span className="form__input-error">{errors.email || ""}</span>
              </label>
              <label className="form__field-auth">
                <span className="form__input-title-auth">Пароль</span>
                <input className="form__input-auth form__input-auth_error" type="password" name="password"
                value={values.password || ""} onChange={handleChange} minLength="8" required/>
                <span className="form__input-error">{errors.password || ""}</span>
              </label>
              <div className="form__button-box">
                <button className={`form__submit-button ${isValid ? "form__submit-button_type_auth" : "form__submit-button_disabled"}`}
                  type="submit" disabled={!isValid}>
                  Войти
                </button>
                <div className="form__route-container">
                  <p className="form__route-container_type_sign">
                    Ещё не зарегистрированиы?&nbsp;
                  </p>
                  <Link to="/signup" className="form__route-container_type_link">
                    Регистрация
                  </Link>
                </div>
              </div>
            </>
          : <Preloader />
        }
      </Form>
    </section>
  );
}

export default Login;
