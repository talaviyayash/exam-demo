import React, { memo } from "react";

const EDFormError = ({ error }) => <div className={`error`}>{error}</div>;

export default memo(EDFormError);
