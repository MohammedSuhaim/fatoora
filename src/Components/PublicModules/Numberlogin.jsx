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
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
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



const Numberlogin = ({ className, ...props }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (value, data, setFieldValue) => {
    const countryCode = `+${data.dialCode}`;
    const phoneNumber = value.slice(data.dialCode?.length) || null;
    setFieldValue("country_code", countryCode);
    setFieldValue("mobile_number", phoneNumber);   
    console.log("mobile_number", phoneNumber);
    console.log("country_code", countryCode);
  };

 const initialValues = {
    mobile_number: "",
    country_code: "",
};

const validate = (values) => {
    const errors = {};
    if (!values.mobile_number) {
      errors.mobile_number = "Required";
    }
    return errors;

};
    

 

  return (
    <div className="">
      <div className="login-container">
        <div className="login-top-container">
          <div className="login-logo-container">
            <img src={welcomelogo} alt="Welcome Logo" />
            <h5>Welcome Back</h5>
            <h6>Start creating and managing your invoice faster & easier.</h6>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axiosInstance.post(
                  "/customer_app/users/send_otp",
                  {
                    mobile_number: values.mobile_number,
                    country_code: values.country_code,
                  }
                );
                if (response.data.status === true) {
                  localStorage.setItem("number", values.mobile_number);
                  localStorage.setItem("countrycode", values.country_code);
                  localStorage.setItem(
                    "is_registered",
                    response.data.response.is_register
                  );
                  console.log(response, "OTP sent successfully");
                  navigate("/numberotppage");
                } else {
                  setError("Failed to send OTP. Please try again.");
                }
              } catch (error) {
                console.error("Error sending OTP:", error);
                setError("Failed to send OTP. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="email-container my-3"> 
                <div className="col-12 p-0">
                  <label>Mobile no.</label>
                  <PhoneInput
                    id="mobile_number"
                    name="mobile_number"
                    placeholder="Enter phone no"
                    country="in"
                    value={`${values.country_code || ""}${
                      values.mobile_number || ""
                    }`}
                    onChange={(value, data) =>
                      handlePhoneChange(value, data, setFieldValue)
                    }
                    countryCodeEditable={true}
                  />
                  <ErrorMessage
                    name="mobile_number"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="number-login p-1">
                  <button
                    type="submit"
                    className="login-btn my-4 col-lg-12"
                    disabled={isSubmitting}
                  >
                    Login With Number
                  </button>
                </div>
                
              </Form>
            )}
          </Formik>
          <div className="number-login p-1">
            <Link to="/loginpage" className="">
              Login With email id
            </Link>
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

export default Numberlogin;
