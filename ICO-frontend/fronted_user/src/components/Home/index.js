import React, { useState, useEffect } from "react";
import {
  // isVerifyUser,
  getCurrentWalletConnected,
  connectWallet,
  getPrice,
  loadContractTotalSupply,
  loadContractSymbol,
  loadContractTotalSale,
  // presaleStartTimestamp,
  // presaleEndTimestamp,
  loadContractIcoTotalSale,
  loadContractPreTotalSale,
  getPreSalPrice,
  switchNetwork
 
} from "../../helper/interact"
import { ethers } from "ethers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import User from "../../store/api/User"; 
import  showToast  from "../../helper/Api";
import {Loader} from "../Loader"
import {buyToken,convertToLocalDateFromUnix,todayDate} from "../../helper/Common";
import Emitter from "../../services/emitter";
import * as Actions from "../../store/action/user";

const Home = (props) => {

  const [transferAmount, setTransferAmount] = useState("");
  const [preSaleAmount, setPreSaleAmount] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [isVerifyUserCheck, setIsVerifyUserCheck] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");
  const [symbol, setSymbol] = useState(""); 
  const [totalSupply, setTotalSupply] = useState(""); 
  const [tokenSale, setTokenSale] = useState(""); 
  const [icoTotalSale, setIcoTotalSale] = useState(0); 
  const [preTotalSale, setPreTotalSale] = useState(0); 
  const [orginalPrice, setOrginalPrice] = useState("0.0001"); 
  const [price, setPrice] = useState(""); 
  const [startPresaleTime, setStartPresaleTime] = useState(""); 
  const [endPresaleTime, setEndPresaleTime] = useState(""); 
  const [kycStatus, setKycStatus] = useState("");
  const [viewBlockExpoler, setViewBlockExpoler] = useState("");
  const [totalGetToken, setTotalGetToken] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(process.env.REACT_APP_ETH);
  const [isPreSaleStart, setIsPreSaleStart] = useState(false);
  async function setup() {
      
    setShowLoader(true);
    await User.getUserDetail().then((res) => {
        
      if(res.data.statusCode === 200){
           
        let result = res.data.result;
        props.getUserFullName(result)
        Emitter.emit("setKycStatus", result.kyc_status);
        setKycStatus(result.kyc_status);
        if(result.white_list_status === "verify" && result.kyc_status === "approved"){
          setIsVerifyUserCheck(true);
          setErrorMessageText("");
        }else if( result.white_list_status !== "verify"){
          setErrorMessageText("Your account is under review, if need more information please contact administrator");
          setIsVerifyUserCheck(false);
        }else if(!result.kyc_status || result.kyc_status !== "approved"){
          setErrorMessageText("You must be complete the KYC process");
          setIsVerifyUserCheck(false);
        }else {
          setIsVerifyUserCheck(false);
        }
      }
      setShowLoader(false);
    }).catch((e) => {
      setShowLoader(false);
    })   
    
    setShowLoader(true);
    const { address } = await getCurrentWalletConnected();
    setWallet(address);

    const symbol = await loadContractSymbol();
    setSymbol(symbol);
     
    const totalSupply = parseInt( await loadContractTotalSupply());
    setTotalSupply(await  totalSupply.toLocaleString());
    
    const tokenSalevalue = await loadContractTotalSale();
    setTokenSale(tokenSalevalue);

    // const presaleStartTime = await presaleStartTimestamp();
     
    const presaleStartTimeValue = convertToLocalDateFromUnix(tokenSalevalue)
    setStartPresaleTime(presaleStartTimeValue.split("-"));
       
    // const presaleEndTime = await presaleEndTimestamp();
    const presaleEndTimeValue = convertToLocalDateFromUnix(tokenSalevalue)
    setEndPresaleTime(presaleEndTimeValue.split("-"));

    console.log("presaleStartTimeValue,",presaleStartTimeValue)
    console.log("presaleEndTimeValue,",presaleEndTimeValue)
    console.log("todayDate,",todayDate())
    
    // if((presaleEndTime !== 0 && presaleEndTime !== 0) && (todayDate() >= presaleEndTime && todayDate() <= presaleEndTimeValue)){
    //   setIsPreSaleStart(true)
    //   const priceValue = await getPreSalPrice(selectedCoin);
    //   setPrice(priceValue)
    // }else {
    //   const priceValue = await getPrice(selectedCoin);
    //   setPrice(priceValue)
    // }
    const icoSale = await loadContractIcoTotalSale();
    setIcoTotalSale(icoSale);

    const preSale = await loadContractPreTotalSale();
    setPreTotalSale(preSale);
      
    // if(address) {
    //   const response =  await isVerifyUser(address); 
    //   if(!response) {
    //     setErrorMessageText("Your account is under review, if need more information please contact administrator");
    //   }
    // }else {
    //   setErrorMessageText("Please connect your wallet");
    // }
    
   
    setShowLoader(false);
  }
  useEffect( () => {
    setShowLoader(true);
    setup();
  },[]);

  const closeModal = () => {
    setShowModal(false);
  }

  const setBlockExpolerDetail = async (res,tokenAmount) =>{
    const tokenSalevalue = await loadContractTotalSale();
    
    const icoSale = await loadContractIcoTotalSale();
    const preSale = await loadContractPreTotalSale();

    setTokenSale(tokenSalevalue);
    setIcoTotalSale(icoSale);
    setPreTotalSale(preSale);

    let transactionHash = res.transactionHash;
    let totalToken = parseFloat(tokenAmount) * 1;
    totalToken = totalToken / parseFloat(price) ;
    console.log("totalToken",totalToken)
    console.log("transactionHash",transactionHash)
    setTotalGetToken(totalToken)
    setViewBlockExpoler(`https://goerli.etherscan.io/tx/${transactionHash}`);
    setShowModal(true); 
  }

  const handelOnAmount = (e) => {
    let amount = e.target.value;
    setTransferAmount(amount)
    let totalToken = parseFloat(amount) * 1;
    totalToken = totalToken / parseFloat(price) ;
    if(parseFloat(totalToken) > 0 && totalToken !== ""){
      setTotalGetToken(totalToken)  
    }else {
      setTotalGetToken("")  
    }
    
  }


    /**
   * user select coin type from list and update price
   * @param {event} e 
   */
  const onCoinChange = async (e) => {
      let coinName = e.target.value;
      setShowLoader(true);
    /*   const priceValue  =  await getPriceBySymbol(coinName,orginalPrice);
      console.log("priceValue",priceValue); */

       const priceValue = await getPrice(coinName);
       console.log("selectedCoin",coinName)
       console.log("priceValue",priceValue)
      setPrice(priceValue);
      setSelectedCoin(coinName);
      setShowLoader(false); 
  }
  const buyTokenBtn = async (isPreSale) => {
    try {

      const networkVersion = 5 ;
      let tokenAmount = transferAmount;
      
    /*   if(isPreSale){
        tokenAmount = preSaleAmount
      } */
      console.log("tokenAmount",tokenAmount)
      if (walletAddress.length > 0) {
        setShowLoader(true);
        await buyMetaFlixToken  (tokenAmount,networkVersion,isPreSale,walletAddress)
        setShowLoader(false); 
      } else {
        
        const walletResponse = await connectWallet();
        setWallet(walletResponse.address); 
        setShowLoader(true);
        await buyMetaFlixToken  (tokenAmount,networkVersion,isPreSale,walletResponse.address)
        setShowLoader(false); 
      }
    } catch (err) {
      console.log(err);
    }
  }

  const buyMetaFlixToken = async (tokenAmount,networkVersion,isPreSale,address) => {
    if(parseInt(window.ethereum.networkVersion)  !==  networkVersion){ // check valid test network
      await switchNetwork(networkVersion)
    } 
    
    if (tokenAmount !== "") { // check amount empty
      try {
        let amount = ethers.utils.parseUnits(tokenAmount, 18);
        if (amount.isNegative()) {
          showToast({ message: "Invalid amount", type: "error" });
        }else {
          setShowLoader(true);
          let price = await getPrice(selectedCoin);
          console.log("price",price)
          if(tokenAmount >= price){
        
            const res = await buyToken(address,tokenAmount,totalGetToken,isPreSale,selectedCoin);
            console.log("res",res)
            if(res){
              setBlockExpolerDetail(res,tokenAmount);
              setTransferAmount("");
              setPreSaleAmount("");
            }
          }else {
            showToast({ message: "Please enter a minimum amount "+price, type: "error" });
            setShowLoader(false);
          }
          setShowLoader(false);
        }
      } catch {
        setShowLoader(false);
        showToast({ message: "Invalid amount", type: "error" });
      }
            
    }
  }
  return (
    <>
      <section className="section dashboard-page">
        <div className="container">
          <div className="dashboard-page-wrp px-sm-3"> 
            {showLoader && <Loader />}
            <div className="dashbrd-head">
              <ul className="list-unstyled list-inline  ">
                <li className="list-inline-item "> <h1 className="dashboard-title"><span className="dsbrd-title">Dashboard</span></h1></li>
                <li className="list-inline-item ">  <p className="dashboard-heading">KYC verification is {kycStatus}!
                  {kycStatus !== "approved" && <a className="kyc-link" href="/kyc">Verify</a>}
                </p></li>
              </ul>
            </div>
            <div className="row dashboard-page-row">
              <div className="col-lg-4 dashboard-page-col">
                <div className="dashboard-page-col-wrp">
                  <h2 className="col-head mb-5">Token Information</h2>
                  <p className="col-text">Tokens Symbol: <span className="col-text-spn">{symbol}</span></p>
                  <p className="col-text">Token Value: <span className="col-text-spn">1 {symbol} = {price} {selectedCoin}</span></p>
                  <p className="col-text">Accepted: <span className="col-text-spn">{process.env.REACT_APP_ETH}, {process.env.REACT_APP_DAI}, {process.env.REACT_APP_USDT}</span></p>
                  <p className="col-text mb-4">Total Token Supply: <br /><span className="col-text-spn">{totalSupply}</span></p>
                </div>
              </div>
              <div className="col-lg-4 dashboard-page-col">
                <div className="dashboard-page-col-wrp">
                                    
                  {isVerifyUserCheck ?  (
                    <>
                      <h2 className="col-head">Buy Token</h2>
                      <div className="text-center mt-3">
                      <div className="mb-3 form-check form-check-inline">
                          <div className="radio">
                              <label className="text-white">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      value={process.env.REACT_APP_ETH}
                                      checked={selectedCoin === process.env.REACT_APP_ETH}
                                      onChange={onCoinChange}
                                  />
                                  {process.env.REACT_APP_ETH}
                              </label>
                          </div>
                      </div>
                      
                      <div className="mb-3 form-check form-check-inline">
                          <div className="radio">
                              <label className="text-white">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      value={process.env.REACT_APP_DAI}
                                      checked={selectedCoin === process.env.REACT_APP_DAI}
                                      onChange={onCoinChange}
                                  />
                                  {process.env.REACT_APP_DAI}
                              </label>
                          </div>
                      </div> 

                        <div className="mb-3 form-check form-check-inline">
                          <div className="radio">
                              <label className="text-white">
                                  <input
                                      className="form-check-input"
                                      type="radio"
                                      value={process.env.REACT_APP_USDT}
                                      checked={selectedCoin === process.env.REACT_APP_USDT}
                                      onChange={onCoinChange}
                                  />
                                  {process.env.REACT_APP_USDT}
                              </label>
                          </div>
                      </div> 
                       
                      </div>
                                                
                      <div className="mb-2 form-col">
                        <label  className="buy-token-label mb-2" htmlFor="numbr">Enter Amount</label>
                        <input type="text" onChange={handelOnAmount} value={transferAmount} className="form-control dashboard-token-input" id="numbr" placeholder="0" name="pswd" />
                                                                
                        {totalGetToken && <p className="col-2-text mt-3 mb-5">You will receive total {totalGetToken} : {symbol}</p>}
                      </div>
                      <div className="d-flex justify-content-center">
                      <button  onClick={() => buyTokenBtn(isPreSaleStart)}  className="btn col-dashbrd-button"><span className="dashboard-btn-txt">Buy Token</span> </button>
                      </div>                                
                    </>
                  ) : (errorMessageText ? (<div className="alert alert-danger" role="alert">
                    {errorMessageText}
                  </div>) :("")
                  )}
                </div>
              </div>
              
              {isPreSaleStart &&  <div className="col-lg-4 dashboard-page-col">
                <div className="dashboard-page-col-wrp">
                  <h2 className="col-head">Launch Date</h2>
                  <p className="col-bttn-label-2 col-cln-head ">Start Date</p>
                  <div className="calneder">
                    <ul className="list-unstyled list-inline ">
                      <li className="list-inline-item item-cln">{startPresaleTime && startPresaleTime[0] }</li>
                      <li className="list-inline-item  item-cln">{startPresaleTime && startPresaleTime[1] }</li>
                      <li className="list-inline-item  item-cln">{startPresaleTime && startPresaleTime[2] }</li>
                    </ul>
                    <ul className="list-unstyled list-inline ">
                      <li className="list-inline-item item-name">Day</li>
                      <li className="list-inline-item item-name">Month</li>
                      <li className="list-inline-item item-name">Year</li>
                    </ul>
                    <p className="col-bttn-label-2 col-cln-head mt-5">End Date</p>
                    <ul className="list-unstyled list-inline ">
                      <li className="list-inline-item item-cln">{endPresaleTime && endPresaleTime[0]}</li>
                      <li className="list-inline-item item-cln">{endPresaleTime && endPresaleTime[1]}</li>
                      <li className="list-inline-item item-cln">{endPresaleTime && endPresaleTime[2]}</li>
                    </ul>
                    <ul className="list-unstyled list-inline ">
                      <li className="list-inline-item item-name">Day</li>
                      <li className="list-inline-item item-name">Month</li>
                      <li className="list-inline-item item-name">Year</li>
                    </ul>
                  </div>
                </div>
              </div>
              }
            </div>
            <div className="row dashboard-page-row">
              <div className="col-lg-4 dashboard-page-col">
                <div className="dashboard-page-col-wrp dashboard-page-col-1 ">
                  <h2 className="col-head">Token Sale</h2>
                  <p className="col-text">ICO Total Sale: <span className="col-text-spn">{icoTotalSale} {symbol}</span></p>
                  <p className="col-text">Pre Total Sale: <span className="col-text-spn">{preTotalSale} {symbol}</span></p>
                  <p className="col-text">Total Token Sale: <span className="col-text-spn">{tokenSale} {symbol}</span></p>
                </div>
              </div>
              <div className="col-lg-4 dashboard-page-col">
                <div className="dashboard-page-col-wrp dashboard-page-col-1">
                  <h2 className="col-head">Launch Details</h2>
                  <p className="col-text-spn text-center">Phase 1 <span className="col-text">September 16 <img src={require("../../assets/images/live.svg").default}  className="live" alt="" /></span></p>
                  <p className="col-text">Price: <span className="col-text-spn">{price} per token</span></p>
                  <p className="col-text">Available Tokens: <span className="col-text-spn">1 Trillion Tokens</span></p>
                </div>
              </div>                          
            </div>                        
            {showModal && <div className="modal" id="rect-myModal" style={{display:"block"}}>
              <div className="modal-dialog">
                <div className="modal-content">
                  
                  <div className="modal-header">
                    <h4 className="modal-title">Buy Token Detail</h4>
                    <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <p>You have Got Total {totalGetToken} {symbol} </p><br />
                    <a href={viewBlockExpoler} className="link-primary" >View on block explorer </a>
                  </div>
                  
                </div>
              </div>
            </div> }
          </div>
        </div>
      </section>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch,),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
