const Aboutus = () => {
    return (
        <>
          <section className="section about-sec aboutus-bg" id="aboutus">
                <div className="bg">
                <div className="container">
                  <div className="about-sec-wrp">
                    <h2 className="section-title text-center text-capitalize mb-2 mb-sm-4">About <span className="section-title-efct">MetaFlixWorld</span> </h2>
                    <p className="section-text text-center mb-4 mb-sm-5 section-text-max-wdth">We are a group of people with technology and movie industry expertise. Our mission is to accelerate the adoption of Generative AI and crypto in the world of media creating the next generation media enterprise.</p>
                    
                    <div className="row about-sec-row">
                      <div className="col-12 col-lg-6 col-md-6 about-sec-col mb-4">
                        <div className="about-sec-col-wrp">
                          <div className="card img-fluid">
                            <img src={require("../../../assets/images/aboutus1.svg").default} className="card-img-top"  alt="" style={{width:"100%"}}  />
                            <div className="card-img-overlay p-2 p-lg-4">
                              <h4 className="card-title text-center">Immersive Content Portal
                              {/* <span className="abt-spn-title">Portal</span> */}
                              </h4>
                              <p className="card-text text-center">Our Netflix-like portal will feature 3D and 3DVR content. The content will be created using our proprietary software.</p>
                              
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
                              <p className="card-text text-center">Generative AI, such as ChatGPT and DALL-E2, will reshape the world of gaming and entertainment bringing unprecedented opportunities</p>
                              
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
                              <p className="card-text text-center">AI can be used to make the games feel more immersive, allow non-playable characters to have a mind of their own</p>
                              
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
                              <p className="card-text text-center">Our metaverse platform will feature virtual theaters, theme parks, shops and live events.</p>
                              
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