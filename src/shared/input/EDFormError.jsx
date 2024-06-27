import React, { memo } from "react";

const EDFormError = ({ error }) => {
  return <div className={`error`}>{error}</div>;
};

export default memo(EDFormError);
