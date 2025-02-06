import React from 'react'
import hlogo from "../../Assets/Images/header-img.svg"
import ImageInputComponent from '../Common/Imageinput';
import verified from "../../Assets/Images/check-verified-01.svg"
const Kycpage = () => {


    return(
         <div className="">
            <div className="kycheader">
                <h2>KYC</h2>
                <h6>Verified <img src={verified} alt="" /></h6>
            </div>
         <div className="kycimg"><img height={'100%'} src={hlogo} alt="" /></div>
            <div className="row pt-5">
            <form className="col-6 p-3 ">
                <h6>Company Name</h6>
                <input type="text" placeholder="Enter Company Name" className="custom-input w-100" 
                />
            </form>
            <form className="col-6 p-3 ">
                <h6>Company Registration No</h6>
                <input type="number" placeholder="Enter Registration No" className="custom-input w-100" 
                 />
            </form>
            <form className="col-12 p-3 ">
                <h6>Company Category</h6>
                <input type="text" placeholder="Enter Registration No" className="custom-input w-100" 
                 />
            </form>
            <form className="col-12 p-3 ">
                <h6>Company Services</h6>
                <input type="text" placeholder="Enter Registration No" className="custom-input w-100" 
                 />
            </form>
            <form className="col-12 p-3 ">
                <h6>Business Address</h6>
                <input type="text" placeholder="Enter Registration No" className="custom-input w-100" 
                 />
            </form>
            </div>
            <div className="d-flex p-3">
                <div className="doc-container">
                   <div style={{height: '74px', width: '74px'}}> <ImageInputComponent/></div>
                    <h6>CR file</h6>
                </div>
                <div className="doc-container">
                  <div style={{height: '74px', width: '74px'}}>  <ImageInputComponent/></div>
                    <h6>VAT certificate</h6>
                </div>
            </div>
         </div>

    )
}

export default Kycpage ;