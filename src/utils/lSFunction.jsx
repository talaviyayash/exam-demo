export const lSSetItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const lSRemoveItem = (key) => localStorage.removeItem(key);

export const lSGetItem = (key) => JSON.parse(localStorage.getItem(key));

export const lSClear = () => localStorage.clear();
