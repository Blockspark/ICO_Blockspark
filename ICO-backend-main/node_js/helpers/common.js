const nodemailer = require("nodemailer");
const axios = require("axios");
const ethers = require('ethers');
const adminServices = require("../services/admin");
const saleContractJson = require("../config/mcube-sale.json");
const senderAddress = "noreply@metaflixworld.io";
exports.smtpMail = async () => {
	const smtpUsername = process.env.SMTP_USERNAME;
	const smtpPassword = process.env.SMTP_PASSWORD;
	const smtpEndpoint = process.env.SMTP_ENDPOINT;
	const smtpPort = process.env.SMTP_PORT;
  // Create the SMTP transport.
  return await nodemailer.createTransport({
    host: smtpEndpoint,
    port: smtpPort,
  //  secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
  });
}

exports.send = ({ response, statusCode, message, result, error }) => {
	let resultObj = {};
	if (message)
		resultObj.message = message;
	if (result)
		resultObj.result = result;
	if (error)
		resultObj.error = error;
		resultObj.statusCode = statusCode;
		resultObj.message = message;
	return response.status(statusCode).send(resultObj);
};

exports.resetPasswordEmail  = async  (name,link) =>{
 
	let html = `<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	</head>
	<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
	   <tbody>
		  <tr>
			 <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
				<table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
				   <tbody>
					  <tr>
						 <td role="module-content">
							<p>MetaFlixworld</p>
						 </td>
					  </tr>
				   </tbody>
				</table>
				<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="5613cdc8-6ba1-40e0-addd-505404f43853" data-mc-module-version="2019-10-22">
				   <tbody>
					  <tr>
						 <td style="padding:1px 0px 0px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
							<div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;<span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-family: arial, helvetica, sans-serif;; font-size: 24px"><strong>Hello ${name},</strong></span><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;"><br>
								  There was a request to change your password.</span>
							   </div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							   <div></div>
							</div>
						 </td>
					  </tr>
				   </tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="b20cc6d6-9f24-4679-a156-bd9c80f22c11">
				   <tbody>
					  <tr>
						 <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
							<table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
							   <tbody>
								  <tr>
									 <td align="center" bgcolor="#39997d" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit; margin             -bottom: 20px;
										 display: inline-block;">
										<a href="${link}" style="background-color:#39997d; border:1px solid #39997d; border-color:#39997d; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:18px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; width:288px; font-family: arial, helvetica, sans-serif;; " target="_blank">Reset Password</a>
									 </td>
								  </tr>
							   </tbody>
							</table>
						 </td>
					  </tr>
				   </tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:10px 0px 0px 0px;" bgcolor="#FFFFFF" data-distribution="1,1">
				   <tbody>
					  <tr role="module-content">
						 <td height="100%" valign="top">
							<table width="290" style="width:290px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
							   <tbody>
								  <tr>
									 <td style="padding:0px;margin:0px;border-spacing:0;">
										<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="spENEcVraaFoLDG2TGLJCy" data-mc-module-version="2019-10-22">
										   <tbody>
											  <tr>
												 <td style="padding:18px 0px 1px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
													<div>
													   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><span style="">If you did not make this request, just ignore this email. Otherwise, please click the above button to change your password.&nbsp;</span></div>
													   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><br></div>
													   <div style="font-family: arial, helvetica, sans-serif;; padding-bottom: 20px; display: inline-block;">Thanks,&nbsp;</span><br />MetaFlixworld</div>
													   <div></div>
													</div>
												 </td>
											  </tr>
										   </tbody>
										</table>	
									 </td>
								  </tr>
							   </tbody>
							</table>   
						 </td>
					  </tr>
				   </tbody>
				</table>   
			 </td>
		  </tr>
	   </tbody>
	</table>
	 </body>
	</html>`;
 
	return html;

}

const sendLowBalanceNotificationHtml = async (balance) => {
	let html = `<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	</head>
	<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
	   <tbody>
		  <tr>
			 <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
				<table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
				   <tbody>
					  <tr>
						 <td role="module-content">
							<p>MetaFlixworld</p>
						 </td>
					  </tr>
				   </tbody>
				</table>
				<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="5613cdc8-6ba1-40e0-addd-505404f43853" data-mc-module-version="2019-10-22">
				   <tbody>
					  <tr>
						 <td style="padding:1px 0px 0px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
							<div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;<span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-family: arial, helvetica, sans-serif;; font-size: 24px"><strong>Hello Admin,</strong></span><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;"><br>
								  We hope this email finds you well. We are reaching out to you with an important notification regarding your cryptocurrency account.</span>
							   </div>
							      <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;"><br>
								  Our monitoring system has detected that our crypto balance has fallen below a critical threshold. This may impact our ability to cover transaction fees, participate in investment opportunities, and maintain financial stability.</span>
							   </div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><span style="overflow-wrap: break-word; margin-bottom: 12pt; line-height: 18pt; font-size: 12pt; font-family: arial, helvetica, sans-serif;"><br>
							   	Current Crypto Balance: <b>${balance}<b>
								  </span>
							   </div>
							   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							   <div></div>
							</div>
						 </td>
					  </tr>
				   </tbody>
				</table>
			 
				<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:10px 0px 0px 0px;" bgcolor="#FFFFFF" data-distribution="1,1">
				   <tbody>
					  <tr role="module-content">
						 <td height="100%" valign="top">
							<table width="290" style="width:290px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
							   <tbody>
								  <tr>
									 <td style="padding:0px;margin:0px;border-spacing:0;">
										<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="spENEcVraaFoLDG2TGLJCy" data-mc-module-version="2019-10-22">
										   <tbody>
											  <tr>
												 <td style="padding:18px 0px 1px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
													<div>
													   
													   <div style="font-family: arial, helvetica, sans-serif;; text-align: inherit"><br></div>
													   <div style="font-family: arial, helvetica, sans-serif;; padding-bottom: 20px; display: inline-block;">Thanks,&nbsp;</span><br />MetaFlixworld</div>
													   <div></div>
													</div>
												 </td>
											  </tr>
										   </tbody>
										</table>	
									 </td>
								  </tr>
							   </tbody>
							</table>   
						 </td>
					  </tr>
				   </tbody>
				</table>   
			 </td>
		  </tr>
	   </tbody>
	</table>
	 </body>
	</html>`;
	return html;
}
exports.UpdateCoinPrice = async (price) => {
    
    // RPC loaded from env file previously
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const saleContractAddress = process.env.SALE_CONTRACT_ADDRESS;
    const privateKey = process.env.WALLET_ID;
    const signer = new ethers.Wallet(privateKey,provider);
    const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer); 
    const decimals = 18;
    let finalAmount = ethers.utils.parseUnits(price, decimals);
    finalAmount = finalAmount.toString();
    console.log("finalAmount",finalAmount)
