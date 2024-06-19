import React from "react";
import {   Formik} from "formik";
import * as Yup from "yup"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/action/register";
import User from "../../store/api/User"; 
import  showToast  from "../../helper/Api";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
  
  const navigate = useNavigate();

  return (
    <>
     <section className="section login-page background-radial-gradient overflow-hidden">
     <div className="Mcube-logo"><img   alt="" width={"100px"} src={require('../../assets/images/Blockspark_Logo.png')} /></div>
        <div className="container form-container  align-items-center mb-5  px-4 py-5 px-md-5">
            <div className="login-page-wrp">
              
              <div className="mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
    
                    <div  className="card bg-glass">
                    <h1 className="forgot-title"><span className="forgot-title-grdnt">Confirm Email</span></h1>
                    <div className="card-body px-4 px-md-5">
                      <Formik
                          initialValues={{
                            email: "",
                            submit: null
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
                          })}
                          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                              let data = values;
                              data = {
                                ...values
                              };
                                    
                              User.userPasswordReset(data).then((res) => {
                                showToast({ message: "A reset link has been sent to your email address", type: "success" });
                                navigate("/");
                              }).catch((e) => {
                                    console.log("error",e)   
                              })

                            } catch (err) {
                              console.error(err);
                            }
                          }} >
                          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form  noValidate onSubmit={handleSubmit} >

                              <div className="mb-3 mt-3" >
                                <label className="login-label mb-2">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className={`form-control  login-input  ${touched.email && errors.email ? "is-invalid" : ""}`}
                                  placeholder="Email"
                                  value={values.email}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />

                                {touched.email && errors.email && (
                                  <div className="invalid-feedback">{errors.email}</div>
                                )}
                              </div>

                              {errors.submit && (
                                <div className="mb-3" >
                                  <div className="invalid-feedback">{errors.submit}</div>
                                </div>
                              )}
                               <div className="d-flex justify-content-center">
                              <button disabled={isSubmitting} type="submit" className="btn login-button forgot-btn"> <span className="login-btn-txt">Submit</span> </button>   </div>                            
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

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
