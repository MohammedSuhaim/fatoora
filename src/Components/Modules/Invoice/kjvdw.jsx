import React, { useState, useEffect, useRef } from "react";
import search from "../../../Assets/Images/search-md.svg";
import { Navbar, Nav, NavDropdown, FormControl, Button } from "react-bootstrap";
import ImageInputComponent from "../../Common/Imageinput";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./Createinvoice.css";
import DatePickerComponent from "../../Common/Date";
import dots from "../../../Assets/Images/dots-vertical.svg";
import Invoicepdf from "./Invoicepdf";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import down from "../../../Assets/Images/chevron-down.svg";
import plus from "../../../Assets/Images/green plus.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axiosInstance from "../../redux/Api/Index";
import TimePickerComponent from "../../Common/Time";
import SimplifiedInvoice from "./SimpliifiedInvoice";
import NormalInvoice from "./Normalinvoice";
import PurchaseInvoice from "./PurchaseInvoice";

const Createinvoice = (args) => {
  const [phone, setPhone] = useState("");

  const [products, setProducts] = useState([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("simplified");
  const [selectedOption, setSelectedOption] = useState("business");
  const [modal, setModal] = useState(false);
  const [invoiveDetails, setInvoiceDetails] = useState([]);
  const [totals, setTotals] = useState({
    itemsTotal: 0,
    vatTotal: 0,
    grandTotal: 0,
  });

  const formikRef = useRef();

  const toggle = () => setModal(!modal);

  // date and time

  // date and time  <<end>>

  const initialValue = {
    description: "",
    quantity: "",
    unit_price: "",
    discount_percent: "",
    vat_percent: "",

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
  };

  const initialValues = {
    client_id: "",
    invoice_type: "",
    date_time: "",
    reference_number: "",
    logo: "",
    notes: "",
    footer_text: "",
    invoice_detail: [],
  };

  const handlePhoneChange = (value, data, setFieldValue) => {
    const countryCode = `+${data.dialCode}`;
    const phoneNumber = value.slice(data.dialCode?.length) || null;
    setFieldValue("country_code", countryCode);
    setFieldValue("mobile_number", phoneNumber);
    console.log("mobile_number", phoneNumber);
    console.log("country_code", countryCode);
  };

  const validationSchemas = Yup.object({
    footer_text: Yup.string().required("Enter text"),
    notes: Yup.string().required("Enter text"),
  });

  const validationSchema = Yup.object({
    description: Yup.string().required("required"),

    quantity: Yup.number()
      .required("required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    unit_price: Yup.number()
      .required("required")
      .positive("Unit Price must be positive"),
    discount_percent: Yup.number()
      .required("required")
      .min(0, "Discount must be at least 0%")
      .max(100, "Discount cannot exceed 100%"),
    vat_percent: Yup.number()
      .required("required")
      .min(0, "VAT must be at least 0%")
      .max(100, "VAT cannot exceed 100%"),
  });

  const onFormsubmit = (values, { resetForm, setSubmitting }) => {
    try {
      const unitPriceTotal = values.quantity * values.unit_price;
      const discountAmount = (unitPriceTotal * values.discount_percent) / 100;
      const amountDummy = unitPriceTotal - discountAmount;
      const vatAmount = (amountDummy * values.vat_percent) / 100;
      const total = unitPriceTotal - discountAmount + vatAmount;

      setProducts([{ ...values, total }, ...products]);
      console.log(discountAmount, "chjkhbdc");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const itemsTotal = products.reduce(
      (sum, product) => sum + product.quantity * product.unit_price,
      0
    );
    const discountTotal = products.reduce(
      (sum, product) =>
        sum +
        (product.quantity * product.unit_price * product.discount_percent) /
          100,
      0
    );
    const vatTotal = products.reduce(
      (sum, product) =>
        sum +
        (product.quantity * product.unit_price -
          (product.quantity * product.unit_price * product.discount_percent) /
            100) *
          (product.vat_percent / 100),
      0
    );
    const grandTotal = itemsTotal + vatTotal - discountTotal;

    setTotals({ itemsTotal, vatTotal, grandTotal });
  }, [products]);

  const handleclientsubmit = async (values) => {
    const clientData = {};
  };

  const handleSubmit = async (values) => {
    formikRef.current.submitForm();

    const singleData = {
      invoice_detail: products,
      ...values,
    };
    console.log(singleData, "datatata");
  };

  const handleTypeChange = (type, event) => {
    let clientTypeCode;
    switch (type) {
      case "business":
        clientTypeCode = 0;
        break;
      case "individual":
        clientTypeCode = 1;
        break;

      default:
        clientTypeCode = -1;
    }

    setSelectedOption(type, event);
    console.log(clientTypeCode);
  };

  const handleInvoiceTypeChange = (type, event) => {
    let invoiceTypeCode;
    switch (type) {
      case "simplified":
        invoiceTypeCode = 0;
        break;
      case "normal":
        invoiceTypeCode = 1;
        break;
      case "purchase":
        invoiceTypeCode = 2;
        break;
      default:
        invoiceTypeCode = -1;
    }
    // setSelectedOption(event.target.value);
    setSelectedInvoiceType(type, event);
    console.log(invoiceTypeCode);
  };

  return (
        <div className="create-container">
          <div className="invoice-header pb-4">
            <h3>Create invoice</h3>
            <div className="">
              <button className="draft-btn">Save as draft</button>
              <button className="send-btn" onClick={handleSubmit}>
                Send invoice
              </button>
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

    <div className="w-50">
      <DatePickerComponent/>
      <TimePickerComponent />
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

                            <div className="popup-data">
                              <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
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
                                            value=""
                                            label="Select category"
                                          />
                                          <option
                                            value="category1"
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
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={onFormsubmit}
            >
              {({ isSubmitting }) => (
                <Form className="d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex  " style={{ gap: "20px" }}>
                    <div className="invoice-item-input">
                      <label className="m-1">Product Name</label>
                      <Field
                        type="text"
                        name="description"
                        placeholder="Enter product Name"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="invoice-item-input">
                      <label className="m-1">Quantity</label>
                      <Field
                        type="number"
                        name="quantity"
                        placeholder="Enter QTY."
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="invoice-item-input">
                      <label className="m-1">Unit Price</label>
                      <Field
                        type="number"
                        name="unit_price"
                        placeholder="Enter price"
                      />
                      <ErrorMessage
                        name="unit_price"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="invoice-item-input">
                      <label className="m-1">Discount</label>
                      <Field
                        type="number"
                        name="discount_percent"
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
                      <ErrorMessage
                        name="discount_percent"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="invoice-item-input">
                      <label className="m-1">VAT</label>
                      <Field
                        type="number"
                        name="vat_percent"
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
                      <ErrorMessage
                        name="vat_percent"
                        component="div"
                        className="error-message"
                      />
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
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unit_price}</td>
                    <td>{product.discount_percent}</td>
                    <td>{product.vat_percent}</td>
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
              <h5>Rs {totals.itemsTotal.toFixed(2)}</h5>
            </div>
            <div className="">
              <h6>Total VAT</h6>
              <h5>Rs {totals.vatTotal.toFixed(2)}</h5>
            </div>
            <div className="">
              <h6>Total</h6>
              <h5>Rs {totals.grandTotal.toFixed(2)}</h5>
            </div>
          </div>
          <div className="invoice-customization">
            <h4 className="py-3">Invoice Customization</h4>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={validationSchemas}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="d-flex w-100" style={{ gap: "24px" }}>
                    <div className="invoice-customization-container">
                      <h6>Personalised message</h6>
                      <Field
                        as="textarea"
                        className="w-100"
                        name="footer_text"
                        placeholder="Enter your message"
                      />
                      <h6>
                        <ErrorMessage
                          name="footer_text"
                          component="div"
                          className="error-message"
                        />
                      </h6>
                    </div>
                    <div className="invoice-customization-container">
                      <h6>Terms and conditions</h6>
                      <Field
                        as="textarea"
                        className="w-100"
                        name="notes"
                        placeholder="Enter your message"
                      />
                      <h6>
                        <ErrorMessage
                          name="notes"
                          component="div"
                          className="error-message"
                        />
                      </h6>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
    <div className="create-container">
      <div className="invoice-header pb-4">
        <h3>Create invoice</h3>
        <div className="">
          <button className="draft-btn">Save as draft</button>
          <button className="send-btn" onClick={handleSubmit}>
            Send invoice
          </button>
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

        <div className="w-50">
          <DatePickerComponent />
          <TimePickerComponent />
        </div>
      </div>
      <SimplifiedInvoice />
      <NormalInvoice/>
      <PurchaseInvoice/>
    </div>
  );
};

export default Createinvoice;
