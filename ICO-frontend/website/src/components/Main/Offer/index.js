const Offer = () => {
    return (
        <>
           <section className="section offer offer-bg">
            <div className="container">
                <div className="offer-wrp">
                <h2 className="section-title text-center text-capitalize">Our <span className="section-title-efct">Offerings</span> </h2>
                
             <div className="row offer-row text-center">
                <div className="col-xl-4 col-md-6 py-3">
                    <div className="offer-top-col-wrp offer-col p-4">
                        <div className="offer-icon  mb-3"> <img src={require("../../../assets/images/offer1.svg").default}  alt="" /> </div>
                        <div className="offer-heading"><span className="offer-heading-efct">3D</span></div>
                        <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 py-3">
                    <div className="offer-top-col-wrp offer-col p-4">
                        <div className="offer-icon  mb-3"><img src={require("../../../assets/images/offer2.svg").default}  alt="" /></div>
                        <div className="offer-heading"><span className="offer-heading-efct">3DVR</span></div>
                        <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                </div>
                {/* <div className="col-xl-3 py-3">
                    <div className="offer-top-col-wrp offer-col p-4">
                        <div className="offer-icon  mb-3"><img src={require("../../../assets/images/offer3.svg").default}  alt="" /></div>
                        <div className="offer-heading">Flix <span className="offer-heading-efct">Theaters</span></div>
                        <div className="offer-para">Virtual theaters showcasing 2D movies. Provide an extension of realworld theaters.</div>
                    </div>
                </div> */}
                <div className="col-xl-4 col-md-6 py-3">
                    <div className="offer-top-col-wrp offer-col p-4">
                        <div className="offer-icon  mb-4 pb-2"><img src={require("../../../assets/images/offer3.svg").default}  alt="" /></div>
                        <div className="offer-heading"><span className="offer-heading-efct">AI</span></div>
                        <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 py-3">
                  <div className="offer-top-col-wrp offer-col p-4">
                      <div className="offer-icon mb-3"><img src={require("../../../assets/images/offer4.svg").default}  alt="" /></div>
                      <div className="offer-heading"><span className="offer-heading-efct">Games</span></div>
                      <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </div>
                </div>
                {/* <div className="col-xl-3  py-3">
                  <div className="offer-top-col-wrp offer-col p-4">
                      <div className="offer-icon  mb-3"><img src={require("../../../assets/images/offer6.svg").default}  alt="" /></div>
                      <div className="offer-heading">Flix <span className="offer-heading-efct">NFT</span></div>
                      <div className="offer-para">NFT marketplace. Plugins to enable NFT creation and upload to marketplace.</div>
                  </div>
                </div> */}
                <div className="col-xl-4 col-md-6 py-3">
                  <div className="offer-top-col-wrp offer-col p-4">
                      <div className="offer-icon  mb-3"><img src={require("../../../assets/images/offer5.svg").default}  alt="" /></div>
                      <div className="offer-heading"><span className="offer-heading-efct">Worlds</span></div>
                      <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 py-3">
                  <div className="offer-top-col-wrp offer-col p-4">
                      <div className="offer-icon  mb-3"><img  src={require("../../../assets/images/offer6.svg").default} alt="" /></div>
                      <div className="offer-heading"><span className="offer-heading-efct">Wallet</span></div>
                      <div className="offer-para mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </div>
                </div>
               </div>
               </div>
            </div>
        </section>
        </>
    );
   
}
export default Offer;