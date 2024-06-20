const GetItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export default GetItem;
