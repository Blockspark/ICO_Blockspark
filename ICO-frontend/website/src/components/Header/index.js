import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {

  const loginPage = () =>{
    window.location.href = process.env.REACT_APP_SIGN_IN_URL;
  }
    return (
        <>
    <header className="navigation" id="home">
         <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/#">
                    <img className="" width="60px" src={ require("../../assets/images/Blockspark_Logo.png") } alt="" />
                    <h3 style={{ color: 'white', margin: 0 }} >Blockspark</h3>
                </a>

              <button className="navbar-toggler cstm-btn-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                   <ul className="navbar-nav m-auto">
                     <li className="nav-item">
                       <a className="nav-link active" aria-current="page" href="#home">Home</a>
                     </li>
                     <li className="nav-item ">
                       <a className="nav-link" href="#aboutus">About Us</a>
                     </li>
                      
                     <li className="nav-item">
                       <a className="nav-link" href="#ourteam">Our Team</a>
                     </li>
                     <li className="nav-item">
                       <a className="nav-link" href="#roadmap">Road Map</a>
                     </li>
                     <li className="nav-item">
                       <a className="nav-link" href="#whitepaper">Whitepaper</a>
                     </li>
                     <li className="nav-item">
                       <a className="nav-link" href="#contact-us">Contact Us</a>
                     </li>
                   </ul>

                   <div className="nav-button gr-btn">
              <button className="btn nav-btn" type="button" onClick={loginPage}>Sign in</button>
            </div>
   

              </div>
            </div>
        </nav> 

    </header>
        </>
    );
};

export default Header;
