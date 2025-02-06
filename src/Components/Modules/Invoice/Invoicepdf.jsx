import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QRvalue } from './Invoicedetails';
import QRCode from 'react-qr-code';
import logo from "../../../Assets/Images/projectimglogo.svg"
import dots from "../../../Assets/Images/dots-vertical.svg"

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


function Invoicepdf() {
  const contentRef = useRef();
 

  const generatePDF = async () => {
    const input = contentRef.current;
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margins on left and right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image vertically if it doesn't fit perfectly
      const yPosition = (pageHeight - imgHeight) / 2 > 10 ? (pageHeight - imgHeight) / 10 : 10;

      pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
      pdf.save('invoice-details.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    
    <div>
      <div className="">
                    <button onClick={generatePDF}>Generate and View PDF</button>
      </div>


      <div ref={contentRef} style={{visibility: 'hidden'}} >
        <div className="w-100" style={{padding: '84px 77px', background: 'white'}}>
        <div className="d-flex justify-content-between">
        <img src={logo} alt="" />
        <div
                style={{
                  height: "auto",
                  // margin: "0 auto",
                  maxWidth: 64,
                  width: "filt-content",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={QRvalue}
                  viewBox={`0 0 256 256`}
                />
              </div>
        </div>
        <div className="d-flex justify-content-between py-5">
              <div className="d-flex"><h6>invoice no:</h6> <h6>599494</h6></div>
              <div className="d-flex"><h6>invoice no:</h6> <h6>599494</h6></div>
        </div>
        <div className="d-flex" style={{gap: '4rem'}}>
          <div className="pdf-user-details">
            <h5>Seller Details</h5>
            <div className="row">
              <div className="col-4">
                <h5>sellers name</h5>
                <h6>Admins</h6>
              </div>
              <div className="col-4">
                <h5>Email</h5>
                <h6>admin@gmail.com</h6>
              </div>
              <div className="col-4">
                <h5>Phone no</h5>
                <h6>12457852</h6>
              </div>
              <div className="col-4">
                <h5>VAT no</h5>
                <h6>12457852</h6>
              </div>
              <div className="col-4">
                <h5>Address</h5>
                <h6>123 adminaddress,india</h6>
              </div>
            </div>
          </div>
          <div className="pdf-user-details">
            <h4>Customer details</h4>
            <div className="row">
              <div className="col-4">
                <h5>Customer name</h5>
                <h6>John customer</h6>
              </div>
              <div className="col-4">
                <h5>Email</h5>
                <h6>customer@gmail.com</h6>
              </div>
              <div className="col-4">
                <h5>Phone</h5>
                <h6>3543543435</h6>
              </div>
              <div className="col-4">
                <h5>Customer Type</h5>
                <h6>Customer</h6>
              </div>
              <div className="col-4">
                <h5>National ID</h5>
                <h6>235234552542</h6>
              </div>
            </div>
          </div>
        </div>
<div className="pdf-table my-4">
  <h5>List Items</h5>
              <div className="">
                <table className='w-100'>
                  <thead>
                    <tr>
                      <th>Item description</th>
                      <th>Qty.</th>
                      <th>Unit price</th>
                      <th>Discount (%)</th>
                      <th>Net Amount</th>
                      <th>VAT (%)</th>
                      <th>Total</th>
                      <th>Action</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((i) => (
                      <tr key={i.id}>
                        <td>{i.item}</td>
                        <td>{i.qty}</td>
                        <td>{i.price}</td>
                        <td>{i.discount}</td>
                        <td>{i.netamount}</td>
                        <td>{i.vat}</td>
                        <td>{i.totalvat}</td>
                        <td>{i.total}</td>
                        <td><button style={{border: 'none', background: 'none'}}><img src={dots} alt="" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
</div>
<div className="invoice-details">
  <div className="invoice-left-content">
    <div className="">
    <h5 className='pb-2'>Invoice total (in words)</h5>
    <h6>Two thausand six hundred</h6>
    </div>

  <div className="">
    <h4 className='pb-2'>Bank and payment details</h4>
    <div className="d-flex justify-content-between py-1">
      <h5>Bank Account Name:</h5>
      <h6>simple fatoora</h6>
    </div>
    <div className="d-flex justify-content-between py-1">
      <h5>Bank Name:</h5>
      <h6>Random</h6>
    </div>
    <div className="d-flex justify-content-between py-1">
      <h5>IBAN</h5>
      <h6>SA64161654616545</h6>
    </div>
  </div>
  </div>
  <div className="invoice-right-content">
    <div className="d-flex justify-content-between py-2">
      <h6>Sub total</h6>
      <h5>35466</h5>
    </div>
    <div className="d-flex justify-content-between py-2">
      <h6>Discount</h6>
      <h5>3524</h5>
    </div>
    <div className="d-flex justify-content-between py-2">
      <h6>Taxable Amount</h6>
      <h5>324235</h5>
    </div>
    <div className="d-flex justify-content-between py-2">
      <h6>Total VAT</h6>
      <h5>32523</h5>
    </div>
    <div className="d-flex justify-content-between py-2">
      <h6>Total</h6>
      <h5>364354</h5>
    </div>
  </div>
</div>


<footer>
  <div className="pt-5 mt-5 pb-3" style={{ borderBottom: '1px solid #ccc', width: '100%'}}>
  <div className="w-25">
    <h5>Terms & Conditions</h5>
    <h6>These terms and conditions shall be governed by and construed in accordance with the laws of [Country/State]</h6>
  </div>
  </div>
  <div className="pt-3 d-flex justify-content-between">
  <div className="">
      <h6>CR No : 64151343</h6>
    </div>
    <div className="">
      <h6>Phone : 64151343</h6>
    </div>
    <div className="">
      <h6>VAT : 64151343</h6>
    </div>
    <div className="">
      <h6>Address: Lorem ipsum dolor sit amet.</h6>
    </div>
  </div>

</footer>

        </div>
      </div>

    </div>
  );
}

export default Invoicepdf;
