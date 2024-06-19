const RoadMap = () => {
    return (
        <>
          <section className="section road-map" id="roadmap">
            <div className="container-fluid"> 
            <div className="road-map-wrp">
              <h2 className="section-title text-center text-capitalize">Road <span className="section-title-efct">Map</span> </h2>
              <div className="roadmap-section">
              <div className="road-map-img responsive-img">
                {/* <img className="road-round" src={require("../../../assets/images/round.png").default}  alt="" />
                <img className="road-round-btm" src={require("../../../assets/images/round.png").default}    alt="" /> */}

                <div className="row road-map-row justify-content-center responsive-left">
                  <div className="col-md-7 road-map-col1 flag-img position-relative">
                    <div className="road-map-box">
                      
                        <h5 className="road-map-box-title-left mb-0">Phase 1 Sale</h5>
                        <h5 className="road-map-box-title-right mb-0">3Q 23</h5>
                      {/* <p className="road-map-box-para">This is a presale token round. Launch date will be around September 2022. 100 Billion tokens will be sold.</p> */}
                    </div>
                  </div>
                </div>

                <div className="row road-map-row justify-content-end responsive-side">
                  <div className="col-md-6 road-map-col2 flag-img position-relative">
                    <div className="road-map-box">
                      
                      <h5 className="road-map-box-title-left mb-0">Phase 2 Sale</h5>
                      <h5 className="road-map-box-title-right mb-0">4Q 23</h5>
                    {/* <p className="road-map-box-para">This is a presale token round. Launch date will be around December 2022. 50 Billion tokens will be sold.</p> */}
                  </div>
                  </div>
                </div>

                <div className="row road-map-row justify-content-center responsive-left">
                  <div className="col-md-7 road-map-col3 flag-img position-relative">
                    <div className="road-map-box">
                      
                      <h5 className="road-map-box-title-left mb-0">Platform Updates</h5>
                      <h5 className="road-map-box-title-right roadmap-box2 mb-0">1Q 24</h5>
                    {/* <p className="road-map-box-para">Flix walllet will enable trading of crypto currencies & NFTs. This will be a mobile app on iOS & Android.</p> */}
                  </div>
                  </div>
                </div>

                <div className="row road-map-row justify-content-end responsive-side">
                  <div className="col-md-6 road-map-col4 flag-img position-relative">
                    <div className="road-map-box">
                      
                      <h5 className="road-map-box-title-left mb-0">Platform Launch</h5>
                      <h5 className="road-map-box-title-right mb-0">2Q 24</h5>
                    {/* <p className="road-map-box-para">Flix NFT will be a platform to trade NFTs. Plugins to create NFTs for the platform will be available.</p> */}
                  </div>
                  </div>
                </div>
           
                <div className="row road-map-row justify-content-center responsive-left">
                  <div className="col-md-7  road-map-col5 flag-img position-relative">
                    <div className="road-map-box">
                      
                      <h5 className="road-map-box-title-left mb-0">Marketing Begins</h5>
                      <h5 className="road-map-box-title-right roadmap-box3 mb-0">3Q 24</h5>
                    {/* <p className="road-map-box-para">This will be a platform to view immersive content 3D & 3DVR movies & Shows as well as live metaverse shows.</p> */}
                  </div>
                  </div>
                </div>

                <div className="row road-map-row justify-content-end  responsive-side">
                  <div className="col-md-6 road-map-col6 flag-img position-relative">
                    <div className="road-map-box">
                      
                      <h5 className="road-map-box-title-left mb-0">MLM Marketing Launch</h5>
                      <h5 className="road-map-box-title-right roadmap-box3 mb-0">4Q 24</h5>
                    {/* <p className="road-map-box-para">This will be a movie themed worlds where user can interact will movie characters. Shop as well as buy land.</p> */}
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
export default RoadMap;