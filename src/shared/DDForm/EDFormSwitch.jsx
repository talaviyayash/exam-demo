import React, { memo } from "react";
import DDFormInput from "../input/EDFormInput";

import { emptyString } from "../../description/globel.description";
import DDFormPassword from "../input/EDFormPassword";
import EDSelectOption from "../input/EDSelectOption";

const FormDynamic = ({ element, value, handelChange }) => {
  const { type, required } = element;

  switch (type) {
    case "password":
      return (
        <DDFormPassword
          element={element}
          value={value ?? emptyString}
          handelChange={handelChange}
          required={required}
        />
      );
    case "select":
      return (
        <EDSelectOption
          element={element}
          value={value ?? emptyString}
          handelChange={handelChange}
          required={required}
        />
      );
    default:
    case "text":
      return (
        <DDFormInput
          element={element}
          value={value ?? emptyString}
          handelChange={handelChange}
          required={required}
        />
      );
  }
};

export default memo(FormDynamic);
