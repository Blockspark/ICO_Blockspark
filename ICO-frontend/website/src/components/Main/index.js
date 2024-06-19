import React from "react";
import Banner from "./Banner";
import Opportunity from "./Opportunity";
import Aboutus from "./Aboutus";
import Offer from "./Offer";
import LaunchDetails from "./LaunchDetails";
import Team from "./Team";
import RoadMap from "./RoadMap";
import Whitepaper from "./Whitepaper";
import Footer from "./Footer";

const Main = () => {
  
    return (
        <>
          <main>
          <Banner />
            <div className="mcube-bg">
              <Opportunity />
              <Aboutus />
              <Offer />
              <LaunchDetails />
              <Team />
              <RoadMap />
              <Whitepaper />
              <Footer />
            </div>
          </main>
        </>
    );
}
export default Main;
