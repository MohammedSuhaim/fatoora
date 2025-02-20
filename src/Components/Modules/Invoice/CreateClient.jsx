import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axiosInstance from "../../redux/Api/Index";
import * as Yup from "yup";
import down from "../../../Assets/Images/chevron-down.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";








const CreateClient = ({ isOpen, onClose }, args) => {
const [selectedOption, setSelectedOption] = useState("business");
const [clientTypeCode, setClientTypeCode] = useState("");


const initialValues = {
    first_name: "",
    last_name: "",
    email_id: "",
    country_code: "",
    mobile_number: "",
    company_registration_number: "",
    company_vat_number: "",
    category_id: "",
    client_type: "",
    address: "",
}

const validationSchema = Yup.object({
    company_registration_number: Yup.string().required("enter data"),
    company_vat_number: Yup.string().required("enter data"),
    mobile_number: Yup.string().required("enter data"),
    category_id: Yup.string().required("enter data"),
    // client_type: Yup.string().required("enter data"),
    address: Yup.string().required("enter data"),
    first_name: Yup.string().required("enter data"),
    last_name: Yup.string().required("enter data"),
    email_id: Yup.string().required("enter data"),
})

    const handleTypeChange = (type, event) => {
        let code;
        switch (type) {
          case "business":
            code = 1;
            break;
          case "individual":
            code = 2;
            break;
    
          default:
            code = 1;
        }
    
        setSelectedOption(type, event);
        setClientTypeCode(code);
      };


    const handlePhoneChange = (value, data, setFieldValue) => {
        const countryCode = `+${data.dialCode}`;
        const phoneNumber = value.slice(data.dialCode?.length) || null;
        setFieldValue("country_code", countryCode);
        setFieldValue("mobile_number", phoneNumber);
        console.log("mobile_number", phoneNumber);
        console.log("country_code", countryCode);
      };

      const handleclientsubmit = async (values) =>{ 

        try {
            const response = await axiosInstance.post("/customer_app/client/create", {
             ...values,
             client_type: clientTypeCode,
             
            });
            if(response.data.status === true){
                onClose();
            }



            console.log(response.data.values);
          } catch (error) {
            console.error(error);
          }
      }


    return(
        <div className="">
<Modal
                        className="modal2"
                        style={{ background: "white" }}
                        isOpen={isOpen}
                        onRequestClose={onClose}
                        {...args}
                      >
                        <ModalHeader className="" ></ModalHeader>
                        <ModalBody>
                          <div className="">
                            <div className="">
                              <h3>Add new client</h3>
                              <h6>Please fill the form below</h6>
                            </div>

                            <div className="popup-data">
                              <Formik
                                initialValues = {initialValues}
                                validationSchema = {validationSchema}
                                onSubmit={handleclientsubmit}
                              >
                                {({ setFieldValue, values, isSubmitting }) => (
                                  <Form>
                                    {" "}
                                    <div className="d-flex" style={{ gap: "20px" }}>
                                      <div
                                        className="d-flex"
                                        style={{ gap: "20px" }}
                                      >
                                        <div
                                          className={`form-check invoice-type-check ${
                                            values.selectedOption === "business"
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          <Field
                                            type="radio"
                                            name="invoiceType"
                                            value="business"
                                            className="form-check-input custom-radio"
                                            onChange={() => handleTypeChange("business")}
                                            checked={selectedOption === "business"}

                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault4"
                                          >
                                            Business
                                          </label>
                                        </div>
                                        <div
                                          className={`form-check invoice-type-check ${
                                            values.selectedOption === "individual"
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          <Field
                                            type="radio"
                                            name="invoiceType"
                                            value="individual"
                                            className="form-check-input custom-radio"
                                            onChange={() => handleTypeChange("individual")}
                                            checked={selectedOption === "individual"}

                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault5"
                                          >
                                            Individual
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12 p-3">
                                        <h6>Business Category</h6>
                                        <Field
                                          as="select"
                                          name="category_id"
                                          id="category_id"
                                          className="custom-input w-100"
                                        >
                                          <option
                                            value="1"
                                            label="Select category"
                                          />
                                          <option
                                            value="2"
                                            label="Category 1"
                                          />

                                        </Field>
                                        <ErrorMessage
                                          name="category_id"
                                          component="div"
                                          className="error-message"
                                        />
                                      </div>
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
                                          placeholder="Enter First Name"
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
                                          value={`${values.country_code || ""}${
                                            values.mobile_number || ""
                                          }`}
                                          onChange={(value, data) =>
                                            handlePhoneChange(
                                              value,
                                              data,
                                              setFieldValue
                                            )
                                          }
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
                                        <h6>VAT registration no.</h6>
                                        <Field
                                          type="number"
                                          name="company_vat_number"
                                          id="company_vat_number"
                                          placeholder="Enter VAT Number"
                                          className="custom-input w-100"
                                        />
                                        <ErrorMessage
                                          name="company_vat_number"
                                          component="div"
                                          className="error-message"
                                        />
                                      </div>
                                      <div className="col-6 p-3">
                                        <h6>CR. NO.</h6>
                                        <Field
                                          type="number"
                                          name="company_registration_number"
                                          id="company_registration_number"
                                          placeholder="Enter VAT Number"
                                          className="custom-input w-100"
                                        />
                                        <ErrorMessage
                                          name="company_registration_number"
                                          component="div"
                                          className="error-message"
                                        />
                                      </div>
                                      <div className="col-12 p-3">
                                        <h6>Address</h6>
                                        <Field
                                          type="address"
                                          name="address"
                                          id="address"
                                          placeholder="Enter VAT Number"
                                          className="custom-input w-100"
                                        />
                                        <ErrorMessage
                                          name="address"
                                          component="div"
                                          className="error-message"
                                        />
                                      </div>
                                      <button
                                        type="submit"
                                        className="send-btn w-100"
                                        style={{ padding: "16px " }}
                                        onSubmit={handleclientsubmit}
                                      >
                                        Save and add Client
                                      </button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>

        </div>
    )
}

export default CreateClient;