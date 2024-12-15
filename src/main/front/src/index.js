import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <link
            rel="stylesheet"
            href="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
        />
        <App/>
    </div>
)
;

reportWebVitals();
