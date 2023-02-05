import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";

function Form(props) {
  const location = useLocation();

  return (
      <form className={`form form_type_${props.formName}`} name={`form-type-${props.formName}`}
      onSubmit={props.onSubmit}>
        {
          props.formName === 'edit'
          ? <></>
          : <Logo/>
        }
        <h2 className={`form__title form__title_type_${props.formName}`}>{props.title}</h2>
        {props.children}
        <button className={`form__submit-button form__submit-button_type_${props.formName}`}
          type="submit">{props.buttonText}</button>
        <div className="form__route-container">
          { props.formName === "auth"
            ? <p className="form__route-container_type_sign">
                { location.pathname === "/signup"
                  ? "Уже зарегистрированиы?"
                  : location.pathname === "/signin"
                    ? "Ещё не зарегистрированы?"
                    : ""
                }
              </p>
            : <></>
          }
          {
            <Link to={location.pathname === "/signup" ? "/signin" : location.pathname === "/signin"
            ? "/signup" : "/"} className="form__route-container_type_link">
              {
                location.pathname === "/signup"
                ? "Войти"
                : location.pathname === "/signin"
                ? "Регистрация"
                : "Выйти из аккаунта"
              }
            </Link>
          }
        </div>
      </form>
  );
}

export default Form;
