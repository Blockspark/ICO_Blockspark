import { ethers } from "ethers";
import showToast from "./Api";
import axios from "axios";

const saleContractJson  = require("../contracts/sale.json") ;
const tokenContractJson = require("../contracts/token.json") ;
const daiContractJson = require("../contracts/dai.json") ;
const usdtContractJson = require("../contracts/usdt.json") ;
const { ethereum } = window; 

const providerUrl = process.env.REACT_APP_PROVIDER_URL;
const saleContractAddress = process.env.REACT_APP_SALE_CONTRACT_ADDRESS; //Sale
const tokenContractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS; //token 
const daiContractAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS; //dai token 
const usdtContractAddress = process.env.REACT_APP_USDT_CONTRACT_ADDRESS; //usdt token 

export const jsonProvider = new ethers.providers.JsonRpcProvider(providerUrl);
export const jsonSigner = jsonProvider.getSigner();
export const tokenContractDetails = new ethers.Contract(tokenContractAddress, tokenContractJson, jsonProvider);
export const saleContractDetails = new ethers.Contract(saleContractAddress, saleContractJson, jsonProvider);


export const loadContractSymbol = async () => {
  let  symbolDetail = await tokenContractDetails.symbol();
  return symbolDetail;
};

export const loadContractTotalSupply = async () => {
  let totalSupplyvalue = ethers.BigNumber.from(await tokenContractDetails.totalSupply()).div(ethers.BigNumber.from(10).pow(6).toString()).toString();
  return totalSupplyvalue;
};

export const loadContractTotalSale = async () => {
  let  totalSaleValue = ethers.BigNumber.from(await saleContractDetails.totalSold()).toString();
  return totalSaleValue;
};

export const loadContractIcoTotalSale = async () => {
  let  totalSaleValue = ethers.BigNumber.from(await saleContractDetails.icoTotalSold()).toString();
  return totalSaleValue;
};

export const loadContractPreTotalSale = async () => {
  let  totalSaleValue = ethers.BigNumber.from(await saleContractDetails.preTotalSold()).toString();
  return totalSaleValue;
};

export const getPrice = async (coinName) => {
 
  let priceValue = 0;
  if (coinName === process.env.REACT_APP_ETH) {
      priceValue =  ethers.BigNumber.from(await saleContractDetails.getPriceETH()).toString();
  } else if (coinName === process.env.REACT_APP_DAI) {
      priceValue = ethers.BigNumber.from(await saleContractDetails.getPriceDaiToken()).toString();
  } else if (coinName === process.env.REACT_APP_USDT) {
    priceValue = ethers.BigNumber.from(await saleContractDetails.getPriceUsdtToken()).toString();
}
 
  if (coinName === process.env.REACT_APP_USDT) {
    return ethers.utils.formatUnits(priceValue,6);
  }else {
    return ethers.utils.formatUnits(priceValue,18);
  }
};

export const getPreSalPrice = async (coinName) => {

  let priceValue = 0;
  if (coinName === process.env.REACT_APP_ETH) {
      priceValue =  ethers.BigNumber.from(await saleContractDetails.presalePriceETH()).toString();
  } else if (coinName === process.env.REACT_APP_DAI) {
      priceValue = ethers.BigNumber.from(await saleContractDetails.presalePriceDAI()).toString();
  }else if (coinName === process.env.REACT_APP_USDT) {
    priceValue = ethers.BigNumber.from(await saleContractDetails.presalePriceUSDT()).toString();
}
  if (coinName === process.env.REACT_APP_USDT) {
    return ethers.utils.formatUnits(priceValue,6);
  }else {
    return ethers.utils.formatUnits(priceValue,18);

  }
};



// export const presaleEndTimestamp = async () => {
//   let  time = ethers.BigNumber.from(await saleContractDetails.presaleEndTimestamp()).toString();
//   return time;
// };


// export const presaleStartTimestamp = async () => {
//   let  time = ethers.BigNumber.from(await saleContractDetails.presaleStartTimestamp()).toString();
//   return time;
// };


// export const isVerifyUser = async (address) => {
//   let  data = await saleContractDetails.verifyUser(address,{gasLimit: 2122956})
//     .then((arg) => {
//       return arg;	
//     }).catch((error) => {
//       console.log(error);
//       return error;
//     });
//   return data;
// };

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
 
    showToast({ message: ` <a target="_blank" rel="noreferrer" href="https://metamask.io/download.html">
    You must install Metamask, a virtual Ethereum wallet, in your
    browser.
  </a>`, type: "error" });
    return {
      address: "",
      status: "",
    };
  }
};

export const addWhiteListUser = async (address) => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(); 
  const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
  try {
    return	await saleContractDetailsWithSigner.addWhitelistUser(address,{gasLimit: 2122956})
      .then((arg) => {
        console.log("arg",arg)
        return arg;	
      }).catch((error) => {
        console.log(error);
        return error;
      });     
  } catch (error) {
    console.log(error);
    return false;
  }

}

