/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import * as Icon from 'react-bootstrap-icons';
import SideDrawer from '../SideDrawer/index'; 

const Header = () => {
  const [isShow, setIsShow] = useState(false); 

    return (
      <div className="navbar">
        <div className="container-fluid">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ display: "flex", flexDirection: "row", }}
          >

        <li>
          <Icon.List style={{cursor: 'pointer', margin: 10, fontSize: 45}} onClick={() => setIsShow(true)}  />
          <SideDrawer setIsShow={setIsShow} isShow={isShow} />
        </li>

            <li>
              <p className="htext">Boot Camp App</p>
            </li>
            </ul>
      </div>
      </div>
  );
};

export default Header;
