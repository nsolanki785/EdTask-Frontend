import React, { useState, useEffect } from "react";
import "./index.css";
import Routing from "./routing";
import { Provider } from "react-redux";
import store from "./redux/store";

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
