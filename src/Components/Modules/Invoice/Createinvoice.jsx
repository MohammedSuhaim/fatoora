import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import SimplifiedInvoice from "./SimpliifiedInvoice";
import NormalInvoice from "./Normalinvoice";
import PurchaseInvoice from "./PurchaseInvoice";

const Createinvoice = (args) => {
  const [products, setProducts] = useState([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("simplified");
  const [totals, setTotals] = useState({
    itemsTotal: 0,
    vatTotal: 0,
    grandTotal: 0,
  });

  const simplifiedInvoiceRef = useRef();
  const normalInvoiceRef = useRef();
  const purchaseInvoiceRef = useRef();

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

  const handleSubmit = async () => {
    switch (selectedInvoiceType) {
      case "simplified":
        simplifiedInvoiceRef.current.submit();
        break;
      case "normal":
        normalInvoiceRef.current.submit();
        break;
      case "purchase":
        purchaseInvoiceRef.current.submit();
        break;
      default:
        break;
    }
  };

  const handleInvoiceTypeChange = (type, event) => {
    setSelectedInvoiceType(type, event);
    console.log(type);
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
      </div>

      {selectedInvoiceType === "simplified" && (
        <SimplifiedInvoice ref={simplifiedInvoiceRef} />
      )}
      {selectedInvoiceType === "normal" && (
        <NormalInvoice ref={normalInvoiceRef} />
      )}
      {selectedInvoiceType === "purchase" && (
        <PurchaseInvoice ref={purchaseInvoiceRef} />
      )}
    </div>
  );
};

export default Createinvoice;
