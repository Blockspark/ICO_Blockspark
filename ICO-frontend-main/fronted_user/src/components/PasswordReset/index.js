import React, { useState ,useEffect} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {   Formik} from "formik";
import * as Yup from "yup"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/action/register";
import User from "../../store/api/User"; 
import  showToast  from "../../helper/Api";
import { useNavigate } from "react-router-dom";
import Emitter from "../../services/emitter";
const PasswordReset = () => {
 
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [showLoader, setShowLoader] = useState(false);
   
  const { pathname } = window.location;
  const paths = pathname.split("/").filter(entry => entry !== "");
  const email = paths[paths.length - 2];
  const token = paths[paths.length - 1];
   
  useEffect( () => {

    async function setup() {
      
          setShowLoader(true);
          let data = {
            token:token,
            email:email
          }

          await User.verifyUserRestToken(data).then((res) => {
          if(res.data.statusCode !== 200){
            navigate('/sign-in')
          }
          setShowLoader(false);
          }).catch((e) => {
              navigate('/sign-in')
              setShowLoader(false);
          })
        }
        setShowLoader(false);
    setup();
  },[]);

  return (
    <>
     <section className="section login-page background-radial-gradient overflow-hidden">
     <div className="Mcube-logo"><img   alt=""  src={require('../../assets/images/Blockspark_Logo.png').default} /></div>
        <div className="container form-container">
            <div className="login-page-wrp  align-items-center mb-5  px-4 py-5 px-md-5">
               
              <div className="mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                
                    <div  className="card bg-glass">
                    <h1 className="login-title"><span className="login-title-grdnt">Change Password</span></h1>
                    <div className="card-body px-4 px-md-5">
                      <Formik
                              enableReinitialize={true}
                              initialValues={{
                                  password:'',
                                  confirmPassword: '',
                                  token:token,
                                  email:email,
                                  submit: null
                              }}
                              validationSchema={
                                Yup.object().shape({
                                  password: Yup.string().max(255).required('Password is required'),
                                  token: Yup.string().max(255).required('Token is required'),
                                  email: Yup.string().max(255).required('Email is required'),
                                  confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                              })}
                              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                
                                  let data = values;
                                  data = {
                                      ...values
                                  };
                                  
                                User.verifyResetPassword(data).then((res) => {
                                      showToast({ message: "your password has been changed successfully", type: "success" });
                                      navigate('/sign-in');
                                    }).catch((e) => {
                                      
                                    }) 

                              } catch (err) {
                                  console.error(err);
                              }
                              }} >
                              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                  <form  noValidate onSubmit={handleSubmit}>
 
                                        <div className="mb-2" style={{position:"relative"}}>
                                          <label className="reset-label">Password</label>
                                              <input
                                                    type={passwordType}
                                                    name="password"
                                                    className={`form-control reset-input password-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                    placeholder="Password"
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                    max={50}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                  }}
                                                />
                                                <i
                                                    className="reset-eye"
                                                    onClick={() => setPasswordType(passwordType === "text" ? "password" : "text")} >
                                                    {passwordType === "password" ? (
                                                      <AiFillEye size={20} />
                                                    ) : (
                                                      <AiFillEyeInvisible size={20} />
                                                    )}
                                                  </i>
                              
                                                {touched.password && errors.password && (
                                                          <div className="invalid-feedback  reset-invalid-feedback">{errors.password}</div>
                                                )}
                                        </div>
                                        <div className="mb-2" style={{position:"relative"}}>
                                          <label className="reset-label">Confirm Password</label>
                                              <input
                                                    type={confirmPasswordType}
                                            
                                                    name="confirmPassword"
                                                    className={`form-control reset-input password-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`}
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
                                                    className="reset-eye"
                                                    onClick={() => setConfirmPasswordType(confirmPasswordType === "text" ? "password" : "text")} >
                                                    {confirmPasswordType === "password" ? (
                                                      <AiFillEye size={20} />
                                                    ) : (
                                                      <AiFillEyeInvisible size={20} />
                                                    )}
                                                  </i>
                              
                                                {touched.confirmPassword && errors.confirmPassword && (
                                                          <div className="invalid-feedback reset-invalid-feedback">{errors.confirmPassword}</div>
                                                )}
                                        </div>
                                          {errors.submit && (
                                                  <div className="mb-3" >
                                                      <div className="invalid-feedback  reset-invalid-feedback">{errors.submit}</div>
                                                  </div>
                                          )}
                                        <div className="d-flex justify-content-center">
                                          <button disabled={isSubmitting} type="submit" className="btn reset-button profile-btn-text"><span className="register-btn-txt">Submit</span> </button>
                                        </div>
                                  </form>
                              )}
                        </Formik>
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
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
