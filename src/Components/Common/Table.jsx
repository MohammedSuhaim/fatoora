import React, { useEffect } from 'react';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import dots from "../../Assets/Images/dots-vertical.svg";

const Table = ({ products, setProducts, setTotals }) => {

    
  useEffect(() => {
    const itemsTotal = products.reduce(
      (sum, product) => sum + product.quantity * product.unit_price,
      0
    );
    const discountTotal = products.reduce(
      (sum, product) =>
        sum +
        (product.quantity * product.unit_price * product.discount_percent) / 100,
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
  }, [products, setTotals]);

  const onFormSubmit = (values, { resetForm, setSubmitting }) => {
    try {
      const unitPriceTotal = values.quantity * values.unit_price;
      const discountAmount = (unitPriceTotal * values.discount_percent) / 100;
      const amountDummy = unitPriceTotal - discountAmount;
      const vatAmount = (amountDummy * values.vat_percent) / 100;
      const total = unitPriceTotal - discountAmount + vatAmount;

      setProducts([{ ...values, total }, ...products]);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    description: '',
    quantity: '',
    unit_price: '',
    discount_percent: '',
    vat_percent: '',
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Product Name is required'),
    quantity: Yup.number().required('Quantity is required').positive('Must be positive').integer('Must be an integer'),
    unit_price: Yup.number().required('Unit Price is required').positive('Must be positive'),
    discount_percent: Yup.number().required('Discount is required').min(0, 'Minimum is 0').max(100, 'Maximum is 100'),
    vat_percent: Yup.number().required('VAT is required').min(0, 'Minimum is 0').max(100, 'Maximum is 100'),
  });

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex" style={{ gap: "20px" }}>
              <div className="invoice-item-input">
                <label className="m-1">Product Name</label>
                <Field type="text" name="description" placeholder="Enter product Name" />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>
              <div className="invoice-item-input">
                <label className="m-1">Quantity</label>
                <Field type="number" name="quantity" placeholder="Enter QTY." />
                <ErrorMessage name="quantity" component="div" className="error-message" />
              </div>
              <div className="invoice-item-input">
                <label className="m-1">Unit Price</label>
                <Field type="number" name="unit_price" placeholder="Enter price" />
                <ErrorMessage name="unit_price" component="div" className="error-message" />
              </div>
              <div className="invoice-item-input">
                <label className="m-1">Discount</label>
                <Field
                  type="number"
                  name="discount_percent"
                  placeholder="Enter %"
                  max={100}
                  onInput={(e) => {
                    e.target.value = Math.max(0, Math.min(100, parseInt(e.target.value, 10))).toString().slice(0, 3);
                  }}
                />
                <ErrorMessage name="discount_percent" component="div" className="error-message" />
              </div>
              <div className="invoice-item-input">
                <label className="m-1">VAT</label>
                <Field
                  type="number"
                  name="vat_percent"
                  placeholder="Enter %"
                  max={100}
                  onInput={(e) => {
                    e.target.value = Math.max(0, Math.min(100, parseInt(e.target.value, 10))).toString().slice(0, 3);
                  }}
                />
                <ErrorMessage name="vat_percent" component="div" className="error-message" />
              </div>
            </div>
            <button type="submit" className="draft-btn" disabled={isSubmitting}>
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
                <img src={dots} alt="Options" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
