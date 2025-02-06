import React, { useState } from "react";
import "./Homepage.css";
import vans from "../../Assets/Images/Layer_1.svg";
import macdonalds from "../../Assets/Images/Layer_1 (1).svg";
import sony from "../../Assets/Images/Layer_1 (2).svg";
import chennel from "../../Assets/Images/Layer_1 (3).svg";
import handm from "../../Assets/Images/Layer_1 (4).svg";
import kia from "../../Assets/Images/kia.svg";
import aniframe from "../../Assets/Images/Component 1.svg";
import creaatebox from "../../Assets/Images/create and send.svg";
import seamlessbox from "../../Assets/Images/seamless.svg";
import realtimebox from "../../Assets/Images/real time.svg";
import compliancebox from "../../Assets/Images/compliance.svg";
import file from "../../Assets/Images/file-05.svg";
import shopping from "../../Assets/Images/shopping-cart-03.svg";
import pie from "../../Assets/Images/pie-chart-03.svg";
import link from "../../Assets/Images/link-03.svg";
import signup from "../../Assets/Images/signup.svg";
import setup from "../../Assets/Images/setup.svg";
import startimg from "../../Assets/Images/startimg.svg";
import settingkey from "../../Assets/Images/settings-key.svg";
import currency from "../../Assets/Images/currency-dollar-circle.svg";
import support from "../../Assets/Images/message-chat-square.svg";
import cloud from "../../Assets/Images/cloud-blank-01.svg";
import sync from "../../Assets/Images/refresh-ccw-02.svg";
import piggy from "../../Assets/Images/piggy-bank-01.svg";
import ecommerce from "../../Assets/Images/e-comernce.svg";
import freelance from "../../Assets/Images/freelance.svg";
import enterprise from "../../Assets/Images/enterprise.svg";
import { Accordion, Card, Button } from 'react-bootstrap';
import logo from "../../Assets/Images/white logo.svg"
import fb from "../../Assets/Images/FB.svg"
import x from "../../Assets/Images/Clip path group.svg"
import linkedin from "../../Assets/Images/Linkedin.svg"
import insta from "../../Assets/Images/Insta.svg"
import { useNavigate } from "react-router-dom";





