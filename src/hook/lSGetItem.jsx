const lSGetItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export default lSGetItem;
