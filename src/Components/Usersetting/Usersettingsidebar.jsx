import React, {useState, useEffect} from "react";
// import "./Sidebar.css";
import Personalsettings from "./Personalsettings";
import "./Settings.css"
import info from "../../Assets/Images/user-01.svg"
import kyc from "../../Assets/Images/ktc.svg"
import pref from "../../Assets/Images/preferance.svg"
import settings from "../../Assets/Images/setting-sidebar.svg"
import Kycpage from "./Kycpage";
import verified from "../../Assets/Images/check-verified-01.svg"

export default function Sidebarmini() {
  const [selectedOption, setSelectedOption] = useState('Home');



  const renderContent = () => {
    switch (selectedOption) {
      case 'Information':
        return <Information />;
      case 'kyc':
        return <Kyc />;
      case 'Preference':
        return <Preference />;
        case 'Settings':
        return <Settings />;
      default:
        return <Information />;
    }
  };

//   trial



  return (

      <div className="user-settings">
        <h2>Settings</h2>
        <div className=" d-flex" style={{gap: '20px' , padding :'45px 0'}}>
        <div className="sidebarmini">
          <a className={`sidebarmini-item ${selectedOption === 'Information' ? 'active' : ''}`} onClick={() => setSelectedOption('Information')}>
            <img src={info} className=""></img>
            <h6>Personal information</h6>
          </a>
          <a className={`sidebarmini-item ${selectedOption === 'kyc' ? 'active' : ''}`} onClick={() => setSelectedOption('kyc')}>
            <img src={kyc} className=""></img>
           <div className="d-flex justify-content-between align-items-center w-100"> 
           <h6>KYC </h6> 
            <div className="d-flex align-items-center" style={{gap: '4px'}}>
              <h6 style={{ color: '#3BCF3B', fontSize: '10px', fontWeight: '700'}}>Verified</h6>
            <img src={verified} height={'10px'} alt="" />
            </div>
            </div> 
          </a>
          <a className={`sidebarmini-item ${selectedOption === 'preference' ? 'active' : ''}`} onClick={() => setSelectedOption('preference')}>
            <img src={pref} className=""></img>
            <h6>Preference</h6>
          </a>
          <a className={`sidebarmini-item ${selectedOption === 'settings' ? 'active' : ''}`} onClick={() => setSelectedOption('settings')}>
            <img src={settings} className=""></img>
            <h6>Settings</h6>
          </a>
        </div>
        <div className="content">
        {renderContent()}
      </div>
      </div>
      </div>
  );
}


const Information = () => (
  <div className=""><Personalsettings/></div>
)



const Kyc = () => (
     <div className=""><Kycpage/></div>

)

const Preference = () => (
  <div className=""></div>
)

const Settings = () => (
  <div className=""></div>
)

