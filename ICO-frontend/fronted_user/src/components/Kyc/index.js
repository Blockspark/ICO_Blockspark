import React, { useState, useEffect } from "react";
import {

  getCurrentWalletConnected,
} from "../../helper/interact"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/action/register";
import User from "../../store/api/User"; 
import { useNavigate } from 'react-router-dom';
import {Loader} from "../Loader"
import { sha256 } from 'js-sha256';


const Kyc = () => {
	 
  	 
  	const [walletAddress, setWallet] = useState("");
  	 
  	const [showLoader, setShowLoader] = useState(false);
  	const [userEmail, setUserEmail] = useState("");
  	const [userId, setUserId] = useState("");
  	const navigate = useNavigate();

	let payload = {
		//your unique request reference
		//"reference"					 : `SP_REQUEST_${userId}`,
		"reference"					 : `SP_REQUEST_${userId}_${Math.random()+new Date().getTime()}`,
		//URL where you will receive the webhooks from Shufti Pro
		"callback_url"				 : process.env.REACT_APP_KYC_CALLBACK_URL,
		"redirect_url" : process.env.REACT_APP_KYC_REDIRECT_URL,
		//end-user email
		"email"							 : userEmail,
		//end-user country
		"country"						 : "",
		//what kind of proofs will be provided to Shufti Pro for verification?
		"verification_mode"		 : "any",
		//allow end-user to upload verification proofs if the webcam is not accessible
		"allow_offline"				 : "1",
		//allow end user to upload real-time or already	catured proofs
		"allow_online" : "1",
		//privacy policy screen will be shown to end-user
		"show_privacy_policy" : "1",
		//verification results screen will be shown to end-user
		"show_results"				 : "1",
		//consent screen will be shown to end-user
		"show_consent"			 : "0",
		//User can send Feedback
		"show_feedback_form"			 : "0",
	}
	//document onsite verification with OCR
  	payload['document'] = {
		'name'							: "",
		'fetch_enhanced_data '			: "1",
		'supported_types'		: ['id_card','passport','driving_license']
	}

	//var token = btoa("C8KQWNv38waGezRQ8DQ0eS1ZuEivuGAnTxB92SByXZR44GbpX21650473209:$2y$10$GGUJQrxMaw9hxteeV6fH2uadIJbCXvfTbWIzyhuM8ipZXg4NOPT6y"); //BASIC AUTH TOKEN
	var token = btoa(`${process.env.REACT_APP_KYC_CLIENT_ID}:${process.env.REACT_APP_KYC_CLIENT_SECRET_KEY}`); //BASIC AUTH TOKEN
	console.log("token",token)
	var responsesignature = null;

	const validatesignature = async (data,signature,SK) => {
	data = JSON.stringify(data);
	data = data.replace(/\//g,"\\/")
	data = `${data}${SK}`;

	sha256(data);
	var hash = sha256.create();
	hash.update(data);

	if(hash.hex() == signature){
		return true;
	}else{
		return false;
	}
	}

	const getIframUrl = async (email,id) => {
		payload.email = email;
		payload.reference = `SP_REQUEST_${id}_${Math.random()+new Date().getTime()}`
		fetch('https://api.shuftipro.com/',{
				method : 'post',
				headers : {
						'Accept'				: 'application/json',
						'Content-Type'	: 'application/json',
						'Authorization'	: 'Basic ' +token
				},
				body: JSON.stringify(payload)
			})
			.then(function(response) {
					responsesignature = response.headers.get('Signature');
					return response.json();
			}).then(async (data) => {
					if(await validatesignature(data,responsesignature,process.env.REACT_APP_KYC_CLIENT_SECRET_KEY)) {
						window.location.href = data.verification_url;
						console.log(data.verification_url)
						/* if(data.email == userEmail){
						console.log('signature validated',data)
						console.log("ss",data.verification_url)
						setIframUrl(data.verification_url);
						} */
					}else{
						navigate('/')
						console.log('signature not validated',data)
					}
		});
	}

	useEffect( () => {
		async function setup() {
			setShowLoader(true);
			const { address } = await getCurrentWalletConnected();
			setWallet(address);
			 
			await User.getUserDetail().then(async (res) => {
			
			if(res.data.statusCode == 200){
			  let result = res.data.result;
			  console.log("result",result)
			  if(result && result.kyc_status != 'approved'){
				setUserEmail(result.email);
				setUserId(result.id);
				await getIframUrl(result.email,result.id)
			  }else {
				navigate("/");
			  }
			}
			setShowLoader(false);
		  }).catch((e) => {
			setShowLoader(false);
		  }) 

			setShowLoader(false);

		}
		setup();
	},[]);

  
    return (
      <>
	  {showLoader && <Loader />}
        <div className="auth-wrapper">
          <div className="auth-inner" style={{width :"100%"}}>
           
          </div>
        </div>
      </>
    )
}


const mapStateToProps = (state) => {
  return {
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kyc);
