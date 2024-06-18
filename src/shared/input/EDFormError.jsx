import React, { memo } from "react";

const DDFormError = ({ error, formName }) => {
  return <div className={`error`}>{error}</div>;
};

export default memo(DDFormError);
