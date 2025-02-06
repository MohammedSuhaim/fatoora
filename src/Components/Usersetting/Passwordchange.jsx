import React, {useState} from 'react'
import leftarrow from "../../Assets/Images/arrow-narrow-left.svg"
import Show from "../../Assets/Images/eye-off.svg"
import Hide from "../../Assets/Images/eye.svg"

const Passwordchange = () => {
        const [password, setPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [password1, setPassword1] = useState('');
        const [showPassword1, setShowPassword1] = useState(false);
        const [password2, setPassword2] = useState('');
        const [showPassword2, setShowPassword2] = useState(false);
    
        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };
    
        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        };
        
        const toggleShowPassword1 = () => {
            setShowPassword1(!showPassword1);
        };
        
        const toggleShowPassword2 = () => {
            setShowPassword2(!showPassword2);
        };
        
    return(
        <div className="">
            <div className="passchange-header">
                <img src={leftarrow} alt="" />
                <h3>Change Password</h3>
            </div>
            <div className="passchange-container">
                <h4>Create New Password</h4>
                <div className="row">
                <div className="col-12 p-3">
                <h6>Password</h6>
                <div className="custom-input">
            <input
               className='password-input'
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className='password-btn' onClick={toggleShowPassword}>
            <img src={showPassword ? Hide : Show} alt="" />
            </button>
        </div>
            </div>
            <div className="col-12 p-3">
                <h6>Password</h6>
                <div className="custom-input">
            <input
               className='password-input'
                type={showPassword1 ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password1} onChange={(e) => setPassword1(e.target.value)}
            />
            <button className='password-btn' onClick={toggleShowPassword1}>
            <img src={showPassword1 ? Hide : Show} alt="" />
            </button>
        </div>
            </div>
            <div className="col-12 p-3">
                <h6>Password</h6>
                <div className="custom-input">
            <input
               className='password-input'
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password2} onChange={(e) => setPassword2(e.target.value)}
            />
            <button className='password-btn' onClick={toggleShowPassword2}>
                <img src={showPassword2 ? Hide : Show} alt="" />
            </button>
        </div>
            </div>
                </div>
                <a className="send-btn" style={{textAlign: 'center', padding: '12px', color: 'white', cursor: 'pointer'}}>Update</a>
            </div>
        </div>
    )
}

export default Passwordchange;