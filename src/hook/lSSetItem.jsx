const lSSetItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default lSSetItem;
