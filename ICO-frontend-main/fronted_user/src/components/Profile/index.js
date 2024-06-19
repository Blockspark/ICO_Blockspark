import React, { useState, useEffect, useContext } from "react";
import {
  getCurrentWalletConnected,
} from "../../helper/interact"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ethers } from 'ethers';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import User from "../../store/api/User";
import  showToast  from "../../helper/Api";
import * as Actions from "../../store/action/user";
import {   Formik} from "formik";
import * as Yup from "yup"; 
import Emitter from '../../services/emitter';
const Profile = (props) => {
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [kycStatus, setKycStatus] = useState("");
  const [userData, setUserData] = useState("");
  const [activeTab, setActiveTab] = useState("personal_info");
  const [type, setType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
 
  
  //const { userDetail } = props.user;
  useEffect( () => {

    setShowLoader(true);
    async function setup() {
      
         setShowLoader(true);   
          await User.getUserDetail().then((res) => {
          if(res.data.statusCode === 200){
            let result = res.data.result;
            props.getUserFullName(result)
            Emitter.emit('setKycStatus', result.kyc_status);

            setFullName(result.full_name);
            setEmailId(result.email);
            setKycStatus(result.kyc_status);
            setUserData(res.data.result);
          }
          setShowLoader(false);
          }).catch((e) => {
              setShowLoader(false);
          })

        setShowLoader(true);        
        const { address } = await getCurrentWalletConnected();
        setWallet(address);
        setShowLoader(false);
    }
    setup();
  },[]);

  const setActiveTabClick  = (tab) => {
    setActiveTab(tab);
  }

  return (
    <>
        <section className="section profile">
           <div className="container">  
              <div className="profile-wrp px-md-3">
                    <h1 className="py-5 dashboard-title"><span className="dsbrd-title">My Profile</span></h1>
                        <div className="row ">
                            <div className="col-lg-6 profile-col">
                                <div className="profile-col-wrp">
                                    
                                    <ul className="nav nav-tabs  botm-line justify-content-center pt-3" role="tablist">
                                        <li className="nav-item">
                                          <button  
                                          onClick={() => setActiveTabClick("personal_info")}
                                          className={`nav-link chngepasword ${activeTab === 'personal_info' ? "active" : ""}`}
                                          data-bs-toggle="tab" href="#prsnlinfo">Personal Info</button>
                                        </li>
                                        <li className="nav-item">
                                          <button 
                                          onClick={() => setActiveTabClick("change_password")}
                                          className={`nav-link chngepasword ${activeTab === 'change_password' ? "active" : ""}`}
                                          data-bs-toggle="tab" href="#chngepawrd">Change Password</button>
                                        </li>
                                    </ul>
                                       
                                      <div className="tab-content">
                                        <div id="prsnlinfo" className={`container tab-pane ${activeTab === 'personal_info' ? "active" : ""}`}><br />
                                            <div className="px-md-4">
                                            <Formik
                                                  enableReinitialize={true}
                                                  initialValues={{
                                                      full_name:fullName,
                                                      email: emailId,
                                                      submit: null
                                                  }}
                                                  validationSchema={Yup.object().shape({
                                                      full_name: Yup.string().max(255).required('Full Name is required')
                                                      .matches(/^[aA-zZ0-9\s]+$/, "Only alphanumeric are allowed."),
                                                      email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                                                  })}
                                                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                      let data = values;
                                                      data = {
                                                          ...values
                                                      };
                                                      setShowLoader(true);
                                                      User.updatePersonalInfo(data).then((res) => {
                                                        showToast({ message: "your personal info has been updated successfully", type: "success" });
                                                        setShowLoader(false);
                                                      }).catch((e) => {
                                                        setShowLoader(false);
                                                          
                                                      })  

                                                  } catch (err) {
                                                    setShowLoader(false);
                                                      console.error(err);
                                                  }
                                                  }} >
                                                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                      <form  noValidate onSubmit={handleSubmit} >

                                                              <div className="mb-3 mt-2" >
                                                                <label className="profile-label">Full Name</label>
                                                                <input
                                                                  type="text"
                                                                  id="full_name"
                                                                  name="full_name"
                                                                  className={`form-control profile-inpt ${touched.full_name && errors.full_name ? "is-invalid" : ""}`}
                                                                  placeholder="Full Name"
                                                                  value={values.full_name}
                                                                  onBlur={handleBlur}
                                                                  onChange={handleChange}
                                                                />

                                                                {touched.full_name && errors.full_name && (
                                                                      <div className="invalid-feedback profile-msg-error">{errors.full_name}</div>
                                                                )}
                                                              </div>

                                                              <div className="mb-3 mt-2">
                                                                <label className="profile-label">Email Id</label>
                                                                <input
                                                                  type="email"
                                                                  id="eml"
                                                                  name="email"
                                                                  className={`form-control profile-inpt ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                                  placeholder="Email"
                                                                  value={values.email}
                                                                  onBlur={handleBlur}
                                                                  onChange={handleChange}
                                                                />

                                                                {touched.email && errors.email && (
                                                                      <div className="invalid-feedback profile-msg-error">{errors.email}</div>
                                                                )}
                                                              </div>
                                                              {errors.submit && (
                                                                      <div className="mb-3" >
                                                                          <div className="invalid-feedback profile-msg-error">{errors.submit}</div>
                                                                      </div>
                                                              )}
                                                          <div className="profile-btn ">
                                                            <button disabled={isSubmitting} type="submit" className="btn profile-btn-text"><span className="register-btn-txt">Save Changes</span> </button>
                                                          </div>
                                                      </form>
                                                  )}
                                              </Formik>                                              
                                            </div>
                                        </div>
                                        <div id="chngepawrd" className={`container tab-pane ${activeTab === 'change_password' ? "active" : ""}`}>
                                            <div className="px-sm-4">
                                              <br />
                                            <Formik
                                                  initialValues={{
                                                      currentPassword:'',
                                                      newPassword: '',
                                                      confirmPassword: '',
                                                      submit: null
                                                  }}
                                                  validationSchema={
                                                    Yup.object().shape({
                                                    currentPassword: Yup.string().max(255).required('Current password is required'),
                                                    newPassword: Yup.string().max(255).required('New Password is required')
                                                    .test('currentPassword-match', 'New Password cannot be same as your current password', function(value){
                                                      return this.parent.currentPassword !== value
                                                    }),
                                                  //  confirmPassword: Yup.string().max(255).required('Confirm Password is required'),
                                                    confirmPassword: Yup.string()
                                                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                                                  })}
                                                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                    
                                                      let data = values;
                                                      data = {
                                                          ...values
                                                      };
                                                      setShowLoader(true);   
                                                      User.updatePasswordInfo(data).then((res) => {
                                                          console.log("Sss",res)
                                                          showToast({ message: "your password has been changed successfully", type: "success" });
                                                          setShowLoader(false);   
                                                        
                                                        }).catch((e) => {
                                                          setShowLoader(false);
                                                        })

                                                  } catch (err) {
                                                      console.error(err);
                                                      setShowLoader(false);
                                                  }
                                                  }} >
                                                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                      <form  noValidate onSubmit={handleSubmit}>
                                                            <div className="mb-2">
                                                              <div style={{position:"relative"}}>
                                                              <label className="profile-label">Current Password</label>
                                                                  <input
                                                                        type={type}
                                                                      
                                                                        name="currentPassword"
                                                                        className={`form-control profile-inpt ${touched.currentPassword && errors.currentPassword ? "is-invalid" : ""}`}
                                                                        placeholder="Current Password"
                                                                        value={values.currentPassword}
                                                                        onBlur={handleBlur}
                                                                        max={50}
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                          handleChange(e);
                                                                      }}
                                                                    />
                                                                    <i
                                                                        className="change-password-eye"
                                                                        onClick={() => setType(type === "text" ? "password" : "text")} >
                                                                        {type === "password" ? (
                                                                          <AiFillEye size={20} />
                                                                        ) : (
                                                                          <AiFillEyeInvisible size={20} />
                                                                        )}
                                                                      </i>
                                                                      </div>
                                                                    {touched.currentPassword && errors.currentPassword && (
                                                                              <div className="invalid-feedback d-inline-flex profile-msg-error">{errors.currentPassword}</div>
                                                                    )}
                                                            </div>
                                                            <div className="mb-2">
                                                            <div style={{position:"relative"}}>
                                                              <label className="profile-label">New Password</label>
                                                                  <input
                                                                        type={newPasswordType}
                                                                      
                                                                        name="newPassword"
                                                                        className={`form-control profile-inpt ${touched.newPassword && errors.newPassword ? "is-invalid" : ""}`}
                                                                        placeholder="New Password"
                                                                        value={values.newPassword}
                                                                        onBlur={handleBlur}
                                                                        max={50}
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                          handleChange(e);
                                                                      }}
                                                                    />
                                                                    <i
                                                                        className="change-password-eye"
                                                                        onClick={() => setNewPasswordType(newPasswordType === "text" ? "password" : "text")} >
                                                                        {newPasswordType === "password" ? (
                                                                          <AiFillEye size={20} />
                                                                        ) : (
                                                                          <AiFillEyeInvisible size={20} />
                                                                        )}
                                                                      </i>
                                                                  </div>
                                                                    {touched.newPassword && errors.newPassword && (
                                                                              <div className="invalid-feedback d-inline-flex profile-msg-error">{errors.newPassword}</div>
                                                                    )}
                                                            </div>
                                                            <div className="mb-2">
                                                            <div style={{position:"relative"}}>
                                                              <label className="profile-label">Confirm Password</label>
                                                                  <input
                                                                        type={confirmPasswordType}
                                                                
                                                                        name="confirmPassword"
                                                                        className={`form-control profile-inpt ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`}
                                                                        placeholder="Confirm Password"
                                                                        value={values.confirmPassword}
                                                                        onBlur={handleBlur}
                                                                        max={50}
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                          handleChange(e);
                                                                      }}
                                                                      
                                                                      />
                                                                    <i
                                                                        className="change-password-eye"
                                                                        onClick={() => setConfirmPasswordType(confirmPasswordType === "text" ? "password" : "text")} >
                                                                        {confirmPasswordType === "password" ? (
                                                                          <AiFillEye size={20} />
                                                                        ) : (
                                                                          <AiFillEyeInvisible size={20} />
                                                                        )}
                                                                      </i>
                                                                    </div>
                                                                    {touched.confirmPassword && errors.confirmPassword && (
                                                                              <div className="invalid-feedback d-inline-flex profile-msg-error">{errors.confirmPassword}</div>
                                                                    )}
                                                                    
                                                            </div>
                                                              {errors.submit && (
                                                                      <div className="mb-3" >
                                                                          <div className="invalid-feedback">{errors.submit}</div>
                                                                      </div>
                                                              )} 
                                                            <div className="profile-btn ">
                                                              <button disabled={isSubmitting} type="submit" className="btn profile-btn-text"><span className="register-btn-txt">Save Changes</span> </button>
                                                            </div>
                                                      </form>
                                                  )}
                                            </Formik>
                                            </div>
                                        </div>
                                       </div>
                                </div>
                                </div>
                                <div className="col-lg-6 profile-col col-btm">
                                    <div className="profile-col-wrp profile-col-wrp-right">
                                        <div className="profile-wlt-address botm-line text-center pt-4">
                                           <h2 className="profile-right-title pb-1" >Wallet Address</h2>
                                        </div>
                                            <div className="mb-3 mt-2 text-center">
                                                <label htmlFor="name" className="profile-label">{walletAddress}</label>
                                            </div>
                                        </div>
                                        <div className="profile-col-wrp profile-col-wrp-bottom mt-4">
                                            <div className="profile-wlt-address botm-line text-center pt-4">
                                              <h2 className="profile-right-title" >KYC Status</h2>
                                            </div>
                                            <p className="kyc-status text-center pt-4">
                                                <img src={require('../../assets/images/fi_check-circle.svg').default}  className="me-2" alt="" />
                                                KYC verification is {kycStatus}
                                            </p>
                                        </div>
                                </div>
                            </div>
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
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
