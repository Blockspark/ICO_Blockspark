import React, { useState } from "react";
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
const Login = () => {

  const [type,setType] = useState("password");
  const navigate = useNavigate();

  return (
    <>
    <section className="section login-page background-radial-gradient overflow-hidden">
    <div className="Mcube-logo"><img  alt=""  width={"60px"} src={require('../../assets/images/Blockspark_Logo.png')} /><h4 style={{ color: 'white'}}>Blockspark</h4></div>
  <div className="container form-container">
      <div className="login-page-wrp align-items-center mb-5  px-4 py-5 px-md-5">
          <div className="mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              <div  className="card bg-glass">
                <h1 className="login-title"><span className="login-title-grdnt"> log in</span></h1>
                <div className="card-body px-4 px-md-5">
                <Formik
      initialValues={{
        email: "",
        password: "",
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        password: Yup.string().max(255).required("Password is required")
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          let data = values;
          data = {
            ...values
          };
                
          User.login(data).then((res) => {
            
            localStorage.setItem("token", res.data.result.token);
            localStorage.setItem("role", res.data.result.role);
            Emitter.emit("setToken", res.data.result.token);
            Emitter.emit("setUserData", res.data.result);
            Emitter.emit("setKycStatus", res.data.result.kyc_status);
                    
            showToast({ message: "Login successfully", type: "success" });
            navigate("/");
            console.log("res",res.data.result)
          }).catch((e) => {
                 console.log("error",e)   
          })

        } catch (err) {
          console.error(err);
        }
      }} >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form  noValidate onSubmit={handleSubmit} >

          <div className="mt-3" >
            <label className="login-label mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control login-input  ${touched.email && errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            {touched.email && errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-2 mt-3" >
          <div style={{position:"relative"}}>
            <label className="login-label mb-2">Password</label>
              <input
                type={type}
                id="password"
                name="password"
                className={`form-control login-input password-control ${touched.password && errors.password ? "is-invalid" : ""}`}
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
                  className="login-eye"
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

          <div className="login-link-forgot mb-4"><a href="/password/reset">forgot password ?</a></div>    
          {errors.submit && (
            <div className="mb-3" >
              <div className="invalid-feedback">{errors.submit}</div>
            </div>
          )}
           <div className="d-flex justify-content-center">
          <button disabled={isSubmitting} type="submit" className="btn login-button"> <span className="login-btn-txt">Log In</span> </button></div>
          <p className="register-link">Don’t have an account? <a  href="/sign-up">Register</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

