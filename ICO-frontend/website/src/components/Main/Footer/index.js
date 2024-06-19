import React, { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  }
    return (
        <>
         
         <footer className="footer-sec" id="contact-us">
         <div className="container">
           <div className="footer-sec-wrp">
             <div className="footer-sec-top text-center text-capitalize">
             <img className="" width="60px" src={ require("../../../assets/images/Blockspark_Logo.png") } alt="" />
             <h3 style={{ color: 'white', margin: 0 }} >Blockspark</h3>
               {/* <h4 className="footer-top-title mt-2"></h4> */}
               <div className="footer-links mb-4">
                   <ul className="list-group list-group-horizontal  justify-content-center">
                    <li className="list-group-item"><a href="/#aboutus">about</a></li>
                    <li className="list-group-item"><a href="/#whitepaper">white paper</a></li>
                    {/* <li className="list-group-item"><button className="help-menu-btn"  onClick={() => setShowModal(true)}>Help</button></li> */}
                  </ul>
               </div>
             </div>
             <div className="footer-sec-bottom">
              
               <hr className="footer-border" />
               <span className="footer-text-left">© 2022 Blockspark. All rights reserved</span>
               <span className="footer-right"> <ul className="list-group list-group-horizontal justify-content-end">
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-instagram"></i></a></li>
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-discord"></i></a></li>
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-twitter"></i></a></li>
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-youtube"></i></a></li>
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-solid fa-envelope"></i></a></li>
                <li className="list-group-item social-links-right"><a href="#" className="social-links"><i className="fa-brands fa-telegram"></i></a></li> 
              </ul></span>
             </div>
           </div>
         </div>
      </footer>
      {showModal && <div style={{"display":"block"}} className="modal" id="rect-myModal">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header"> 
                    <h2>Help</h2>
                    <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                        <div className="col"> 
                        
                          <div id="accordion">
                            <div className="card mt-1 card-faq" >
                              <div className="card-header">
                                <a className="btn" data-bs-toggle="collapse" href="#collapseOne">
                                  How do I create an account on Blockspark?
                                </a>
                              </div>
                              <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
                                <div className="card-body">
                                  <div className="row">
                                          <div className="col-12">
                                              <p>You can register yourself on the Blockspark website.</p> 
                                              <p>Enter your Full name, Email ID, and Password, and get yourself Signed up.</p>
                                          </div>
                                          <div className="col-12">
                                            <iframe width="900" height="500" src="" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                          </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-1 card-faq">
                              <div className="card-header">
                                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseTwo">
                                How do I complete the KYC process for an Blockspark token purchase?
                                
                              </a>
                              </div>
                              <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                                <div className="card-body">
                                    <div className="row">
                                          <div className="col-12">
                                              <p>Provide the requested personal information and upload necessary documents</p> 
                                          </div>
                                          <div className="col-12">
                                            <iframe width="900" height="500" src="https://www.youtube.com/embed/OObPp9bQyig?si=-1kVke1pof-AcHll" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                          </div>
                                      </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-1 card-faq">
                              <div className="card-header">
                                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseMetamask">
                                How do I connect metamask wallet?
                              </a>
                              </div>
                              <div id="collapseMetamask" className="collapse" data-bs-parent="#accordion">
                                <div className="card-body">
                                  <div className="row">
                                          <div className="col-12">
                                              <p>1. Download Metamask from this link : https://metamask.io/download/</p> 
                                              <p>2. Install Metamask</p>
                                              <p>3. Setup Account and connect account with Metamask</p>
                                          </div>
                                          <div className="col-12">
                                          <iframe width="900" height="500" src="https://www.youtube.com/embed/_pG2Emq2sxw?si=Sfx495DySKmKN_LT" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                          </div>
                                      </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-1 card-faq">
                              <div className="card-header">
                                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseThree">
                                  How do I buy Blockspark tokens?
                                </a>
                              </div>
                              <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
                                <div className="card-body">
                                  
                                  <div className="row">
                                          <div className="col-12">
                                              <p>You can buy Blockspark tokens with ETH, USDT DAI token.</p> 
                                          </div>
                                          <div className="col-12">
                                          <iframe width="900" height="500" src="https://www.youtube.com/embed/KJ3oCFwOtMA?si=EE47xo7o0ey5hDGo" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                          </div>
                                      </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-1 card-faq">
                              <div className="card-header">
                                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapsefaq">
                                FAQ
                                </a>
                              </div>
                              <div id="collapsefaq" className="collapse" data-bs-parent="#accordion">
                                <div className="card-body">                                  
                                  <p><a href="#">FAQ</a></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>  
                </div>
              </div>
        </div>}
        </>
    );
   
}
export default Footer;