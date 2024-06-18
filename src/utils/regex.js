export const emptyRegex = /^(?!\s*$).+/;

export const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s]+$/;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const onlyNumberRegex = /^[0-9]*$/;

export const mobileNumberRegex = /^\d{10}$/;

export const ageRegex = /^\d{0,3}$/;

export const oneLowerCaseLetter = /(?=.*[a-z])/;

export const oneUpperCaseLetter = /(?=.*[A-Z])/;

export const oneDigitCaseLetter = /(?=.*\d)/;

export const oneSpecialCharacter = /(?=.*\W)/;

export const noConsecutiveSpaces =
  /^(?!.*\s{2})[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/;
