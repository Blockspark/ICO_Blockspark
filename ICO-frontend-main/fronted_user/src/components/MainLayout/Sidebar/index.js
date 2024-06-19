import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("personal_info");
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/");  
  }

  useEffect( () => {
    let path = window.location.pathname;
    path = path.replace(/\/$/, "");
    setActiveMenu(path);
  },[]);
  return ( 
    <>
      <div id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase"><a href="#" className="navbar-brand">
          <img width={"100px"} src={require('../../../assets/images/Blockspark_Logo.png')}  className="me-2" alt="Logo" />
        </a></div>
        <div className="list-group list-group-flush dashboard-item">
          <a href="/" 
            className={`list-group-item list-group-item-action bg-transparent ${activeMenu === "" ? "active sidebar-dot" : "fw-bold"}`}
          > <img  src={require("../../../assets/images/Dashboard.svg").default}  className="me-2" alt="" /> Dashboard</a>
          <a href="/transaction" 
            className={`list-group-item list-group-item-action bg-transparent ${activeMenu === "/transaction" ? "active sidebar-dot" : "fw-bold"}`}
          ><img src={require("../../../assets/images/transaction.svg").default}   className="me-3" alt="" />Transactions</a>
          <a href="/profile" 
            className={`list-group-item list-group-item-action bg-transparent ${activeMenu === "/profile" ? "active sidebar-dot" : "fw-bold"}`}><img src={require("../../../assets/images/account.svg").default} className="me-2" alt="" /> Profile Setting</a>
          <button  onClick={() => logout()}  className="list-group-item list-group-item-action bg-transparent logout-link text-end  fw-bold">Logout <span className="side-nav-arrow"><img src={require("../../../assets/images/arrow-big.svg").default} alt="" />
            <img   src={require("../../../assets/images/arrow-small.svg").default}  alt="" /></span>  </button>
        </div>
      </div>
    </>
  );
};
 
export default Sidebar;
