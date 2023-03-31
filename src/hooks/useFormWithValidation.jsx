import { useState, useCallback } from "react";
import isEmail from "validator/lib/isEmail";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    if (name === "name" && input.validity.patternMismatch) {
      input.setCustomValidity('Имя должно содержать только латиницу, кирилицу, пробел или дефис.');
    } else {
      input.setCustomValidity('');
    }

    if (name === "email" && !isEmail(value)) {
      input.setCustomValidity('Некорректный адрес почты.');
    } else {
      input.setCustomValidity('');
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
};
