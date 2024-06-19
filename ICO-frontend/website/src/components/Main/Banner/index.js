
const Banner = () => {
    return (
        <>
             <section className="section mcubez-banner mt-3">
             
                    <div className="banner-content-box  text-center">
                        <div>
                            <p className="banner-top-text mb-1"><span className="">
                            <img src={require("../../../assets/images/new_metaflixsplash-bannerlogo1.png") } alt="" />
                            </span></p>
                            <h1 className="banner-middle-text">Welcome to MetaFlixWorld</h1>
                            <p className="section-text banner-text-p">
                            Bridging the worlds of Generative AI, Immersive Media, Gaming and Crypto. Watch immersive 3D and 3DVR content, play online games and explore movie themed worlds.
                            </p>
                            
                            <div  className="banner-btn">
                                <a className="btn section-btn text-capitalize"   href="/#" role="button" rel="noreferrer"><span className="bnr-text">Join MetaFlix</span> </a>
                            </div>
                            </div>
                    </div>
               
            
            </section>
        </>
    );
   
}
export default Banner;