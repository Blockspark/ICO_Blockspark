import React,{useState,useEffect} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import User from "../../../store/api/User"; 
import { connectWallet,getCurrentWalletConnected} from "../../../helper/interact"
import Emitter from "../../../services/emitter";
import {Loader} from "../../../components/Loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/user";
import { useNavigate } from 'react-router-dom';
 
 
const Header = (props,{openMenuClick}) => {

  const navigate = useNavigate();
    const [walletAddress, setWallet] = useState("");
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [showLoader, setShowLoader] = useState(false);
    const [kycStatus, setKycStatus] = useState("");
    const [userData,setUserData] = useState("");
    const [fullName,setFullName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    useEffect( () => {
      if(props && props.userData){
        setFullName(props.userData.full_name);
      }
      
    },[props])
    useEffect( () => {
      async function setup() {
      
        setShowLoader(true);
        const { address } = await getCurrentWalletConnected();
  
        if(address && token){
          try {
            let data = {
              address:address
            };
          
            await User.saveWalletAddress(data).then((res) => {
            }).catch((e) => {
                
            })
          } catch (err) {
            console.error("Adad",err);
          }
        }
         
  
        setWallet(address);
        setShowLoader(false);
      }
  
      setup();
      Emitter.on("setToken", (arg) => setToken(arg));
      Emitter.on("setWalletAddress", (address) => setWallet(address));
      Emitter.on("setKycStatus", (arg) => setKycStatus(arg));
      Emitter.on("setUserData", (arg) => setUserData(arg));
  
    },[]);

    
    const openDropDownMenu = () => {
 
      setShowDropdown(!showDropdown);
    }
 
    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        if(walletResponse.address){
          setWallet(walletResponse.address);
          try {
            let data = {
              address:walletResponse.address
            };
                
            User.saveWalletAddress(data).then((res) => {
            }).catch((e) => {
                
            })
          } catch (err) {
            console.error("Adad",err);
          }
        }   
    };

    const logout = async () => {
      localStorage.clear();
      navigate("/");  
        
    }
   
    return (
        <>
             <nav className="navbar navbar-expand-lg dashboard-nav navbar-dark">
                        <div className="container">
                        <div className="d-flex align-items-center text-light sidenav-bar-icon">
                            <i className="primary-text fs-4 me-3" id="menu-toggle"></i>                        
                            <i   onClick={() => {props.openMenuClick(false);}} className="primary-text fs-4 me-3 open-menu-icon" >
                                <AiOutlineMenu size={20} />
                            </i>
                        </div>

                        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div  
                        className= {`collapse navbar-collapse justify-content-end ${showMobileMenu === true ? "show" : ""}`}
                        id="navbarSupportedContent">
                            <div className="d-flex dashboard-button">
                                <button type="submit" className="btn btn-outline-primary  dashboard-button-wlt" onClick={connectWalletPressed}> <span className="dshbord-btn-txt">
                                {walletAddress.length > 0 ? (
                                    String(walletAddress).substring(0, 6) +"..." +String(walletAddress).substring(38)
                                ) : (
                                    "Connect Wallet"
                                )}</span>
                                </button>
                                {kycStatus != "approved" && <a  className="btn dashboard-btn-kyc" href="/kyc"><span className="dshbord-btn-txt">KYC Application</span> </a> }

                                
                            </div>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a  onClick={() => openDropDownMenu()}  className= {`nav-link ${showDropdown === true ? "show" : ""}`} 
                                    href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={require('../../../assets/images/user.svg').default}  alt="" /> <span className="drpdown-text me-2">{fullName}</span>
                                        <i className="fa-solid fa-chevron-down drpdown-dashboard"></i>
                                    </a>
                                    
                                    <ul 
                                    className= {`dropdown-menu ${showDropdown === true ? "show" : ""}`}
                                      aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        {/* <li><a className="dropdown-item" href="#">Settings</a></li> */}
                                        <li><button className="dropdown-item"  onClick={logout}>Logout</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    <div className="line-bottom"></div>
                    {showLoader && <Loader />}
        </>
    );
};
 

const mapStateToProps = (state) => {
  return {
    user: state.User,
    userData:state.User.data
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch,),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
