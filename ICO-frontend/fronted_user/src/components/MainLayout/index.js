import React,{useState,useEffect} from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/'; 
import Header from './Header'; 
 


// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = (props) => {
    const [isActive, setIsActive] = useState(false);
    const openMenuClick = () => { // the callback. Use a better name
        setIsActive(!isActive)
      };
    return (
        <>
            <div className={isActive ? 'd-flex toggled' : 'd-flex'}  id="wrapper">
                {/* Sidebar start */}
                
                <Sidebar />
                <div id="page-content-wrapper">
                    <Header  openMenuClick={openMenuClick}  />
    
                    <Outlet />
                                {/* 
                            
                                <div className="row dashboard-page-row">
                                    <div className="col-lg-4 dashboard-page-col">
                                        <div className="dashboard-page-col-wrp">
                                        <h2 className="col-head mb-5">Token Information</h2>
                                        <p className="col-text">Tokens Symbol: <span className="col-text-spn">MFLIX</span></p>
                                        <p className="col-text">Token Value: <span className="col-text-spn">1 MFLIX = $0.1 DAI</span></p>
                                        <p className="col-text">Accepted: <span className="col-text-spn">DAI</span></p>
                                        <p className="col-text mb-4">Total Token Supply: <br /><span className="col-text-spn">150,000,000,000,000,001</span></p>
                                    </div>
                                    </div>
                                    <div className="col-lg-4 dashboard-page-col">
                                        <div className="dashboard-page-col-wrp">
                                        <h2 className="col-head">Buy Token</h2>
                                        <form action="/action_page.php">
                                            <div className="mb-2 form-col">
                                            <label  className="col-bttn-label mb-2" htmlFor="numbr">Enter Amount</label>
                                            <input type="password" className="form-control" id="numbr" placeholder="100999" name="pswd" />
                                            <p className="col-2-text mt-3 mb-5">Total 1009990: MFLIX</p>
                                            </div>
                                            <button type="submit" className="btn col-dashbrd-button"><span className="dashboard-btn-txt">Buy Token</span> </button>
                                        </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 dashboard-page-col">
                                        <div className="dashboard-page-col-wrp">
                                        <h2 className="col-head">Launch Date</h2>
                                        <p className="col-bttn-label-2 col-cln-head ">Start Date</p>
                                        <div className="calneder">
                                            <ul className="list-unstyled list-inline ">
                                                <li className="list-inline-item item-cln">02</li>
                                                <li className="list-inline-item  item-cln">05</li>
                                                <li className="list-inline-item  item-cln">2022</li>
                                            </ul>
                                            <ul className="list-unstyled list-inline ">
                                                <li className="list-inline-item item-name">Day</li>
                                                <li className="list-inline-item item-name">Month</li>
                                                <li className="list-inline-item item-name">Year</li>
                                            </ul>
                                            <p className="col-bttn-label-2 col-cln-head mt-5">End Date</p>
                                            <ul className="list-unstyled list-inline ">
                                                <li className="list-inline-item item-cln">02</li>
                                                <li className="list-inline-item item-cln">05</li>
                                                <li className="list-inline-item item-cln">2022</li>
                                            </ul>
                                            <ul className="list-unstyled list-inline ">
                                                <li className="list-inline-item item-name">Day</li>
                                                <li className="list-inline-item item-name">Month</li>
                                                <li className="list-inline-item item-name">Year</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="row dashboard-page-row">
                                    <div className="col-lg-4 dashboard-page-col">
                                        <div className="dashboard-page-col-wrp dashboard-page-col-1 ">
                                        <h2 className="col-head">Token Sale</h2>
                                        <p className="col-text">ICO Total Sale: <span className="col-text-spn">183 MFlix</span></p>
                                        <p className="col-text">Pre Total Sale: <span className="col-text-spn">101 MFlix</span></p>
                                        <p className="col-text">Total Token Sale: <span className="col-text-spn">284 MFlix</span></p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 dashboard-page-col">
                                        <div className="dashboard-page-col-wrp dashboard-page-col-1">
                                        <h2 className="col-head">Launch Details</h2>
                                        <p className="col-text-spn text-center">Phase 1 <span className="col-text">Live <img src={require('../../assets/images/live.png').default}  className="live" alt="" /></span></p>
                                        <p className="col-text">Price: <span className="col-text-spn">0.0001$ per token</span></p>
                                        <p className="col-text">Available Tokens: <span className="col-text-spn">100 Billion Tokens</span></p>
                                        </div>
                                    </div>
                                
                                </div> */}
                             
                </div>
            </div>

            
        </>
    );
};

export default MainLayout;
