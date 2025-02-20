import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "react-phone-input-2/lib/style.css";
import DatePickerComponent from "../../Common/Date";
import "react-date-picker/dist/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TimePickerComponent from "../../Common/Time";
import * as Yup from "yup";
import axios from "axios";
import axiosInstance from "../../redux/Api/Index";
import search from "../../../Assets/Images/search-md.svg";
import { Navbar, Nav, NavDropdown, FormControl, Button } from "react-bootstrap";
import ImageInputComponent from "../../Common/Imageinput";
import PhoneInput from "react-phone-input-2";
import "./Createinvoice.css";
import dots from "../../../Assets/Images/dots-vertical.svg";
import Invoicepdf from "./Invoicepdf";
import down from "../../../Assets/Images/chevron-down.svg";
import plus from "../../../Assets/Images/green plus.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PurchaseInvoice from "./PurchaseInvoice";
import CreateClient from "./CreateClient";
import { useNavigate } from "react-router-dom";

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const NormalInvoice = forwardRef((props, ref, args) => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("business");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggle = () => setModal(!modal);

  const initialValues = {
    date: new Date(),
    time: getCurrentTime(),
    footer_text: "",
    notes: "",
    description: "",
    quantity: "",
    unit_price: "",
    discount_percent: "",
    vat_percent: "",
    invoice_details: [],
  };

  const handleclientsubmit = async (values) => {
    const clientData = {};
  };

  const validationSchema = Yup.object({
    date: Yup.date(),
    time: Yup.string(),
    footer_text: Yup.string(),
    notes: Yup.string(),
    description: Yup.string(),
    quantity: Yup.string(),
    unit_price: Yup.string(),
    discount_percent: Yup.string(),
    vat_percent: Yup.string(),
  });

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

  const handleSubmit = async (values) => {
    const dateTime = `${values.date.toISOString().split("T")[0]} ${
      values.time
    }`;
    console.log(
      values.footer_text,
      values.notes,
      dateTime,
      values.invoice_details
    );
    try {
      const response = await axiosInstance.post(
        "/customer_app/invoice/create",
        {
          invoice_type: 1,
          date_time: dateTime,
          footer_text: values.footer_text,
          notes: values.notes,
          invoice_details: values.invoice_details.map((product) => ({
            description: product.description,
            quantity: product.quantity,
            unit_price: product.unit_price,
            discount_percent: product.discount_percent,
            vat_percent: product.vat_percent,
          })),
        }
      );
      if (response.data.status === true) {
        navigate("/issuedinvoice");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = (values, arrayHelpers, setFieldValue) => {
    if (
      values.description &&
      values.quantity &&
      values.unit_price &&
      values.discount_percent &&
      values.vat_percent
    ) {
      arrayHelpers.push({
        description: values.description,
        quantity: values.quantity,
        unit_price: values.unit_price,
        discount_percent: values.discount_percent,
        vat_percent: values.vat_percent,
      });

      setFieldValue("description", "");
      setFieldValue("quantity", "");
      setFieldValue("unit_price", "");
      setFieldValue("discount_percent", "");
      setFieldValue("vat_percent", "");
    }
  };
  useImperativeHandle(ref, () => ({
      submit() {
        formikRef.current.submitForm();
      },
    }));
  
    const formikRef = React.useRef();

  return (
    <div className="">
      <Formik
       innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, isValid, values, errors }) => (
          <Form>
            {console.log("Form values:", values)}
            <div className="d-flex w-50">
              <DatePickerComponent
                selected={values.date}
                onChange={(date) => {
                  console.log("Selected date:", date);
                  setFieldValue("date", date);
                }}
              />

              <TimePickerComponent
                value={values.time}
                onChange={(time) => {
                  console.log("Selected time:", time);
                  setFieldValue("time", time);
                }}
              />
            </div>
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

            <div className="">
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
                          onClick={openModal}
                        >
                          {" "}
                          <img src={plus} alt="" />
                          Add New Customer
                        </Button>
                        <CreateClient
                          isOpen={modalIsOpen}
                          onClose={closeModal}
                        />
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
            </div>

            <div className="">
              <div className="invoice-item-header">
                <h4>Invoice items</h4>
                <h6>Search product and services</h6>
              </div>
              <div className="invoice-box py-3 row align-items-center">
                <div className="col invoice-item-input">
                  <label className="m-1">Product Name</label>
                  <Field
                    className="col"
                    placeholder="Description"
                    name="description"
                    type="text"
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                  <ErrorMessage name="description" component="div" />
                </div>

                <div className="col invoice-item-input">
                  <label className="m-1">Quantity</label>
                  <Field
                    className=""
                    placeholder="Quantity"
                    name="quantity"
                    type="number"
                    onChange={(e) =>
                      setFieldValue("quantity", parseFloat(e.target.value) || 0)
                    }
                  />
                  <ErrorMessage name="quantity" component="div" />
                </div>

                <div className="col invoice-item-input">
                  <label className="m-1">unit price</label>
                  <Field
                    placeholder="Unit price"
                    name="unit_price"
                    type="number"
                    onChange={(e) =>
                      setFieldValue(
                        "unit_price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <ErrorMessage name="unit_price" component="div" />
                </div>

                <div className="col invoice-item-input">
                  <label className="m-1">discount %</label>

                  <Field
                    className=""
                    placeholder="Discount percent"
                    name="discount_percent"
                    type="number"
                    onChange={(e) =>
                      setFieldValue(
                        "discount_percent",
                        Math.min(parseFloat(e.target.value) || 0, 100)
                      )
                    }
                  />
                  <ErrorMessage name="discount_percent" component="div" />
                </div>

                <div className="col invoice-item-input">
                  <label className="m-1">VAT %</label>
                  <Field
                    className=""
                    placeholder="VAT percent"
                    name="vat_percent"
                    type="number"
                    onChange={(e) =>
                      setFieldValue(
                        "vat_percent",
                        Math.min(parseFloat(e.target.value) || 0, 100)
                      )
                    }
                  />
                  <ErrorMessage name="vat_percent" component="div" />
                </div>

                <div className="col d-flex justify-content-end ">
                  <FieldArray name="invoice_details">
                    {(arrayHelpers) => (
                      <button
                        className="draft-btn"
                        type="button"
                        onClick={() =>
                          handleAddProduct(values, arrayHelpers, setFieldValue)
                        }
                      >
                        Add
                      </button>
                    )}
                  </FieldArray>
                </div>
              </div>
            </div>

            {values.invoice_details.length > 0 && (
              <div className="py-3" style={{ minHeight: "10rem" }}>
                <table className="w-100">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit price</th>
                      <th>Discount percent</th>
                      <th>VAT percent</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.invoice_details.map((product, index) => {
                      let item_cost = product.unit_price * product.quantity;
                      let discount =
                        item_cost * (product.discount_percent / 100);
                      let vat_amount =
                        (item_cost - discount) * (product.vat_percent / 100);
                      let total = item_cost - discount + vat_amount;

                      return (
                        <tr key={index}>
                          <td>{product.description}</td>
                          <td>{product.quantity}</td>
                          <td>{product.unit_price}</td>
                          <td>{product.discount_percent}</td>
                          <td>{product.vat_percent}</td>
                          <td>{total.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="item-container my-5">
              <div className="">
                <h6>Items Total</h6>
                <h5>
                  Rs{" "}
                  {values.invoice_details
                    .reduce(
                      (acc, product) =>
                        acc + product.quantity * product.unit_price,
                      0
                    )
                    .toFixed(2)}
                </h5>
              </div>
              <div className="">
                <h6>Total VAT</h6>
                <h5>
                  Rs{" "}
                  {values.invoice_details
                    .reduce(
                      (acc, product) =>
                        acc +
                        ((product.unit_price * product.quantity -
                          (product.unit_price *
                            product.quantity *
                            product.discount_percent) /
                            100) *
                          product.vat_percent) /
                          100,
                      0
                    )
                    .toFixed(2)}
                </h5>
              </div>
              <div className="">
                <h6>Total</h6>
                <h5>
                  Rs{" "}
                  {values.invoice_details
                    .reduce(
                      (acc, product) =>
                        acc +
                        (product.unit_price * product.quantity -
                          (product.unit_price *
                            product.quantity *
                            product.discount_percent) /
                            100 +
                          ((product.unit_price * product.quantity -
                            (product.unit_price *
                              product.quantity *
                              product.discount_percent) /
                              100) *
                            product.vat_percent) /
                            100),
                      0
                    )
                    .toFixed(2)}
                </h5>
              </div>
            </div>
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
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default NormalInvoice;