const bgstyle = {
  backgroundSize: "auto",
  backgroundPosition: "bottom",
  
  width: "100%",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const Homepage = () => {


    const [isOpen, setIsOpen] = useState(true); const toggleIcon = () => { setIsOpen(!isOpen); };
const [isOpen1, setIsOpen1] = useState(false); const toggleIcon1 = () => { setIsOpen1(!isOpen1); };
const [isOpen2, setIsOpen2] = useState(false); const toggleIcon2 = () => { setIsOpen2(!isOpen2); };
const [isOpen3, setIsOpen3] = useState(false); const toggleIcon3 = () => { setIsOpen3(!isOpen3); };

const navigate = useNavigate();

const handleclick = () => {
  navigate('/createaccount')
}




  return (
    <div className="homepage" style={{paddingTop: '52px'}}>
      <div className="intro-container" style={bgstyle}>
        <h1>Revolutionize Your Invoicing Process with Ease</h1>
        <h6 className="py-2">
          Are you tired of juggling multiple tools to create, send, and track
          invoices? Say goodbye to manual errors and hello to automation with
          [Your Brand Name] — your ultimate solution for seamless e-invoicing.
        
        </h6>
      </div>
      <img src={aniframe} width={'100%'} alt="" />
      <div className="brand-logo">
        <h6>Trusted by awesome brands</h6>
        <div className="logo-img">
          <img src={vans} alt="" />
          <img src={macdonalds} alt="" />
          <img src={sony} alt="" />
          <img src={chennel} alt="" />
          <img src={handm} alt="" />
          <img src={kia} alt="" />
        </div>
      </div>
      <div className="why-box-container">
        <h4>Why Choose Simple Fatoora?</h4>
        <h6 style={{ fontSize: "18px", fontWeight: "400", color: "#4F4A5F" }}>
          Say goodbye to manual errors with simple fatoora
        </h6>
        <div className="row pt-3 m-0">
          <div className="why-box pl-0 col-6">
            <img width={'100%'} src={creaatebox} alt="" />
            <div className="d-flex pt-3 pb-2" style={{ gap: "5px" }}>
              <img src={file} alt="" />
              <h5>Create & Send E-Invoices</h5>
            </div>
            <h6>
              Generate professional, GST-compliant e-invoices in minutes & send
              invoices directly to your clients with just one click.
            </h6>
          </div>
          <div className="why-box pr-0 col-6">
            <img width={'100%'} src={seamlessbox} alt="" />
            <div className="d-flex pt-3 pb-2" style={{ gap: "5px" }}>
              <img src={shopping} alt="" />
              <h5>Seamless E-commerce Integration</h5>
            </div>
            <h6>
            Automate invoice generation for every sale, saving time and effort. Compatible with WooCommerce, Shopify & Magento.            </h6>
          </div>
          <div className="why-box pl-0 col-6">
            <img width={'100%'} src={realtimebox} alt="" />
            <div className="d-flex pt-3 pb-2" style={{ gap: "5px" }}>
              <img src={pie} alt="" />
              <h5>Real-Time Tracking & Insights</h5>
            </div>
            <h6>
            Monitor invoice status with live updates & Get detailed insights into your financial data to make informed decisions.
            </h6>
          </div>
          <div className="why-box pr-0 col-6">
            <img width={'100%'} src={compliancebox} alt="" />
            <div className="d-flex pt-4 pb-2" style={{ gap: "5px" }}>
              <img src={link} alt="" />
              <h5>Compliance Made Simple</h5>
            </div>
            <h6>
            Ensure adherence to all government regulations. Automate GST calculations and generate audit-ready reports.
            </h6>
          </div>
        </div>
      </div>
      <div className="work-container">
        <div className="work-header my-4">
          <h4>How it works</h4>
          <h6>Effortless Invoicing in Just a Few Steps</h6>
        </div>
        <div className="sub-container pb-5">
          <div className="sub-item">
            <img src={signup} alt="" />
            <h5>Sign Up</h5>
            <h6>
              Create your account in just a few simple clicks & get started
            </h6>
          </div>
          <div className="sub-item">
            <img src={setup} alt="" />
            <h5>Set Up</h5>
            <h6>
              Customize your invoice template and integrate your e-commerce
              store.
            </h6>
          </div>
          <div className="sub-item">
            <img src={startimg} alt="" />
            <h5>Start Sending</h5>
            <h6>Generate, send, and track e-invoices effortlessly.</h6>
          </div>
        </div>
        <div className="d-flex justify-content-center pt-5"><button className="dark-btn" onClick={handleclick}>Get started</button></div>
      </div>
      <div className="key-container">
        <div className="key-header pb-3">
          <h5>Key Features at a Glance</h5>
          <h6>Powerful Features to Simplify Your Workflow</h6>
        </div>
        <div className="row pt-5">
          <div className="col  key-item ">
            <img src={settingkey} alt="" />
            <h5>Customisable Templates</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
          <div className="col  key-item ">
            <img src={currency} alt="" />
            <h5>Multi-Currency Support</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
          <div className="col key-item ">
            <img src={support} alt="" />
            <h5> 24/7 Support</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col key-item ">
            <img src={cloud} alt="" />
            <h5>Cloud Storage</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
          <div className="col key-item ">
            <img src={sync} alt="" />
            <h5>Auto Sync</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
          <div className="col  key-item ">
            <img src={piggy} alt="" />
            <h5>Affordable</h5>
            <h6>
              Monitor invoice status with live updates & Get detailed insights
              into your financial data to make informed decisions.
            </h6>
          </div>
        </div>
      </div>
      <div className="key-container who-container">
        <div className="key-header who-header">
          <h5>Who is it for?</h5>
          <h6>Easy-to-use invoicing tools tailored for all business needs.</h6>
        </div>
        <div className="row who-row">
          <div className="col who-item">
            <img src={ecommerce} alt="" />
            <h5>E-commerce Businesses</h5>
            <h6>Automate invoicing for every order.</h6>
          </div>
          <div className="col who-item">
            <img src={freelance} alt="" />
            <h5>Freelancers & Agencies</h5>
            <h6>Streamline payments and maintain professionalism.</h6>
          </div>
          <div className="col who-item">
            <img src={enterprise} alt="" />
            <h5>Small & Medium Enterprises</h5>
            <h6>Save time and stay compliant effortlessly.</h6>
          </div>
        </div>
      </div>
      <div className="key-container">
        <div className="key-header pb-5">
          <h5>Frequently asked question (FAQ's)</h5>
          <h6>Answers to Help You Get Started</h6>
        </div>
          


         <div className="pt-5">
         <Accordion defaultActiveKey="0">
      <Accordion.Item className="py-4" eventKey="0">
      <Button variant="outline-light" onClick={(e) => { e.stopPropagation(); toggleIcon(); }} aria-expanded={isOpen} >  <Accordion.Header> <div className="btn-span"><span>1.</span> <h6>Can I cancel my subscription if I no longer use it?</h6></div> </Accordion.Header></Button> 
        <Accordion.Body>
        Absolutely! Our platform seamlessly integrates with all major e-commerce platforms including Shopify, Magento, Wordpress ect.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="py-4" eventKey="1">
      <Button variant="outline-light" onClick={(e1) => { e1.stopPropagation(); toggleIcon1(); }} aria-expanded={isOpen1} >  <Accordion.Header> <div className="btn-span"><span>2.</span> <h6>Are the invoices GST-compliant?</h6> </div> </Accordion.Header></Button> 
        <Accordion.Body>
        Absolutely! Our platform seamlessly integrates with all major e-commerce platforms including Shopify, Magento, Wordpress ect.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="py-4" eventKey="2">
      <Button variant="outline-light" onClick={(e2) => { e2.stopPropagation(); toggleIcon2(); }} aria-expanded={isOpen2} >    <Accordion.Header> <div className="btn-span"><span>3.</span> <h6>Is my data secure?</h6></div> </Accordion.Header></Button> 
        <Accordion.Body >
        Absolutely! Our platform seamlessly integrates with all major e-commerce platforms including Shopify, Magento, Wordpress ect.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="py-4" eventKey="3">
      <Button variant="outline-light" onClick={(e3) => { e3.stopPropagation(); toggleIcon3(); }} aria-expanded={isOpen3} >  <Accordion.Header > <div className="btn-span"><span>4.</span> <h6>Can I cancel my subscription if I no longer use it?</h6>  </div>   </Accordion.Header></Button> 
        <Accordion.Body>
        Absolutely! Our platform seamlessly integrates with all major e-commerce platforms including Shopify, Magento, Wordpress ect.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
         </div>




        
      </div>
      <div className="get-started-container">
        <h3>Start Your E-Invoicing Journey Today!</h3>
        <h6>Let us handle the invoicing while you focus on growing your business</h6>
        <button onClick={handleclick}>Get Started for free</button>
      </div>
      <footer className="homepage-footer">
        <div className="footer-content">
            <img className="pb-4" src={logo} alt="" />
            <div className="row pt-2">
               <a className="col" style={{cursor: 'pointer'}}> <img src={fb} className="" height={"42px"} alt="" />  </a>
               <a className="col" style={{cursor: 'pointer'}}> <img src={x} className="" height={"42px"} alt="" />  </a>
               <a className="col" style={{cursor: 'pointer'}}> <img src={linkedin} className="" height={"42px"} alt="" />  </a>
               <a className="col" style={{cursor: 'pointer'}}> <img src={insta} className="" height={"42px"} alt="" />  </a>
            </div>
            <div className="row footer-row">
            <a href="" className="col footer-col">Pricing</a>
            <a href="" className="col footer-col">FAQ's</a>
            <a href="" className="col footer-col">Resources</a>
            <a href="" className="col footer-col">Contact Us</a>
            <a href="" className="col footer-col">Terms & Conditions</a>
            <a href="" className="col footer-col">Privacy Policy</a>
        </div>
        </div>
        
        <div className="footer-vali">
            <h6>Copyright@2024 Simple Fatoora pvt ltd. | All rights reserved </h6>
            <h6>Terms & Conditions | Privacy Policy</h6>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
