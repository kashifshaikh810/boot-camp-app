import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Header = () => {
  return (
    <h1>
      <div className="navbar">
        <div className="container-fluid">
          <p className="htext">Boot Camp App</p>
        </div>
      </div>
    </h1>
  );
};

export default Header;
