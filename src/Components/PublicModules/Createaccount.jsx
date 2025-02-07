import React, { useState } from "react";
import purplelogo from "../../Assets/Images/purple symbol.svg";
import ShowPasswordInput from "../Common/Showpassword";
import rightarrow from "../../Assets/Images/arrow-right.svg";
import { Socialmedia } from "./Loginpage";
import Footer from "../Modules/Footer/Footer";
import Show from "../../Assets/Images/eye-off.svg";
import Hide from "../../Assets/Images/eye.svg";
import axiosInstance from "../redux/Api/Index";
import Kycpage from "./Kycpage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from 'react-phone-input-2';

const Createaccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showKyc, setShowkyc] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_id: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    country_code: "",
  };

  const handlePhoneChange = (value, data, setFieldValue) => {
    const countryCode = `+${data.dialCode}`;
    const phoneNumber = value.slice(data.dialCode?.length) || null;
    setFieldValue("country_code", countryCode);
    setFieldValue("mobile_number", phoneNumber);
    console.log("mobile_number", phoneNumber);
    console.log("country_code", countryCode);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    mobile_number: Yup
      .string()
      .min(9, "Mobile number must be at least 9 digits")
      .max(10, "Mobile number must be at most 12 digits")
      .matches(/^\d+$/, "Mobile number must contain only digits")
      .required("Mobile number is required"),
    email_id: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address")
      .test("email-validation", "Email address is not valid", (value) => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    password: Yup.string()
      .trim()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: Yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("password"), null], "Confirm password is not matching with password"),
    referralCode: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const requestData = {
      ...values,
    };

    setUserData(requestData);
    console.log("formik values", values);
    console.log("Request Data:", requestData);
    setShowkyc(true);

    setSubmitting(false);
  };

  return (
    <div className="">
      {showKyc ? (
        <Kycpage userData={userData} />
      ) : (
        <div className="container-fluid otp-container my-5">
          <div className="login-logo-container">
            <img src={purplelogo} alt="" />
            <h5>Let's create an account</h5>
            <h6>Please fill the form below</h6>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur
          >
            {({ isSubmitting, setFieldValue, values, handleBlur }) => (
              <Form>
                <div className="row">
                  <div className="col-6 p-3">
                    <h6>First Name</h6>
                    <Field
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="Enter First Name"
                      className="custom-input w-100"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-6 p-3">
                    <h6>Last Name</h6>
                    <Field
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Enter Last Name"
                      className="custom-input w-100"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-6 p-3">
                    <h6>Mobile no.</h6>
                    <PhoneInput
                      className=""
                      id="mobile_number"
                      name="mobile_number"
                      placeholder="Enter phone no"
                      country="in"
                      value={`${values.country_code || ""}${values.mobile_number || ""}`}
                      onChange={(value, data) => handlePhoneChange(value, data, setFieldValue)}
                      countryCodeEditable={true}
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-6 p-3">
                    <h6>Email ID</h6>
                    <Field
                      type="email"
                      name="email_id"
                      id="email_id"
                      placeholder="Enter Email ID"
                      className="custom-input w-100"
                    />
                    <ErrorMessage
                      name="email_id"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-6 p-3">
                    <h6>Password</h6>
                    <div className="custom-input">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="password-input"
                      />
                      <button
                        type="button"
                        className="password-btn"
                        onClick={toggleShowPassword}
                      >
                        <img src={showPassword ? Hide : Show} alt="" />
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      id="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-6 p-3">
                    <h6>Confirm Password</h6>
                    <div className="custom-input">
                      <Field
                        type={showPassword1 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter your password"
                        className="password-input"
                      />
                      <button
                        type="button"
                        className="password-btn"
                        onClick={toggleShowPassword1}
                      >
                        <img src={showPassword1 ? Hide : Show} alt="" />
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="col-12 p-3">
                    <h6>Referral Code (optional)</h6>
                    <Field
                      type="text"
                      name="referralCode"
                      placeholder="Enter Referral Code"
                      className="custom-input w-100"
                    />
                    <ErrorMessage
                      name="referralCode"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <button
                  className="login-btn my-4 col-lg-12"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <h6>Create Account</h6> <img src={rightarrow} alt="" />
                </button>
              </Form>
            )}
          </Formik>
          <div className="or-span">
            <span></span>
            <h6>OR</h6>
            <span></span>
          </div>
          <Socialmedia />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Createaccount;