export const addMultipleUserWhiteList = async (addressArray) => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(); 
  const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
  try {
    return	await saleContractDetailsWithSigner.batchWhitelist(addressArray,{gasLimit: 140934})
      .then((arg) => {
        return arg;	
      }).catch((error) => {
        return error;
      });     
  } catch (error) {
 
    return false;
  }

}
export const buyTokenWithEth = async(finalAmount,isPreSale,signer) => {
  const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
  try {
      if(isPreSale){
        return await saleContractDetailsWithSigner
                .preSaleBuyTokenWithETH({ "value": finalAmount })
                .then((arg) => {
                  return arg;	
                }).catch((error) => {
                  console.log(error);
                  return error;
                });
    }else {
      return await saleContractDetailsWithSigner
                
      .buyTokenWithETH({ "value": finalAmount })
      .then((arg) => {
        return arg;	
      }).catch((error) => {
        console.log(error);
        return error;
      });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const buyTokenWithDai = async(finalAmount,isPreSale,signer) => {
  const daiContractDetailsWithSigner = new ethers.Contract(daiContractAddress, daiContractJson, signer);
  const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
  console.log("finalAmount",finalAmount) 
  try {
      if(isPreSale){
        let approve = await daiContractDetailsWithSigner
        .approve(saleContractAddress,finalAmount,{gasLimit: 200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          return error;
        });
      if(approve.hash){
        return await saleContractDetailsWithSigner
        .presaleBuyTokenWithDAI(finalAmount,{gasLimit:200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }else {
        return false;
      }
    }else {
        let approve = await daiContractDetailsWithSigner
        .approve(saleContractAddress,finalAmount,{gasLimit: 200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          return error;
        });
        if(approve.hash){
          return await saleContractDetailsWithSigner
          .buyTokenWithDAI(finalAmount,{gasLimit:200000})
          .then((arg) => {
            return arg;	
          }).catch((error) => {
            console.log(error);
            return error;
          });
        }else {
          return false;
        }
      }
     
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const buyTokenWithUsdt = async(finalAmount,isPreSale,signer) => {
  const usdtContractDetailsWithSigner = new ethers.Contract(usdtContractAddress, usdtContractJson, signer);
  const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
  try {
      if(isPreSale){
        let approve = await usdtContractDetailsWithSigner
        .approve(saleContractAddress,finalAmount,{gasLimit: 200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          return error;
        });
      if(approve.hash){
        return await saleContractDetailsWithSigner
        .presaleBuyTokenWithUsdt(finalAmount,{gasLimit:200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }else {
        return false;
      }
    }else {
        let approve = await usdtContractDetailsWithSigner
        .approve(saleContractAddress,finalAmount,{gasLimit: 200000})
        .then((arg) => {
          return arg;	
        }).catch((error) => {
          return error;
        });
        if(approve.hash){
          return await saleContractDetailsWithSigner
          .sellOtherTokens(usdtContractAddress,finalAmount,{gasLimit:200000})
          .then((arg) => {
            return arg;	
          }).catch((error) => {
            console.log(error);
            return error;
          });
        }else {
          return false;
        }
      }
     
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const buyContractTokenBtn = async (fromAddress,amount,isPreSale,coinName) => {

  const decimals = 18;
  let finalAmount
  if (coinName === process.env.REACT_APP_USDT) {
    finalAmount = ethers.utils.parseUnits(amount, 6)
  }else {
    finalAmount = ethers.utils.parseUnits(amount, decimals)
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.log("finalAmount",finalAmount)

   
  if (window.ethereum) {
        try {
         
          if(isPreSale){
            if (coinName === process.env.REACT_APP_ETH) {
              return await buyTokenWithEth(finalAmount,isPreSale,signer)
            }else if (coinName === process.env.REACT_APP_DAI) {
              return await buyTokenWithDai(finalAmount,isPreSale,signer)
            }else if (coinName === process.env.REACT_APP_USDT) {
              return await buyTokenWithUsdt(finalAmount,isPreSale,signer)
            }
            
          }else {
            if (coinName === process.env.REACT_APP_ETH) {
              return await buyTokenWithEth(finalAmount,isPreSale,signer)
            }else if (coinName === process.env.REACT_APP_DAI) {
             return await buyTokenWithDai(finalAmount,isPreSale,signer)
            }else if (coinName === process.env.REACT_APP_USDT) {
              return await buyTokenWithUsdt(finalAmount,isPreSale,signer)
            }
          }
        } catch (err) {
          console.log(err);
          return false;
        }
  }
}; 

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
 
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Populate the Data and Click on Button to execute...",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "",
    };
  }
};

export const isCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return addressArray[0];
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const switchNetwork = async (chainId) => {
  
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(chainId)}],
      });
       
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const getPriceBySymbol = async (symbol, price) => {
  console.log("base price",price)
  if (symbol !== 'ETH' ) {
      return price;
  } else {
      symbol = symbol + 'BUSD';
      return await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`, {
          transformRequest: (data, headers) => {
              delete headers.common['X-Requested-With'];
              return data;
          }
      })
          .then(async (response) => {
              console.log("response", response.data.price)
              console.log("response", (price / parseFloat(response.data.price)).toFixed(10))
              return (price / parseFloat(response.data.price)).toFixed(10)
          })
          .catch((error) => {
              return 100.00
          });
  }

}
/* export const numberWithCommas = async (x) => {
  return await x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
} */
