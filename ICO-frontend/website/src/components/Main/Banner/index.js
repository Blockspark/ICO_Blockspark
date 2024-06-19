
const Banner = () => {
    return (
        <>
             <section className="section mcubez-banner mt-3">
             
                    <div className="banner-content-box  text-center">
                        <div>
                            <p className="banner-top-text mb-1"><span className="">
                            <img src={require("../../../assets/images/Blockspark_Logo.png") } alt="" />
                            </span></p>
                            <h1 className="banner-middle-text">Welcome to Blockspark</h1>
                            <p className="section-text banner-text-p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            
                            <div  className="banner-btn">
                                <a className="btn section-btn text-capitalize"   href="/#" role="button" rel="noreferrer"><span className="bnr-text">Join Blockspark</span> </a>
                            </div>
                            </div>
                    </div>
               
            
            </section>
        </>
    );
   
}
export default Banner;