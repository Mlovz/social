import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/app.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          theme: {
            primary: "#4aed88",
          },
        },
      }}
    ></Toaster>
  </>
);
