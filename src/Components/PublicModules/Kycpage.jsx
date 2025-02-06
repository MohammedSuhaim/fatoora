import React, { useState } from "react";
import kyclogo from "../../Assets/Images/kycimg.svg";
import rightarrow from "../../Assets/Images/arrow-right.svg"
import Footer from "../Modules/Footer/Footer";
import styled from 'styled-components';
import axiosInstance from "../redux/Api/Index";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 2px dashed #33C433;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  cursor: pointer;
  position: relative;
  // BACKGROUND: #F5FFF5;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ImageLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #33C433;
  font-size: 20px;
  font-weight: bold;
  pointer-events: none;
  text-align: center;
  background-size: cover;
  background-position: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: ${props => (props.src ? 'block' : 'none')};
`;

const Kycpage = ({userData}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    companyName: '',
    companyRegistrationNo: '',
    companyCategory: '',
    companyServices: '',
    businessAddress: ''
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    companyRegistrationNo: Yup.string().required('Company Registration No. is required'),
    companyCategory: Yup.string().required('Company Category is required'),
    companyServices: Yup.string().required('Company Services are required'),
    businessAddress: Yup.string().required('Business Address is required')
  });

  const handleSubmit = async (values) => {
    const singleData = {
      ...userData,
      ...values
    };


    const handleImageChange = (e, setFieldValue) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
          setFieldValue('image', reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image.');
      }
    };

    
    try {
      const response = await axiosInstance.post("/customer_app/users/register", singleData);
      console.log(response, "problem");

      if (response.data.status) {
        setSuccess("Account created successfully");
        console.log("Account created successfully");
        console.log("Response Data:", response.data);
        console.log("Request Data:", Formik.values);
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };


console.log("User Data:", userData);  // Debug information
  return (
    <div className="">
      <div className="container-fluid otp-container my-5">
        <div className="login-logo-container">
          <img src={kyclogo} alt="" />
          <h5>Secure Your Account with KYC</h5>
          <h6>Please fill the form below</h6>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        <ImageInputContainer>
          <ImageInput
            type="file"
            id="profile_image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageSrc ? (
            <ImagePreview src={imageSrc} alt="Uploaded Image" />
          ) : (
            <ImageLabel htmlFor="imageInput">
              <img src={kyclogo} alt="" />
            </ImageLabel>
          )}
        </ImageInputContainer>

       
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-6 p-3">
                  <h6>Company Name</h6>
                  <Field
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="companyName" component="div" className="error-message" />
                </div>
                <div className="col-6 p-3">
                  <h6>Company Registration No.</h6>
                  <Field
                    type="text"
                    name="companyRegistrationNo"
                    placeholder="Enter CR No."
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="companyRegistrationNo" component="div" className="error-message" />
                </div>
                <div className="col-12 p-3">
                  <h6>Company Category</h6>
                  <Field
                    as="select"
                    name="companyCategory"
                    className="custom-input w-100"
                  >
                    <option value="" label="Select category" />
                    <option value="category1" label="Category 1" />
                    <option value="category2" label="Category 2" />
                    <option value="category3" label="Category 3" />
                  </Field>
                  <ErrorMessage name="companyCategory" component="div" className="error-message" />
                </div>
                <div className="col-12 p-3">
                  <h6>Company Services</h6>
                  <Field
                    type="text"
                    name="companyServices"
                    placeholder="Enter Company Services"
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="companyServices" component="div" className="error-message" />
                </div>
                <div className="col-12 p-3">
                  <h6>Enter Business Address</h6>
                  <Field
                    type="text"
                    name="businessAddress"
                    placeholder="Enter Address"
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="businessAddress" component="div" className="error-message" />
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              <button className="login-btn my-4 col-lg-12" type="submit" disabled={isSubmitting}>
                <h6>Submit KYC</h6> <img src={rightarrow} alt="" />
              </button>
            </Form>
          )}
        </Formik>
        <a style={{ textDecoration: 'none', color: 'green', display: 'flex', justifyContent: 'center' }} className="py-3">
          <h6 style={{ cursor: 'pointer' }}>I will do it later</h6>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Kycpage;
