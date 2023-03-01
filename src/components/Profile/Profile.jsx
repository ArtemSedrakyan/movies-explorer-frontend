import { useEffect, useContext } from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({ onUpdateProfile, onLogOut, isLoading, isSuccessful }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile(values);
  };

  //данные из контекста подставляются в управляемые компоненты формы
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  /* переменная для валидации и сравнения значений в контекcте текущего пользователя и values
  для управления состоянием кнопки Редактировать*/
  const validityState = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <>
    <Header />
    <section className="form-page form-page_type_edit">
      <Form
        formName = "edit"
        title = {`Привет, ${currentUser.name || ""}!`}
        isValid={isValid}
        onSubmit={handleSubmit}
      >
        { !isLoading
          ?
            <>
              <label className="form__field">
                <span className="form__input-title">Имя</span>
                <input className="form__input" name="name" type="text" value={values.name || ""}
                  onChange={handleChange} minLength="2" maxLength="30" pattern="^[A-Za-zА-Яа-яЁё /s -]+$" required/>
                <span className="form__input-error">{errors.name || ""}</span>
              </label>
              <label className="form__field">
                <span className="form__input-title">E-mail</span>
                <input className="form__input" name="email" type="email" value={values.email || ""}
                  onChange={handleChange} required/>
                <span className="form__input-error">{errors.email || ""}</span>
                { isSuccessful && (<span className="form__success-message">Данные успешно обновлены!</span>)}
              </label>
              <div className="form__button-box">
                <button className={`form__submit-button ${validityState ? "form__submit-button_disabled" : "form__submit-button_type_edit"}`}
                  type="submit" disabled={validityState ? true : false}>
                  Редактировать
                </button>
                <button className="form__route-container_type_logout" type="button"
                  onClick={onLogOut}>
                  Выйти из аккаунта
                </button>
              </div>
            </>
          : <Preloader />
        }
      </Form>
    </section>
    </>
  );
}

export default Profile;
