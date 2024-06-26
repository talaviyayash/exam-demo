import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addValue,
  createForm,
  addError,
  clearForm,
} from "../../redux/slice/formSlice";
import { EMPTY_STRING } from "../../description/globel.description";

const DDFormContainer = ({ configArray, formName, customValidation = {} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const AllValue = configArray.reduce((all, element) => {
      return {
        ...all,
        [element.name]: element.value ?? EMPTY_STRING,
      };
    }, {});
    dispatch(
      createForm({
        name: formName,
        value: AllValue,
      })
    );

    return () => dispatch(clearForm({ name: formName }));
  }, [dispatch, formName]);

  const formState = useSelector((state) => state?.form?.form?.[formName]);

  const { value: valueField = {}, error = {} } = formState ?? {};

  const singleErrorFind = ({ value, patterns, required, name }) => {
    const lengthOfValueIsZero = value.length === 0;
    const { isRequired, defaultMsg } = required;

    let { error: errorMsg } =
      patterns?.find(({ regex = EMPTY_STRING }) => {
        const isValid = value?.match(regex);
        return !isValid;
      }) ?? {};

    let isAnyErrorMsg;

    isAnyErrorMsg = isRequired
      ? errorMsg ||
        (lengthOfValueIsZero
          ? defaultMsg || `Please fill ${name} field properly`
          : EMPTY_STRING)
      : lengthOfValueIsZero
      ? EMPTY_STRING
      : errorMsg || EMPTY_STRING;
    const customValidationFunction = customValidation?.[name];

    if (!isAnyErrorMsg && customValidationFunction) {
      isAnyErrorMsg = customValidationFunction(
        {
          ...valueField,
          [name]: value,
        },
        name
      );
    }

    dispatch(
      addError({
        name: formName,
        error: {
          [name]: isAnyErrorMsg,
        },
      })
    );
    return Boolean(isAnyErrorMsg);
  };

  const errorFind = ({ name }) => {
    const ele = configArray.find((val) => val.name === name);

    const { patterns, required } = ele;

    const value = valueField?.[name] ?? EMPTY_STRING;

    const isErrorFind = singleErrorFind({
      value: value,
      patterns,
      required,
      name,
    });
    return isErrorFind;
  };

  const handelChangeType = ({ e, patterns, name, required }) => {
    const value = e.target.value;
    dispatch(
      addValue({
        name: formName,
        value: { [name]: value },
      })
    );
    singleErrorFind({
      value: value.trim(),
      patterns,
      required,
      name,
    });
  };

  const handelChangeCheckBox = ({ e, name, required, value }) => {
    const isChecked = e.target.checked;
    const { isRequired, defaultMsg } = required;

    let filteredArray = value ?? [];
    if (!isChecked) {
      filteredArray = value?.filter((val) => !(e.target.value === val)) ?? [];
    } else {
      filteredArray = [...filteredArray, e.target.value];
    }

    dispatch(
      addValue({
        name: formName,
        value: {
          [name]: [...filteredArray],
        },
      })
    );
    dispatch(
      addError({
        name: formName,
        error: {
          [name]: isChecked
            ? EMPTY_STRING
            : filteredArray.length === 0
            ? isRequired && (defaultMsg || `Please fill ${name} field properly`)
            : EMPTY_STRING,
        },
      })
    );
  };
  const validateAllField = (e) => {
    e?.preventDefault();
    let isError = false;

    configArray.forEach((val) => {
      const { name, patterns, required } = val;

      const value = valueField?.[name] ?? EMPTY_STRING;

      const errorFound = singleErrorFind({
        value: value,
        patterns,
        required,
        name,
      });

      isError = isError || errorFound;
    }, {});
    return !isError;
  };

  return {
    state: valueField,
    handelChangeType,
    handelChangeCheckBox,
    validateAllField,
    errorFind,
    error,
  };
};

export default DDFormContainer;
