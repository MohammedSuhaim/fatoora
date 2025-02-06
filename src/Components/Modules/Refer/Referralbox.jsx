// ReferralBox.js
import React from 'react';
import copyicon from "../../../Assets/Images/copy icon.svg"
import "./Refer.css"


const copyText = () => {
    const textToCopy = document.getElementById('textToCopy').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};



const ReferralBox = ({ referralId }) => {
    return (
        <div className="referral-box  d-flex justify-content-between">
            <h6 id="textToCopy" >{referralId}</h6>
               <button onClick={copyText} ><img src={copyicon} alt="" /></button>
        </div>
    );
};

export default ReferralBox;
