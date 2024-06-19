import React, { useState } from "react";
import MetaflixWorld from '../../../assets/MetaflixWorld_WP_3.pdf';
import MetaflixPPTVideo from '../../../assets/MFlix_video.mp4';

const RoadMap = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
    setTimeout(function(){
      document.getElementById("vid").play();
  }, 500);
  }
    return (
        <>
         
        <section className="section learn-more-sec" id="whitepaper">
          <div className="container">
            <div className="learn-more-sec-wrp text-center">
              <div className="learn-more-sec-box">
                <h2 className="section-title whitepaper-text text-center"><span className="section-title-efct">Learn more about MetaFlixWorld</span> </h2>
                <img className="learn-more-sec-ply-btn mb-2"  src={require("../../../assets/images/play-btn.svg").default} alt="" onClick={openModal} />
                <div className="learn-more-sec-link"><button onClick={openModal} >Learn more</button></div>
              </div>
              <div className="learn-more-sec-btn mt-3 pb-5">
                {/* <button type="button" onClick={downloadWhitePaper} className="btn btn-outline-secondary learn-more-btn">Download Whitepaper</button> */}
                <a
                    href={MetaflixWorld}
                    download="MetaflixWorld"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-secondary learn-more-btn">
                    Download Whitepaper
                </a>
              </div>
            </div>
          </div>
        </section>
        {showModal && <div style={{"display":"block"}} className="modal" id="rect-myModal">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  
                  <div className="modal-header">
                    
                    <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                  <video muted  loop controls  playsInline={true} id="vid" type="video/mp4" className="back-video"  width="100%" height="100%" src={MetaflixPPTVideo}></video> 
                  </div>  
                </div>
              </div>
        </div>}
        </>
    );
   
}
export default RoadMap;