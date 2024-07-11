export const lSSetItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const lSRemoveItem = (key) => localStorage.removeItem(key);

export const lSGetItem = (key) => {
  const jsonNull = JSON.stringify(null);
  return JSON.parse(localStorage.getItem(key) || jsonNull);
};

export const lSClear = () => localStorage.clear();
