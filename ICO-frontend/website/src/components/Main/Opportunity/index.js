
import React,{useState,useEffect} from "react";
const Opportunity = () => {

    const [activeTab, setActiveTab] = useState("tab1");
    const setActiveTabClick  = (tab) => {
         setActiveTab(tab);
    }

    useEffect(() => {

      let tab =  "tab1";
       setInterval(() => {
        if(tab === 'tab1'){
          tab = "tab2";
          setActiveTab(tab);
        }else if(tab === 'tab2'){
          tab = "tab3";
          setActiveTab(tab);
        }else if(tab === 'tab3'){
          tab = "tab1";
          setActiveTab(tab);
        }
      }, 3000);
     
    }, []);

    return (
        <>
         <section className="section opportunity-sec opportunity-bg">
             <div className="container">
                 <div className="opportunity-sec-wrp">
                   <div className="text-center">
                   <img className="opportunity-scrol-img" src={require("../../../assets/images/Scroll Animation.gif")} alt=""  />  
                   </div>
                   
                   <h2 className="section-title text-center text-capitalize">The <span className="section-title-efct">Opportunity</span> </h2>
                   <p className="section-text text-center mt-0 mt-sm-3 mb-0 mb-sm-4 section-text-max-wdth1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                   
                    <div className="row">

                        <div className="col-xl-6 opportunity-tab-col mt-4">
                            <ul className="nav nav-pills opportunity-tab" role="tablist">
                                <li className="nav-item mb-3 px-5">
                                  <a  onClick={() => setActiveTabClick("tab1")}
                                  className={`nav-link py-2 ${activeTab === 'tab1' ? "active" : ""}`}
                                        data-bs-toggle="pill">
                                      <h3 className="opportunity-tab-title"> <span className="opportunity-tab-title-efct">AI Assisted Immersive content is the Future</span></h3>
                                      <p className="opportunity-tab-para pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </a>
                                </li>
                                <li className="nav-item mb-3 px-5">
                                  <a 
                                  onClick={() => setActiveTabClick("tab2")}
                                  className={`nav-link py-2 ${activeTab === 'tab2' ? "active" : ""}`}
                                    data-bs-toggle="pill" >
                                    <h3 className="opportunity-tab-title"> <span className="opportunity-tab-title-efct">Immersive Content Growing</span></h3>
                                    <p className="opportunity-tab-para pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </a>
                                </li>
                                <li 
                                
                                className="nav-item mb-3 px-5">
                                  <a 
                                   onClick={() => setActiveTabClick("tab3")}
                                   className={`nav-link py-2 ${activeTab === 'tab3' ? "active" : ""}`}
                                  data-bs-toggle="pill" >
                                    <h3 className="opportunity-tab-title"> <span className="opportunity-tab-title-efct">Crypto will Supercharge Revenues</span></h3>
                                    <p className="opportunity-tab-para pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </a>
                                </li>
                              </ul>
                        </div>

                        <div className="col-xl-6 opportunity-tab-col mt-3 text-center">
                            <div className="tab-content">
                                <div id="future" 
                                className={`container tab-pane  ${activeTab === 'tab1' ? "active" : "fade"}`}
                                 ><br />
                                   <img  src={require("../../../assets/images/oppo1.png")}  alt="" />
                                </div>
                                <div id="grow" 
                                className={`container tab-pane  ${activeTab === 'tab2' ? "active" : "fade"}`}
                                 ><br />
                                   <img  src={require("../../../assets/images/oppo2.png")}  alt="" />
                                </div>
                                <div id="crypto" 
                                className={`container tab-pane  ${activeTab === 'tab3' ? "active" : "fade"}`}
                                ><br />
                                   <img src={require("../../../assets/images/oppo3.png")}    alt="" />
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
export default Opportunity;