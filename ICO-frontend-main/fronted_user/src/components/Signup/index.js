import React, { useState} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {   Formik} from "formik";
import * as Yup from "yup"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/action/register";
import User from "../../store/api/User"; 
import  showToast  from "../../helper/Api";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
    return (
      <>
      <section className="section register-page background-radial-gradient overflow-hidden">
      <div className="Mcube-logo"><img width={"100px"} src={require('../../assets/images/Blockspark_Logo.png')}   alt="" /></div>
        <div className="container form-container">
            <div className="register-page-wrp  align-items-center mb-5  px-4 py-5 px-md-5">
              <div className="mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            
                    <div className="card bg-glass">
                    <h1 className="register-title"><span className="register-title-grdnt">Register</span></h1>
                    <div className="card-body px-4 px-md-5">
                      <Formik
                              initialValues={{
                                  full_name:'',
                                  email: '',
                                  password: '',
                                  submit: null
                              }}
                              validationSchema={Yup.object().shape({
                                  full_name: Yup.string().max(255).required('Full Name is required')
                                  .matches(/^[aA-zZ0-9\s]+$/, "Only alphanumeric are allowed."),
                                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                  password: Yup.string().max(255).required('Password is required')
                              })}
                              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                  let data = values;
                                  data = {
                                      ...values
                                  };
                                  
                                  User.register(data).then((res) => {
                                      console.log("Sss",res)
                                      showToast({ message: "your account has been registered successfully", type: "success" });
                                      navigate(`/`);
                                    }).catch((e) => {
                                      
                                    })

                              } catch (err) {
                                  console.error(err);
                              }
                              }} >
                              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                  <form  noValidate onSubmit={handleSubmit} >

                                          <div className="mb-3 mt-3" >
                                            <label className="register-label mb-2">Full Name</label>
                                            <input
                                              type="text"
                                              id="full_name"
                                              name="full_name"
                                              className={`form-control reginster-input register-control ${touched.full_name && errors.full_name ? "is-invalid" : ""}`}
                                              placeholder="Full Name"
                                              value={values.full_name}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                            />

                                            {touched.full_name && errors.full_name && (
                                                  <div className="invalid-feedback">{errors.full_name}</div>
                                            )}
                                          </div>

                                          <div className="mb-3 mt-3" >
                                            <label className="register-label mb-2">Email Id</label>
                                            <input
                                              type="email"
                                              id="email"
                                              name="email"
                                              className={`form-control reginster-input ${touched.email && errors.email ? "is-invalid" : ""}`}
                                              placeholder="Email"
                                              value={values.email}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                            />

                                            {touched.email && errors.email && (
                                                  <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                          </div>

                                          <div className="mb-2">
                                            <div style={{position:"relative"}}>
                                            <label className="register-label mb-2">Password</label>
                                            
                                              <input
                                                    type={type}
                                                    id="password"
                                                    name="password"
                                                    className={`form-control reginster-input password-control ${touched.password && errors.password ? "is-invalid" : ""}`}
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
                                                    className="register-eye"
                                                    onClick={() => setType(type === "text" ? "password" : "text")} >
                                                    {type === "password" ? (
                                                      <AiFillEye size={20} />
                                                    ) : (
                                                      <AiFillEyeInvisible size={20} />
                                                    )}
                                                  </i>
                                              </div>
                                                {touched.password && errors.password && (
                                                          <div className="invalid-feedback  d-inline-flex">{errors.password}</div>
                                                )}
                                        </div>
                                  
                                      {errors.submit && (
                                          <div className="mb-3" >
                                              <div className="invalid-feedback">{errors.submit}</div>
                                          </div>
                                      )}
                                        <div className="d-flex justify-content-center mt-5">
                                      <button disabled={isSubmitting} type="submit" className="btn register-button"><span className="register-btn-txt">Register</span> </button></div>
                                      <p className="register-link">Already have an accont? <a  href="/sign-in">Log In</a></p>
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
    register: state.Register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
