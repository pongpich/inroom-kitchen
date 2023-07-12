import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Components/Router/Router";
import "./font/Google-font.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
