import React, { useRef , useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import { QRvalue } from './Invoicedetails';
import QRCode from "react-qr-code";
import logo from "../../../Assets/Images/projectimglogo.svg";
import dots from "../../../Assets/Images/dots-vertical.svg";
import download from "../../../Assets/Images/download-04.svg";
import leftarrow from "../../../Assets/Images/arrow-narrow-left.svg";
import { Accordion, Card, Button } from 'react-bootstrap';


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
export const QRvalue = "random value";
const Invoicedetails = () => {
  const contentRef = useRef();

  const generatePDF = async () => {
    const input = contentRef.current;
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margins on left and right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      

      // Center the image vertically if it doesn't fit perfectly
      const yPosition =
        (pageHeight - imgHeight) / 2 > 10 ? (pageHeight - imgHeight) / 10 : 10;

      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
      pdf.save("invoice-details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  
  const [isOpen, setIsOpen] = useState(true); const toggleIcon = () => { setIsOpen(!isOpen); };
  const [isOpen1, setIsOpen1] = useState(false); const toggleIcon1 = () => { setIsOpen1(!isOpen1); };
  const [isOpen2, setIsOpen2] = useState(false); const toggleIcon2 = () => { setIsOpen2(!isOpen2); };
  const [isOpen3, setIsOpen3] = useState(false); const toggleIcon3 = () => { setIsOpen3(!isOpen3); };
  

  return (
    <div className="">
      <div className="pdf-content-here">
        <div ref={contentRef} style={{ position: "absolute", left: "-9999px" }}>
          <div
            className="w-100"
            style={{ padding: "84px 77px", background: "white" }}
          >
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
              <div className="d-flex">
                <h6>invoice no:</h6> <h6>599494</h6>
              </div>
              <div className="d-flex">
                <h6>invoice no:</h6> <h6>599494</h6>
              </div>
            </div>
            <div className="d-flex" style={{ gap: "4rem" }}>
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
                <table className="w-100">
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
                        <td>
                          <button
                            style={{ border: "none", background: "none" }}
                          >
                            <img src={dots} alt="" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="invoice-details">
              <div className="invoice-left-content">
                <div className="">
                  <h5 className="pb-2">Invoice total (in words)</h5>
                  <h6>Two thausand six hundred</h6>
                </div>

                <div className="">
                  <h4 className="pb-2">Bank and payment details</h4>
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
              <div
                className="pt-5 mt-5 pb-3"
                style={{ borderBottom: "1px solid #ccc", width: "100%" }}
              >
                <div className="w-25">
                  <h5>Terms & Conditions</h5>
                  <h6>
                    These terms and conditions shall be governed by and
                    construed in accordance with the laws of [Country/State]
                  </h6>
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
      <div className="d-flex justify-content-between py-5">
        <div className="d-flex invoice-header" style={{ gap: "20px" }}>
          <img src={leftarrow} alt="" />
          <h5>Invoice</h5>
        </div>
        <button
          onClick={generatePDF}
          style={{ color: "#33C433", border: "none", background: "none" }}
        >
          <img src={download} alt="" /> Download PDF
        </button>
      </div>
      <div className="create-container">
        <div className="invoice-container">
          <h4>Invoice details</h4>
          <div className="invoice-detail-row pb-3">
            <div className="row my-4">
              <div className="col">
                <h6>Invoice Date</h6>
                <h5>10/12/2001</h5>
              </div>
              <div className="col">
                <h6>Invoice ID</h6>
                <h5>546f4vsv</h5>
              </div>
              <div className="col">
                <h6>Invoice type</h6>
                <h5>tax-invoice</h5>
              </div>
              <div className="col">
                <h6>Created by</h6>
                <h5>Danial</h5>
              </div>
              <div className="col">
                <h6>Invoice status</h6>
                <h5>issue close</h5>
              </div>
            </div>
          </div>
          <div className="seller-detail-row py-3">
            <h4>Seller details</h4>
            <div className="row my-4">
              <div className="col">
                <h6>Seller name</h6>
                <h5>admin</h5>
              </div>
              <div className="col">
                <h6>VAT no:</h6>
                <h5>6545165131513513545</h5>
              </div>
              <div className="col">
                <h6>Address</h6>
                <h5>
                  {" "}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.{" "}
                </h5>
              </div>
              <div className="col">
                <h6>Email</h6>
                <h5>admin@gmail.com</h5>
              </div>
              <div className="col">
                <h6>Phone</h6>
                <h5>3265315431</h5>
              </div>
            </div>
          </div>
          <div className="customer-detail-row py-3">
            <h4>Customer details</h4>
            <div className="row my-4">
              <div className="col">
                <h6>Customer Name</h6>
                <h5>Admin</h5>
              </div>
              <div className="col">
                <h6>Email</h6>
                <h5>admin@gmail.com</h5>
              </div>
              <div className="col">
                <h6>Phone</h6>
                <h5>9525344125</h5>
              </div>
              <div className="col">
                <h6>Customer Type</h6>
                <h5>Customer</h5>
              </div>
              <div className="col">
                <h6>National ID</h6>
                <h5>151565135</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="list-table p-4 my-4">
          <h4>List items</h4>
          <div className="py-4">
            <table className="w-100">
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
                    <td>
                      <button style={{ border: "none", background: "none" }}>
                        <img src={dots} alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex" style={{ gap: "13px" }}>
          <div className="qr">
            <div
              style={{
                height: "125px",
                width: "auto",
              }}
            >
              <QRCode
                size={125}
                style={{ height: "125px" }}
                value={QRvalue}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          <div className="w-100 invoice-amount-container">
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <div className="row">
                <div className="col-10">Item Total</div>
                <div className="col text-end">23r3r3</div>
              </div>
              <div className="row">
                <div className="col-10">Net Amount</div>
                <div className="col text-end">3434324</div>
              </div>
              <div className="row">
                <div className="col-10">Total VAT</div>
                <div className="col text-end">234252</div>
              </div>
              <div className="row">
                <div className="col-10">Total: </div>
                <div className="col text-end">346346</div>
              </div>
            </div>
          </div>
        </div>
        

 <div className="collapse-condent mt-4">
         <Accordion defaultActiveKey="0">

      <Accordion.Item className="collapse-item" eventKey="0">
      <Button className="p-0" variant="outline-light" onClick={(e) => { e.stopPropagation(); toggleIcon(); }} aria-expanded={isOpen} >  <Accordion.Header className="p-0"> <div className="btn-span p-0"> <h6>Additional Invoice Details</h6></div> </Accordion.Header></Button> 
        <Accordion.Body className="p-0 pt-2"> 
Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.        
              </Accordion.Body>
      </Accordion.Item >
      <Accordion.Item className="collapse-item" eventKey="2">
      <Button className="p-0" variant="outline-light" onClick={(e2) => { e2.stopPropagation(); toggleIcon2(); }} aria-expanded={isOpen2} >    <Accordion.Header className="p-0"> <div className="btn-span"><h6> Payment Details</h6></div> </Accordion.Header></Button> 
        <Accordion.Body className="p-0 pt-2">
        Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
                      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="collapse-item" eventKey="3">
      <Button className="p-0"  variant="outline-light" onClick={(e3) => { e3.stopPropagation(); toggleIcon3(); }} aria-expanded={isOpen3} >  <Accordion.Header > <div className="btn-span"> <h6>Terms & Conditions</h6>  </div>   </Accordion.Header></Button> 
        <Accordion.Body className="p-0 pt-2">
        Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
                      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="collapse-item" eventKey="1">
      <Button className="p-0" variant="outline-light" onClick={(e1) => { e1.stopPropagation(); toggleIcon1(); }} aria-expanded={isOpen1} >  <Accordion.Header> <div className="btn-span"><h6> Invoice comments</h6> </div> </Accordion.Header></Button> 
        <Accordion.Body className="p-0 pt-2">
        Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
                      </Accordion.Body>
      </Accordion.Item>
    </Accordion>
         </div>
      </div>
    </div>
  );
};

export default Invoicedetails;
