import React, { useState } from "react";
import "./Loginpage.css";
import welcomelogo from "../../Assets/Images/welcomelogo.svg";
import google from "../../Assets/Images/google.svg";
import facebook from "../../Assets/Images/facebook.svg";
import rightarrow from "../../Assets/Images/arrow-right.svg";
import Footer from "../Modules/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../redux/Api/Index";
import { useFormik } from "formik";

export const Socialmedia = ({ bgColor, bgColor1 }) => {
  return (
    <div className="socialmedia row" style={{ background: bgColor }}>
      <h6 className="col-12">Sign in with Social</h6>
      <button className="google col-6" style={{ background: bgColor1 }}>
        <img src={google} alt="" />
        <h5>Google</h5>
      </button>
      <button className="facebook col-6" style={{ background: bgColor1 }}>
        <img src={facebook} alt="" />
        <h5>Facebook</h5>
      </button>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Loginpage = ({ className, ...props }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
  
        const response = await axiosInstance.post(
          "/customer_app/users/email_send_otp",
          {
            email_id: values.email,
          }
        );

        if (response.data.status === true) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("is_registered", response.data.response.is_register); 
          console.log(response, "OTP sent successfully");
          // alert(`OTP sent to ${values.email}`);
          navigate("/otppage"); 
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        setError("Failed to send OTP. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="">
      <div className="login-container">
        <div className="login-top-container">
          <div className="login-logo-container">
            <img src={welcomelogo} alt="" />
            <h5>Welcome Back</h5>
            <h6>Start creating and managing your invoice faster & easier.</h6>
          </div>
          <form
            className="email-container my-3"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email">Email ID</label>
            <input
              className="custom-input"
              placeholder="Enter Email ID"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <button className="login-btn my-4 col-lg-12" type="submit">
              <h6>Login Account</h6> <img src={rightarrow} alt="" />
            </button>
          </form>
          <div className="number-login p-1">
            <a href="" className="">
              Login With Number
            </a>
          </div>
        </div>
        <div className="or-span">
          <span></span>
          <h6>OR</h6>
          <span></span>
        </div>
        <div className="">
          <Socialmedia />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loginpage;
