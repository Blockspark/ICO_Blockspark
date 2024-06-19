import { ethers } from 'ethers';
import showToast from './Api';
const saleContractJson  = require('../contracts/sale.json') ;
const tokenContractJson = require('../contracts/token.json') ;
const { ethereum } = window; 

const providerUrl = process.env.REACT_APP_PROVIDER_URL;
const saleContractAddress = process.env.REACT_APP_SALE_CONTRACT_ADDRESS; //Sale
const tokenContractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS; //token 

export const jsonProvider = new ethers.providers.JsonRpcProvider(providerUrl);
export const jsonSigner = jsonProvider.getSigner();
export const tokenContractDetails = new ethers.Contract(tokenContractAddress, tokenContractJson, jsonProvider);
export const saleContractDetails = new ethers.Contract(saleContractAddress, saleContractJson, jsonProvider);

export const loadContractSymbol = async () => {
    let  symbolDetail = await tokenContractDetails.symbol();
    return symbolDetail;
};

export const loadContractTotalSupply = async () => {
    //let  totalSupplyvalue = ethers.BigNumber.from(await tokenContractDetails.totalSupply()).toString();

	let totalSupplyvalue = ethers.BigNumber.from(await tokenContractDetails.totalSupply()).div(ethers.BigNumber.from(10).pow(18).toString()).toString();	 
  return totalSupplyvalue;
};

export const loadContractTotalSale = async () => {
    let  totalSaleValue = ethers.BigNumber.from(await saleContractDetails.totalSold()).toString();
    return totalSaleValue;
};

export const getPrice = async () => {
    let  priceValue = ethers.BigNumber.from(await saleContractDetails.getPrice()).toString(); 
    return ethers.utils.formatUnits(priceValue,18);
};

export const getOwner = async () => {
  let  res = await saleContractDetails.owner(); 
  return res;
};

export const verifyAdmin = async (address) => {
  let  data = await saleContractDetails.verifyAdmin(address,{gasLimit: 2122956})
    .then((arg) => {
      return arg;	
    }).catch((error) => {
      console.log(error);
      return error;
    });
    return data;
};


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
 
    showToast({ message: "You must install Metamask, a virtual Ethereum wallet, in your browser.", type: "error" });
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
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
    console.log("error",error);
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
			console.log(error);
			return error;
		});     
	} catch (error) {
    console.log(error);
		return false;
	}

}



/* export const buyContractTokenBtn = async (fromAddress,amount) => {

	const decimals = 18;
	const finalAmount = ethers.utils.parseUnits(amount, decimals)

	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner(); 
	const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer);
	const daiContractDetailsWithSigner = new ethers.Contract(daiContractAddress, daiContractJson, signer);

	 
	if (window.ethereum) {

		try {

			let approve = await daiContractDetailsWithSigner
			 .approve(saleContractAddress,finalAmount,{gasLimit: 140256})
			 .then((arg) => {
				 console.log("arg",arg)
				 return arg;	
			 }).catch((error) => {
				 console.log(error);
				 return error;
			 }); 
	 
			 if(approve.hash){
				try {
					return await saleContractDetailsWithSigner
					 .buyToken(finalAmount,{gasLimit:140256})
					 .then((arg) => {
						 return arg;	
					 }).catch((error) => {
						 console.log(error);
						 return error;
					 });
			 
				 } catch (err) {
					 console.log(err);
					 return false;
				 }
			 }else {
				 return false;
			 }

			  

		 } catch (err) {
			 console.log(err);
			 return false;
		 } 

	 
	}
    
   
}; */

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
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
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
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

export const numberWithCommas = async (x) => {
    return await x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}