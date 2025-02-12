import React, { useState } from "react";
import search from "../../../Assets/Images/search-md.svg";
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import ImageInputComponent from "../../Common/Imageinput";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./Createinvoice.css";
import DatePickerComponent from "../../Common/Date";
// import styled from 'styled-components';
import dots from "../../../Assets/Images/dots-vertical.svg";
import Invoicepdf from "./Invoicepdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const data = [
  {
    item: "Apple Laptop",
    qty: 1,
    price: 24571,
    discount: 0,
    netamount: 14524,
    vat: 18,
    totalvat: 5412,
    total: 41554,
  },
  {
    item: "Apple Laptop",
    qty: 1,
    price: 24571,
    discount: 0,
    netamount: 14524,
    vat: 18,
    totalvat: 5412,
    total: 41554,
  },
  {
    item: "Apple Laptop",
    qty: 1,
    price: 24571,
    discount: 0,
    netamount: 14524,
    vat: 18,
    totalvat: 5412,
    total: 41554,
  },
];

const Createinvoice = () => {
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
const [products, setProducts] = useState([]);



const initialValues = {
    productName: '',
    quantity: '',
    unitPrice: '',
    discount: '',
    vat: '',
  };
  const validationSchema = Yup.object({
    productName: Yup.string().required('Required'),
    quantity: Yup.number().required('Required').positive().integer(),
    unitPrice: Yup.number().required('Required').positive(),
    discount: Yup.number().required('Required').positive(),
    vat: Yup.number().required('Required').positive(),
  });

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };
  const onClick = (values, { resetForm }) => {
    const total = values.unitPrice - values.discount + values.vat;
    setProducts([...products, { ...values, total }]);
    resetForm();
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
          <div className="d-flex">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Default radio
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Default radio
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Default radio
              </label>
            </div>
          </div>
        </div>
        <div className="">
      <div>
        <button onClick={() => setShowCalendar(!showCalendar)}>
          {startDate ? startDate.toLocaleDateString() : 'Select Date'}
        </button>
        {showCalendar && (
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
          />
        )}
      </div>
        </div>
        <div className="invoice-item-container">
          <h4>Seller details</h4>
          <span><h6>Sellers name : </h6><h5>toxic caffine pvt</h5></span>
          <span><h6>VAT no :</h6><h5>3516351351</h5></span>
          <span><h6>Address : </h6><h5>this is address</h5></span>

        </div>
        <div className="mt-5">
          <h5 className="invoice-title py-2">Customer Details</h5>
          <div className="row">
            <div className="col-6">
              <h6 className="pb-2 input-header">
                Search customer by Name/Number/Phone
              </h6>
              <Form inline style={{ flex: "0 0 65%" }}>
                <div className="search-container">
                  <img src={search} alt="" />
                  <FormControl
                    type="search"
                    placeholder="Search anything"
                    className="mr-sm-2 search-box"
                  />
                </div>
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
            </div>
            <div className="col-6">
              <h6 className="pb-2 input-header ">Customer Type</h6>
              <div className="dropdown p-0">
                <button
                  className="btn dropdown-toggle m-0 w-100 d-flex justify-content-between align-items-center custom-input"
                  style={{ color: "#797b7e", border: "1px solid #ccc" }}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <div
                  className="dropdown-menu"
                  style={{
                    transform: "translate3d(0px, -109px, 0px)",
                    width: "100%",
                  }}
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="or-span py-2">
          <span></span>
          <h6>OR</h6>
          <span></span>
        </div>
        <div className="row py-2">
          <form className="col-6 p-3 ">
            <h6 className="pb-2 input-header">Customer Name</h6>
            <input
              type="text"
              placeholder="Enter Customer Name"
              className="custom-input m-0 w-100"
            />
          </form>
          <form className="col-6 p-3 ">
            <h6 className="pb-2 input-header">Customer Address</h6>
            <input
              type="text"
              placeholder="Enter Address"
              className="custom-input m-0 w-100"
            />
          </form>
          <form className="col-6 p-3 ">
            <h6 className="input-header">Email ID</h6>
            <input
              type="email"
              placeholder="Enter Email ID"
              className="custom-input mt-2 w-100"
            />
          </form>
          <div className="col-6 p-3">
            <h6 className="input-header">Phone Number</h6>
            <PhoneInput
              className="mt-2"
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{ width: "100%" }}
              buttonStyle={{ marginRight: "10px" }}
            />
          </div>
          <form className="col-6 p-3 ">
            <h6 className="input-header">Customer VAT No.</h6>
            <input
              type="number mt-2"
              placeholder="Enter VAT No"
              className="custom-input w-100"
            />
          </form>
          <form className="col-6 p-3 ">
            <h6 className="input-header">Company Registration number</h6>
            <input
              type="number mt-2"
              placeholder="Enter Company Registration number"
              className="custom-input w-100"
            />
          </form>
        </div>
        <div className="mt-5">
          <div className="">
            <h5 className="invoice-title pb-2">Invoice items</h5>
            <h6 className="input-header pb-1">Search product or service</h6>
            <div className="d-flex justify-content-between">
              <Form inline style={{ flex: "0 0 75%" }}>
                <div className="search-container">
                  <img src={search} alt="" />
                  <FormControl
                    type="search"
                    placeholder="Search anything"
                    className="mr-sm-2 search-box"
                  />
                </div>
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
              <button className="draft-btn">
                <img src="" alt="" /> Add New Item
              </button>
            </div>
          </div>
          <div className="invoice-item-container my-3">
            <div className="d-flex justify-content-between">
              <ul className="d-flex">
                <li className="invoice-item-details">
                  <h5>List Item</h5> <h6>#</h6>
                </li>
                <li className="invoice-item-details">
                  <h5 className="input-header">Cost Price</h5> <h6>0.00</h6>
                </li>
                <li className="invoice-item-details">
                  <h5 className="input-header">Unit Price</h5> <h6>0.00</h6>
                </li>
                <li className="invoice-item-details">
                  <h5 className="input-header">Total</h5> <h6>0.00</h6>
                </li>
              </ul>
              <button
                style={{ background: "none", fontSize: "25px", border: "none" }}
              >
                x
              </button>
            </div>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onClick}
                  >
                    {() => (
                      <Form>
                        <div>
                          <label>Product Name:</label>
                          <Field type="text" name="productName" />
                          <ErrorMessage name="productName" component="div" />
                        </div>
                        <div>
                          <label>Quantity:</label>
                          <Field type="number" name="quantity" />
                          <ErrorMessage name="quantity" component="div" />
                        </div>
                        <div>
                          <label>Unit Price:</label>
                          <Field type="number" name="unitPrice" />
                          <ErrorMessage name="unitPrice" component="div" />
                        </div>
                        <div>
                          <label>Discount:</label>
                          <Field type="number" name="discount" />
                          <ErrorMessage name="discount" component="div" />
                        </div>
                        <div>
                          <label>VAT:</label>
                          <Field type="number" name="vat" />
                          <ErrorMessage name="vat" component="div" />
                        </div>
                        <button type="submit" className="draft-btn">Submit</button>
                      </Form>
                    )}
                  </Formik>
          </div>
          <div className="py-4">
          <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>VAT</th>
            <th>Total</th>
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
            </tr>
          ))}
        </tbody>
      </table>
          </div>
          <div className="item-container mt-5">
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
          <p>
            <button
              className="btn invoice-title "
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Payment term details
            </button>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div className="row">
                <div className="col-6 p-3">
                  <h6 className="input-header">Payment Status</h6>
                  <div className="dropdown p-0">
                    <button
                      className="btn dropdown-toggle w-100 d-flex justify-content-between align-items-center custom-input"
                      style={{ color: "#797b7e", border: "1px solid #ccc" }}
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown button
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{
                        transform: "translate3d(0px, -109px, 0px)",
                        width: "100%",
                      }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Open
                      </a>
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                    </div>
                  </div>
                </div>
                <form className="col-6 p-3 ">
                  <h6 className="input-header">Payment methord</h6>
                  <div className="dropdown p-0">
                    <button
                      className="btn dropdown-toggle w-100 d-flex justify-content-between align-items-center custom-input"
                      style={{ color: "#797b7e", border: "1px solid #ccc" }}
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Payment method
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{
                        transform: "translate3d(0px, -109px, 0px)",
                        width: "100%",
                      }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Cash
                      </a>
                      <a className="dropdown-item" href="#">
                        Online
                      </a>
                    </div>
                  </div>
                </form>
                <form className="col-6 p-3 ">
                  <h6 className="input-header">Amount</h6>
                  <input
                    type="number"
                    placeholder=""
                    className="custom-input w-100"
                  />
                </form>
                <form className="col-6 p-3 ">
                  <h6 className="input-header">Reference (optional)</h6>
                  <input
                    type="text"
                    placeholder="Enter Referal "
                    className="custom-input w-100"
                  />
                </form>
              </div>
              <div className="row">
                <h5 className="invoice-title">Terms & conditions</h5>
                <div className="dropdown col-6  pt-3 px-2">
                  <button
                    className="btn dropdown-toggle w-100 d-flex justify-content-between align-items-center custom-input"
                    style={{ color: "#797b7e", border: "1px solid #ccc" }}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{
                      transform: "translate3d(0px, -109px, 0px)",
                      width: "100%",
                    }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Open
                    </a>
                    <a className="dropdown-item" href="#">
                      Close
                    </a>
                  </div>
                </div>
                <a href="" className="add-item-btn">
                  + Add new item
                </a>
                <div className="col-6 py-3">
                  <h6 className="input-header">Supply Date</h6>
                  <DatePickerComponent />
                </div>
                <div className="col-6">
                  <h6 className="input-header">Bank Details</h6>
                  <div className="dropdown p-0">
                    <button
                      className="btn dropdown-toggle w-100 d-flex justify-content-between align-items-center custom-input"
                      style={{ color: "#797b7e", border: "1px solid #ccc" }}
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown button
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{
                        transform: "translate3d(0px, -109px, 0px)",
                        width: "100%",
                      }}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-note">
                <h5 className="invoice-title">notes and comments</h5>
                <input type="text" />
              </div>
              <div className="invoice-upload">
                <h6>In</h6>
                <ImageInputComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
