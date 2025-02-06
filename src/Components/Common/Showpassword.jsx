import React, { useState } from 'react';
import Show from "../../Assets/Images/eye-off.svg"
import Hide from "../../Assets/Images/eye.svg"



const ShowPasswordInput = ({className, ...props}) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={className}>
            <input
               className='password-input'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"z
            />
            <button className='password-btn' onClick={toggleShowPassword}>
            <img src={showPassword ? Hide : Show} alt="" />
            </button>
        </div>
    );
};

export default ShowPasswordInput;
