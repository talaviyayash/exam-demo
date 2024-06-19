import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routing from "./router/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routing />
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
