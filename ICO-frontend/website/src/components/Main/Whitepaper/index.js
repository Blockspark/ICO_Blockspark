import React, { useState } from "react";
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
                <h2 className="section-title whitepaper-text text-center"><span className="section-title-efct">Learn more about Product</span> </h2>
                <img className="learn-more-sec-ply-btn mb-2"  src={require("../../../assets/images/Blockspark_Logo.png").default} alt="" />
                <div className="learn-more-sec-link" style={{color:'white'}}>Learn more</div>
              </div>
              <div className="learn-more-sec-btn mt-3 pb-5">
                {/* <button type="button" onClick={downloadWhitePaper} className="btn btn-outline-secondary learn-more-btn">Download Whitepaper</button> */}
                <a
                    href="#"
                    rel="noreferrer"
                    className="btn btn-outline-secondary learn-more-btn">
                    Download Whitepaper
                </a>
              </div>
            </div>
          </div>
        </section>
        </>
    );
   
}
export default RoadMap;