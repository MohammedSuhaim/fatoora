import React, { useState } from "react";
import search from "../../../Assets/Images/search-md.svg";
import { Navbar, Nav, NavDropdown, FormControl, Button } from "react-bootstrap";
import ImageInputComponent from "../../Common/Imageinput";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./Createinvoice.css";
import DatePickerComponent from "../../Common/Date";
import dots from "../../../Assets/Images/dots-vertical.svg";
import Invoicepdf from "./Invoicepdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import down from "../../../Assets/Images/chevron-down.svg";
import plus from "../../../Assets/Images/green plus.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Createinvoice = (args) => {
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("simplified");
  const [selectedOption, setSelectedOption] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const initialValues = {
    client_id:"",
    invoice_type: "",
    date_time: "",
    reference_number:"",
    logo: "",
    notes: "",
    footer_text: "",
    invoice_detail: [
      {
        description: "",
        product_id: "",
        unit_price: "",
        quantity: "",
        discount_percent: "",
        vat_percent: "",

      }
    ]



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
    productName: Yup.string().required("Required"),
    quantity: Yup.number().required("Required").positive().integer(),
    unitPrice: Yup.number().required("Required").positive(),
    discount: Yup.number()
      .required("Required")
      .positive()
      .max(100, "Discount can't be more than 100%"),
    vat: Yup.number().required("Required").positive(),
  });

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    try {
      const total =
        (values.unitPrice - values.discount + values.vat) * values.quantity;
      const formattedDate = startDate ? startDate.toLocaleDateString() : "";
      setProducts([{ ...values, total, formattedDate }, ...products]);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvoiceTypeChange = (type, event) => {
    // setSelectedOption(event.target.value);
    setSelectedInvoiceType(type, event);
  };

  return (
    <div className="create-container">
      <div className="invoice-header pb-4">
        <h3>Create invoice</h3>
        <div className="">
          <button className="draft-btn">Save as draft</button>
          <button className="send-btn">Send invoice</button>
        </div>
      </div>
      <div className="pt-4">
        <div className="py-2">
          <h5 className="invoice-title">Invoice type</h5>
          <div className="d-flex" style={{ gap: "20px" }}>
            <div
              className={`form-check invoice-type-check ${
                selectedInvoiceType === "simplified" ? "active" : ""
              }`}
            >
              <input
                className="form-check-input custom-radio"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => handleInvoiceTypeChange("simplified")}
                checked={selectedInvoiceType === "simplified"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Simplified invoice
              </label>
            </div>
            <div
              className={`form-check invoice-type-check ${
                selectedInvoiceType === "normal" ? "active" : ""
              }`}
            >
              <input
                className="form-check-input custom-radio"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => handleInvoiceTypeChange("normal")}
                checked={selectedInvoiceType === "normal"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Normal invoice
              </label>
            </div>
            <div
              className={`form-check invoice-type-check ${
                selectedInvoiceType === "purchase" ? "active" : ""
              }`}
            >
              <input
                className="form-check-input custom-radio"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onChange={() => handleInvoiceTypeChange("purchase")}
                checked={selectedInvoiceType === "purchase"}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Purchase invoice
              </label>
            </div>
          </div>
        </div>
        <div className="py-4">
          <h6>Invoice Date</h6>
          <button
            className="custom-input w-25 "
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {startDate ? startDate.toLocaleDateString() : "Select Date"}
            <img src={down} alt="" />
          </button>
          {showCalendar && (
            <div className="date-picker-invoice">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>
      </div>
      {(selectedInvoiceType === "simplified" ||
        selectedInvoiceType === "normal") && (
        <div
          className="invoice-item-container p-4 my-4"
          style={{ border: "none" }}
        >
          <h4 className="pb-4">Seller details</h4>
          <span>
            <h6>Sellers name : </h6>
            <h5>toxic caffeine pvt</h5>
          </span>
          <span className="py-3">
            <h6>VAT no :</h6>
            <h5>3516351351</h5>
          </span>
          <span>
            <h6>Address : </h6>
            <h5>this is address</h5>
          </span>
        </div>
      )}
      {selectedInvoiceType === "normal" && (
        <div className="customer-details-container py-3">
          <div className="customer-details">
            <h4>Customer details</h4>
            <div className=" d-flex justify-content-between align-items-end py-2">
              <div className="col-9">
                <h6 className="pb-2 input-header">
                  Search customer by Name/Number/Phone
                </h6>
                <div inline style={{ flex: "0 0 65%" }}>
                  <div className="search-container">
                    <img src={search} alt="" />
                    <FormControl
                      type="search"
                      placeholder="Search anything"
                      className="mr-sm-2 search-box"
                    />
                  </div>
                  {/* <Button variant="outline-success">Search</Button> */}
                </div>
              </div>
              <div className="col d-flex justify-content-end ">
                <div>
                  <Button
                    className="draft-btn"
                    style={{
                      padding: "11px 32px",
                      gap: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={toggle}
                  >
                    {" "}
                    <img src={plus} alt="" />
                    Add New Customer
                  </Button>
                  <Modal
                    className="modal2"
                    style={{ background: "white" }}
                    isOpen={modal}
                    toggle={toggle}
                    {...args}
                  >
                    <ModalHeader className="" toggle={toggle}></ModalHeader>
                    <ModalBody>
                      <div className="">
                        <div className="">
                          <h3>Add new client</h3>
                          <h6>Please fill the form below</h6>
                        </div>
                        <div className="">
                          <div className="d-flex" style={{ gap: "20px" }}>
                            <div className={`form-check invoice-type-check ${
                                selectedInvoiceType === "business" ? "active" : ""
                              }`}>
                              <input
                                className="form-check-input custom-radio"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault4"
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
                                selectedInvoiceType === "individual" ? "active" : ""
                              }`}
                            >
                              <input
                                className="form-check-input custom-radio"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault5"
                              />
                              <label
                                className="form-check-label "
                                htmlFor="flexRadioDefault5"
                              >
                                Individual
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="popup-data">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            // onSubmit={handleSubmit}
                          >
                            {({ setFieldValue, values, isSubmitting }) => (
                              <Form>
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
                                        value=""
                                        label="Select category"
                                      />
                                      <option
                                        value="category1"
                                        label="Category 1"
                                      />
                                      <option
                                        value="category2"
                                        label="Category 2"
                                      />
                                      <option
                                        value="category3"
                                        label="Category 3"
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
                                                                          name="vatno"
                                                                          id="vatno"
                                                                          placeholder="Enter VAT Number"
                                                                          className="custom-input w-100"
                                                                        />
                                                                        <ErrorMessage
                                                                          name="vatno"
                                                                          component="div"
                                                                          className="error-message"
                                                                        />
                                                                      </div>
                                                                      <div className="col-6 p-3">
                                                                        <h6>CR. NO.</h6>
                                                                        <Field
                                                                          type="number"
                                                                          name="crno"
                                                                          id="crno"
                                                                          placeholder="Enter VAT Number"
                                                                          className="custom-input w-100"
                                                                        />
                                                                        <ErrorMessage
                                                                          name="crno"
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
                                                                      <button type="submit" className="send-btn w-100" style={{padding: '16px '}}>Save and add Clint</button>



                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          <div
            className="invoice-item-container p-4 mb-4"
            style={{ border: "none" }}
          >
            <h4 className="pb-4">Buyer info</h4>
            <span>
              <h6>Buyer name : </h6>
              <h5>toxic caffeine pvt</h5>
            </span>
            <span className="py-3">
              <h6>VAT no :</h6>
              <h5>3516351351</h5>
            </span>
            <span>
              <h6>Address : </h6>
              <h5>this is address</h5>
            </span>
          </div>
        </div>
      )}
      {selectedInvoiceType === "purchase" && (
        <div
          className="invoice-item-container p-4 my-4"
          style={{ border: "none" }}
        >
          <h4 className="pb-4">Supplier details</h4>
          <span>
            <h6>Supplier name : </h6>
            <h5>toxic caffeine pvt</h5>
          </span>
          <span className="py-3">
            <h6>VAT no :</h6>
            <h5>3516351351</h5>
          </span>
          <span className="pb-3">
            <h6>Address : </h6>
            <h5>this is address</h5>
          </span>
          <span>
            <h6>Business Category : </h6>
            <h5>Manufecture</h5>
          </span>
        </div>
      )}

      <div className="">
        {selectedInvoiceType === "purchase" && (
          <div className="invoice-item-header">
            <h4>Purchase details</h4>
            <h6>Enter the details of purchased items</h6>
          </div>
        )}
        {(selectedInvoiceType === "normal" ||
          selectedInvoiceType === "simplified") && (
          <div className="invoice-item-header">
            <h4>Invoice items</h4>
            <h6>Search product and services</h6>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="d-flex justify-content-between align-items-center py-3">
              <div className="d-flex  " style={{ gap: "20px" }}>
                <div className="invoice-item-input">
                  <label className="m-1">Product Name</label>
                  <Field
                    type="text"
                    name="productName"
                    placeholder="Enter product Name"
                  />
                  <ErrorMessage name="productName" component="div" />
                </div>
                <div className="invoice-item-input">
                  <label className="m-1">Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    placeholder="Enter QTY."
                  />
                  <ErrorMessage name="quantity" component="div" />
                </div>
                <div className="invoice-item-input">
                  <label className="m-1">Unit Price</label>
                  <Field
                    type="number"
                    name="unitPrice"
                    placeholder="Enter price"
                  />
                  <ErrorMessage name="unitPrice" component="div" />
                </div>
                <div className="invoice-item-input">
                  <label className="m-1">Discount</label>
                  <Field
                    type="number"
                    name="discount"
                    placeholder="Enter %"
                    max={100}
                    onInput={(e) => {
                      e.target.value = Math.max(
                        0,
                        Math.min(100, parseInt(e.target.value, 10))
                      )
                        .toString()
                        .slice(0, 3);
                    }}
                  />
                  <ErrorMessage name="discount" component="div" />
                </div>
                <div className="invoice-item-input">
                  <label className="m-1">VAT</label>
                  <Field
                    type="number"
                    name="vat"
                    placeholder="Enter %"
                    max={100}
                    onInput={(e) => {
                      e.target.value = Math.max(
                        0,
                        Math.min(100, parseInt(e.target.value, 10))
                      )
                        .toString()
                        .slice(0, 3);
                    }}
                  />
                  <ErrorMessage name="vat" component="div" />
                </div>
              </div>
              <button
                type="submit"
                className="draft-btn"
                disabled={isSubmitting}
              >
                Add Item
              </button>
            </Form>
          )}
        </Formik>
        <table className="w-100">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>VAT</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.unitPrice}</td>
                <td>{product.discount}</td>
                <td>{product.vat}</td>
                <td>{product.total}</td>
                <td>
                  <img src={dots} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="item-container my-5">
        <div className="">
          <h6>Items Total</h6>
          <h5>0.00</h5>
        </div>
        <div className="">
          <h6>Total VAT</h6>
          <h5>0.00</h5>
        </div>
        <div className="">
          <h6>Total</h6>
          <h5>0.00</h5>
        </div>
      </div>
      <div className="invoice-customization">
        <h4 className=" py-3">Invoice Customization</h4>
        <div className="d-flex w-100" style={{ gap: "24px" }}>
          <div className="invoice-customization-container">
            <h6>Personalised message</h6>
            <textarea className="w-100" placeholder="Enter your message" />
          </div>
          <div className="invoice-customization-container">
            <h6>Terms and conditions</h6>
            <textarea className="w-100" placeholder="Enter your message" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
