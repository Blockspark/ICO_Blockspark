const Aboutus = () => {
    return (
        <>
          <section className="section about-sec aboutus-bg" id="aboutus">
                <div className="bg">
                <div className="container">
                  <div className="about-sec-wrp">
                    <h2 className="section-title text-center text-capitalize mb-2 mb-sm-4">About <span className="section-title-efct">Blockspark</span> </h2>
                    <p className="section-text text-center mb-4 mb-sm-5 section-text-max-wdth">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    
                    <div className="row about-sec-row">
                      <div className="col-12 col-lg-6 col-md-6 about-sec-col mb-4">
                        <div className="about-sec-col-wrp">
                          <div className="card img-fluid">
                            <img src={require("../../../assets/images/aboutus1.svg").default} className="card-img-top"  alt="" style={{width:"100%"}}  />
                            <div className="card-img-overlay p-2 p-lg-4">
                              <h4 className="card-title text-center">Immersive Content Portal
                              {/* <span className="abt-spn-title">Portal</span> */}
                              </h4>
                              <p className="card-text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-md-6 about-sec-col mb-4">
                        <div className="about-sec-col-wrp">
                          <div className="card img-fluid">
                            <img className="card-img-top"  src={require("../../../assets/images/aboutus2.svg").default} alt="" style={{width:"100%"}}  />
                            <div className="card-img-overlay p-2 p-lg-4">
                              <h4 className="card-title text-center">Generative AI 
                              {/* <span className="abt-spn-title">Platform</span> */}
                              </h4>
                              <p className="card-text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-md-6 about-sec-col mb-4">
                        <div className="about-sec-col-wrp">
                          <div className="card img-fluid">
                            <img className="card-img-top"  src={require("../../../assets/images/aboutus3.svg").default}  alt="" style={{width:"100%"}}/>
                            <div className="card-img-overlay p-2 p-lg-4">
                              <h4 className="card-title text-center">Online Gaming 
                              {/* <span className="abt-spn-title">Marketplace</span> */}
                              </h4>
                              <p className="card-text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-md-6 about-sec-col mb-4">
                        <div className="about-sec-col-wrp">
                          <div className="card img-fluid">
                            <img className="card-img-top"  src={require("../../../assets/images/aboutus4.svg").default}  alt="" style={{width:"100%"}}/>
                            <div className="card-img-overlay p-2 p-lg-4">
                              <h4 className="card-title text-center">Metaverse 
                              {/* <span className="abt-spn-title">Marketplace</span> */}
                              </h4>
                              <p className="card-text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
        </section>
        </>
    );
   
}
export default Aboutus;