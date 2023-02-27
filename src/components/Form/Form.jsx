import Logo from "../Logo/Logo";

function Form(props) {

  return (
      <form className={`form form_type_${props.formName}`} name={`form-type-${props.formName}`}
      onSubmit={props.onSubmit}>
        {
          props.formName === "edit"
          ? <></>
          : <Logo/>
        }
        <h2 className={`form__title form__title_type_${props.formName}`}>{props.title}</h2>
         {props.children}
      </form>
  );
}

export default Form;