/*     await saleContractDetailsWithSigner.setPriceETH(finalAmount)
    .then((arg) => {
        console.log("setPriceETH arg",arg)
        return arg;	
    }).catch((error) => {
        console.log(error);
        return error;
    });   */ 
}

const distinct = async (value,index,self) => {
	return self.indexOf(value) === index 
}
exports.getEthBalance =  async (price) => {
	const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const privateKey = process.env.WALLET_ID;
    const signer = new ethers.Wallet(privateKey,provider);
	 
	const ethBalance = await provider.getBalance(signer.address).then((balance) => {
		// convert a currency unit from wei to ether
		const balanceInEth = ethers.utils.formatEther(balance)
		return balanceInEth;
	}) 
	
	const base_price = 10
	let coin_price = (base_price / parseFloat(price)).toFixed(10)
	console.log("coin_price",coin_price)
 	if(ethBalance<coin_price){
		let htmlText = await sendLowBalanceNotificationHtml(`${ethBalance} ETH`)
		 

		// Specify the fields in the email.
		let mailOptions = {
			from: senderAddress,
			to: "mcubebiz@gmail.com",
			subject: "Low Crypto Balance Alert: Immediate Action Required",
			text: htmlText,
			html:htmlText
		  };
		
		  // Send the email.
		  let transporter = await this.smtpMail();
		  await transporter.sendMail(mailOptions)
	}

}
exports.batchWhiteListUser =  async () => {
	const result = await adminServices.getDistinctWhitelistUsers();
	const addressArray = result.data;
	 
	//const addressArray = result.data.filter(distinct);
	console.log("addressArray",addressArray.length)
	if(addressArray.length > 0){
		const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const saleContractAddress = process.env.SALE_CONTRACT_ADDRESS;
    const privateKey = process.env.WALLET_ID;
    const signer = new ethers.Wallet(privateKey,provider);
    const saleContractDetailsWithSigner = new ethers.Contract(saleContractAddress, saleContractJson, signer); 
	
	const response = await saleContractDetailsWithSigner.batchWhitelist(addressArray)
    .then((arg) => {
        console.log("batchWhitelist arg",arg)
        return arg;	
    }).catch((error) => {
        console.log(error);
        return false;
    });  
	const receipt = await response.wait()
	.then(async (arg) => {
	 
		if(arg.status === 1){
			await adminServices.verifyMultipleUser({address:addressArray})
		}
	  return arg;
	}).catch((error) => {
	  return false;
	}); 
	}
	
}

exports.getEthPrice =  async () => {
	let symbol = "ETH" + 'BUSD';
	let base_price = "0.0001";

	let  api_coin_price =  await axios.get(`https://api.coinbase.com/v2/prices/eth-usd/spot`)
		.then(async (response) => {
			console.log("response", response.data.data.amount)
		//	console.log("response", (price / parseFloat(response.data.price)).toFixed(10))
			return response.data.data.amount
			//return (price / parseFloat(response.data.price)).toFixed(10)
		})
		.catch((error) => {
			console.log("error",error)
			return 0.0001
		});
	let coin_price = (base_price / parseFloat(api_coin_price)).toFixed(10)
	let body = {
		coin:"ETH",
		base_price:base_price,
		coin_price:coin_price,
		api_coin_price:api_coin_price
	}
	console.log("body",body)
 	const result = await adminServices.setCoinPrice(body);
	 console.log("result",result)
	 await this.UpdateCoinPrice(coin_price);
	 await this.getEthBalance(api_coin_price);
} 

exports.oldgetEthPrice =  async () => {
	let symbol = "ETH" + 'BUSD';
	let base_price = "0.0001";

	let  api_coin_price =  await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`, {
		transformRequest: (data, headers) => {
			delete headers.common['X-Requested-With'];
			return data;
		}
	})
		.then(async (response) => {
			console.log("response", response.data.price)
		//	console.log("response", (price / parseFloat(response.data.price)).toFixed(10))
			return response.data.price
			//return (price / parseFloat(response.data.price)).toFixed(10)
		})
		.catch((error) => {
			return 0.0001
		});
	let coin_price = (base_price / parseFloat(api_coin_price)).toFixed(10)
	let body = {
		coin:"ETH",
		base_price:base_price,
		coin_price:coin_price,
		api_coin_price:api_coin_price
	}
	const result = await adminServices.setCoinPrice(body);
	console.log("result",result)
	await this.UpdateCoinPrice(coin_price);
	
} 