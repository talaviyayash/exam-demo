import React from "react";
import Navbar from "./shared/Navbar";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routing from "./router/Routing";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routing />
      </Provider>
    </>
  );
};

export default App;
