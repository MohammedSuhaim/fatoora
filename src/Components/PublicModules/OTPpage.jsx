import React, { useState, useRef, useEffect } from 'react';
import otplogo from "../../Assets/Images/otplogo.svg";
import "./OTPpage.css";
import Footer from '../Modules/Footer/Footer';
import axiosInstance from "../redux/Api/Index";
import { useNavigate, useHistory } from  "react-router-dom";


const Otppage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputs = useRef([]);
   const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email ID and registration status from localStorage
    const storedEmail = localStorage.getItem("email");
    const isRegistered = localStorage.getItem("is_registered");
    setEmail(storedEmail);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    }
    e.target.value = value.slice(-1);
  };

  const handleSubmit = async () => {
    const otpValue = parseInt(otp.join(""), 10);
    try {
      const response = await axiosInstance.post("/customer_app/users/email_verify_otp", {
        email_id: email,
        otp: otpValue
      });

      console.log(response, "OTP verification response");
    //   alert("OTP verified successfully!");
      const isRegistered = localStorage.getItem("is_registered");
      
      if (response.data.status) {
        setSuccess("otp verified successfull");
        console.log("otp login successfull");
        navigate("/dashboard"); 
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      console.log(otpValue, "OTP value");
      console.error("API Error:", error.response ? error.response.data : error.message); 
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="container-fluid otp-container my-5">
        <img src={otplogo} height={'106px'} alt="" />
        <div className="verify-container">
          <h5>Verify OTP</h5>
          <h6>We have sent one time password to your email id <span>{email}</span></h6>
        </div>
        <div className="otp-input my-2">
          <h6>Enter OTP</h6>
          <div className="row m-0 input-container">
            {[...Array(6)].map((_, index) => (
              <input
                className='input-box col'
                key={index}
                type="number"
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                value={otp[index]}
              />
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button className='verify-btn my-4' onClick={handleSubmit}> 
            <h6>Verify OTP</h6>
          </button>
        </div>
        <h6>Didn't Receive?<a href="" style={{color: '#3BCF3B', textDecoration: 'none'}}> Resend OTP</a></h6>
      </div>
      <Footer/>
    </div>
  );
};

export default Otppage;
