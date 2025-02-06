import React, {useState} from 'react'
import "./Settings.css"
import pen from "../../Assets/Images/edit-03.svg"
import { useNavigate } from 'react-router-dom';

const Personalsettings = () => {
 const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
   navigate('/passwordchange'); // Navigate to the OtherPage component
};

   return(
    <div className="personalsetting">
       <h2>Personal Settings</h2>
       <div className="profilelogo">
       <h1>T</h1>
       <button><img src={pen} alt="" /> </button>
       </div>
       <div className="">
    <div className="row">
    <form className="col-6 p-3 ">
                <h6>First Name</h6>
                <input type="text" placeholder="Enter First Name" className="custom-input w-100" 
                />
            </form>
            <form className="col-6 p-3 ">
                <h6>Last Name</h6>
                <input type="text" placeholder="Enter Last Name" className="custom-input w-100"/> 
            </form>
            <form className="col-6 p-3 ">
                <h6>Mobile no.</h6>
                <input type="number" placeholder="Enter Mobile Number" className="custom-input w-100"
               />
            </form>
            <form className="col-6 p-3 ">
                <h6>Email ID</h6>
                <input type="email" placeholder="Enter Email ID" className="custom-input w-100"
                 />
            </form>
    </div>
    <div className="d-flex justify-content-end pt-4">    <button className='send-btn' style={{padding: '16px'}}>Save changes</button>
    </div>
    </div>
    <div className="passwordchange-container pb-3" style={{paddingTop: '40px'}}>
      <h4>Change password</h4>
      <div className="d-flex justify-content-between">
         <div className="">
            <h5>Change password</h5>
            <h6>Update your password frequently to stay secure</h6>
         </div>
         <button className='draft-btn' style={{padding: '8px 32px', color: '#33C433'}} onClick={handleClick} >Change password</button>
      </div>
    </div>
    
    
    
    
    
    </div>
   )
};

export default Personalsettings;