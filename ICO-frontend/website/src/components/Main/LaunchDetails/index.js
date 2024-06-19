const LaunchDetails = () => {
    return (
        <>
            <section className="section launch-details">
          <div className="container launch-bg">
            <div className="launch-details-wrp">
              <div className="row launch-details-row">
                 <div className="col-lg-6 launch-details-col launch-details-col-left">
                   <div className="launch-details-wrp">
                    <h2 className="section-title text-capitalize mb-4">Launch <span className="section-title-efct">Details</span> </h2>
                    <div className="launch-details-left-contents">
                      <p className="launch-details-col-text">Token Type:&nbsp;&nbsp;<span className="launch-details-col-text-spn">ERC20 (ETH)</span></p>
                      <p className="launch-details-col-text">Total Name:&nbsp;&nbsp;<span className="launch-details-col-text-spn">MetaFlixWorld</span></p>
                      <p className="launch-details-col-text">Ticker:&nbsp;&nbsp;<span className="launch-details-col-text-spn">$MFLIX</span></p>
                      <p className="launch-details-col-text">Total Supply:&nbsp;&nbsp;<span className="launch-details-col-text-spn">1 Trillion</span></p>
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-6 launch-details-col launch-details-col-right mt-3">
                   <div className="launch-details-wrp">
                      <div className="row">
                        <div className="col-md-4 launch-details-col-right-box mb-2">
                          <div className="launch-details-col-right-box-wrp">
                            <div className="card launch-col-bg border" style={{height:"241.62px"}}   >
                              <div className="card-body text-center inner">
                                <h4 className="card-title text-capitalize launch-card-title1 mb-4">Pre-Sale</h4>
                                <p className="card-text launch-card-title2">$0.0001 per token</p>
                                <p className="card-text text-capitalize launch-card-title3 mb-4">100 Billion Tokens</p>
                                <p className="card-text text-capitalize launch-card-title4">September 16 <img   src={require("../../../assets/images/dot.png")} className="launch-live" alt="" /></p>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 launch-details-col-right-box mb-2">
                          <div className="launch-details-col-right-box-wrp">
                            <div className="card launch-col-bg border" style={{height:"241.62px"}} >
                              <div className="card-body text-center inner">
                                <h4 className="card-title text-capitalize launch-card-title1 mb-4">ICO</h4>
                                <p className="card-text launch-card-title2">$0.0002 per token</p>
                                <p className="card-text text-capitalize launch-card-title3 mb-4">50 Billion Tokens</p>
                                <p className="card-text text-capitalize launch-card-title4">Coming Soon</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 launch-details-col-right-box mb-2">
                          <div className="launch-details-col-right-box-wrp">
                            <div className="card launch-col-bg border" style={{height:"241.62px"}} >
                              <div className="card-body text-center inner">
                                <h4 className="card-title text-capitalize launch-card-title1 mb-4">Listing</h4>
                                <p className="card-text launch-card-title2">$0.0005 per token</p>
                                
                              </div>
                            </div>
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
export default LaunchDetails;