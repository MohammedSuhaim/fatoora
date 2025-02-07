import React, { useState } from "react";
import kyclogo from "../../Assets/Images/kycimg.svg";
import rightarrow from "../../Assets/Images/arrow-right.svg";
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
  border-radius: 50px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
  position: relative;
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

const Kycpage = ({ userData }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    company_name: '',
    company_registration_number: '',
    category_id: '',
    companyServices: '',
    address: '',
    profile_image: '',
  };

  const validationSchema = Yup.object({
    company_name: Yup.string().required('Company Name is required'),
    company_registration_number: Yup.string().required('Company Registration No. is required'),
    category_id: Yup.string().required('Company Category is required'),
    companyServices: Yup.string().required('Company Services are required'),
    address: Yup.string().required('Business Address is required')
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setImageSrc(reader.result);
        setFieldValue('profile_image', base64String);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image.');
    }
  };

  const handleSubmit = async (values) => {
    const singleData = {
      gender: 0,
      ...userData,
      ...values,
    };

    try {
      const response = await axiosInstance.post("/customer_app/users/register", singleData);
      if (response.data.status) {
        setSuccess("Account created successfully");
        console.log("formik values last last", values);
        navigate("/dashboard");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };

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
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <ImageInputContainer>
                {imageSrc ? (
                  <ImagePreview src={imageSrc} alt="Uploaded Image" />
                ) : (
                  <ImageLabel htmlFor="imageInput">
                    <img src={kyclogo} alt="" />
                  </ImageLabel>
                )}
                <ImageInput
                  type="file"
                  id="profile_image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
              </ImageInputContainer>
              <div className="row">
                <div className="col-6 p-3">
                  <h6>Company Name</h6>
                  <Field
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="Enter Company Name"
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="company_name" component="div" className="error-message" />
                </div>
                <div className="col-6 p-3">
                  <h6>Company Registration No.</h6>
                  <Field
                    type="text"
                    name="company_registration_number"
                    id="company_registration_number"
                    placeholder="Enter CR No."
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="company_registration_number" component="div" className="error-message" />
                </div>
                <div className="col-12 p-3">
                  <h6>Company Category</h6>
                  <Field
                    as="select"
                    name="category_id"
                    id="category_id"
                    className="custom-input w-100"
                  >
                    <option value="" label="Select category" />
                    <option value="category1" label="Category 1" />
                    <option value="category2" label="Category 2" />
                    <option value="category3" label="Category 3" />
                  </Field>
                  <ErrorMessage name="category_id" component="div" className="error-message" />
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
                    name="address"
                    id="address"
                    placeholder="Enter Address"
                    className="custom-input w-100"
                  />
                  <ErrorMessage name="address" component="div" className="error-message" />
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
