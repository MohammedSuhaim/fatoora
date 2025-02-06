import React from 'react'
import lock from "../../Assets/Images/forgot lock.svg"
import { FormControl } from 'react-bootstrap';
import Footer from '../Modules/Footer/Footer';


const Forgotpassword = () => {
   
  

    return(

        <div className="">
            <div className="container-fluid otp-container my-5">
                <img src={lock} alt="" />
                <div className="verify-container">
                    <h5 >Forgot Password?</h5>
                </div>
                <div className="input-box" style={{width: '65%'}}>
                    <h6>Email ID</h6>
                    <div className="search-container">
                    <FormControl type='email' placeholder='Enter Email ID' className='search-box' />
                    </div>
                    <button className='verify-btn my-4' ><h6>Submit </h6></button>
                </div>
                <h6>Didn't Receive?<a href="" style={{color: '#3BCF3B', textDecoration: 'none'}}> Resend OTP</a></h6>
              
            </div>
            <Footer />
        </div>
    )
}

export default Forgotpassword ;