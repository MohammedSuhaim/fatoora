import React, { useState } from 'react'
import "./Dashboard.css"
import plus from "../../../Assets/Images/plus (1).svg"
import list from "../../../Assets/Images/list.svg"
import salevat from "../../../Assets/Images/total sale.svg"
import vat from "../../../Assets/Images/vat.svg"
import Bargraph from '../../Common/Bargraph'
import settings from "../../../Assets/Images/settings-01.svg"
import shop from "../../../Assets/Images/shop.svg"
import rightarrow from "../../../Assets/Images/rightarrow.svg"
import plusblack from "../../../Assets/Images/plus  black.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import refer from "../../../Assets/Images/refer icon.svg"
import ReferralBox from '../../Modules/Refer/Referralbox'
import { Socialmedia } from '../../PublicModules/Loginpage'
import { useNavigate } from 'react-router-dom';

const Dashboard =(args) => {
const [modal, setModal] = useState(false);
const referralId = '6446464';
  const toggle = () => setModal(!modal);
        
  const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createinvoice'); // Navigate to the OtherPage component
    };


    return(
        <div className="dashboard">
              <div className="dashboard-header">
                <h4>My Dashboard</h4>
                <button onClick={handleClick}   className='dashboard-create-btn'>
                    <img src={plus} alt="" />
                    <h6>Create Invoice</h6>
                </button>
              </div>
              <div className="dashboard-container">
                <div className="dashboard-item1">
                    <h6 className='pb-4' style={{fontSize: '14px', fontWeight: '600', fontFamily: 'nunito'}}>Total invoice generated</h6>
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <h2 style={{fontSize: '36px', fontWeight: '500', fontFamily: 'nunito', margin: '0'}}>1838</h2>
                            <h6 style={{fontSize: '12px', fontWeight: '400', fontFamily: 'nunito', margin: '0'}}>48 in last month</h6>
                        </div>
                        <img src={list} alt="" />
                    </div>
                </div>
                <div className="dashboard-item2">
                    <h6 className='pb-4' style={{fontSize: '14px', fontWeight: '600', fontFamily: 'nunito'}}>Total Sale (In SAR)</h6>
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <h2 style={{fontSize: '36px', fontWeight: '500', fontFamily: 'nunito', margin: '0'}}>1200</h2>
                            <h6 style={{fontSize: '12px', fontWeight: '400', fontFamily: 'nunito', margin: '0'}}>48 in last month</h6>
                        </div>
                        <img src={salevat} alt="" />
                    </div>
                </div>
                <div className="dashboard-item3">
                    <h6 className='pb-4' style={{fontSize: '14px', fontWeight: '600', fontFamily: 'nunito'}}>VAT Statistics (In SAR)</h6>
                    <div className="d-flex justify-content-between">
                        {/* <div className="d-flex" style={{}}> */}
                            <div className="">
                            <h2 style={{fontSize: '24px', fontWeight: '500', fontFamily: 'nunito', margin: '0'}}>1200</h2>
                            <h6 style={{fontSize: '12px', fontWeight: '400', fontFamily: 'nunito', margin: '0'}}>Payable VAT</h6>
                            </div>
                            <div className="">
                            <h2 style={{fontSize: '24px', fontWeight: '500', fontFamily: 'nunito', margin: '0'}}>482</h2>
                            <h6 style={{fontSize: '12px', fontWeight: '400', fontFamily: 'nunito', margin: '0'}}>Receivable VAT</h6>
                            </div>
                        {/* </div> */}
                        <img src={vat} alt="" />
                    </div>
                </div>
              </div>

              <div className="dashboard-container-2">
                <div className="revenue-overview mr-2">
              <Bargraph/>
              </div>
              <div className="invoice-left ml-2">
                <div style={{padding: '30px 28px'}}> 
                     <h6 className='pb-4'>Invoices left</h6>
                     <div className="d-flex justify-content-between">
                        <div className="">
                        <h4 style={{fontSize: '28px', fontWeight: '700'}}>1162</h4>
                        <h6 style={{color: '#807CA0', fontWeight: '700', fontSize: '12px'}}>Out of 3000</h6>
                        </div>
                        <button className='top-up-btn'>
                            <img src={plusblack} alt="" />
                            <h6>top-up</h6>
                        </button>
                     </div>
                     </div>
                     <div className="membership-status">
                        <h6 style={{padding: '0 0 48px 0', fontSize: '16px', fontWeight: '700'}}>Active membership</h6>
                        <div className="">
                            <h4 style={{fontWeight: '700', fontSize: '28px'}}>Basic plan</h4>
                            <h6 style={{fontSize: '12px'}}>Valid till : 25th march 2025</h6>
                        </div>
                     </div>
              </div>
              </div>
              <div className="dashboard-container-3">
                <div className=" integration pb-5">
                    <div className="d-flex pb-5">
                    <img src={settings} alt="" />
                    <h6>Integration</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                    <h2 style={{fontSize: '20px', fontWeight: '500'}}>Connet Your Online Marketplace</h2>
                    <img src={shop} alt="" />
                </div>
                </div>
                
                <div className="refer">
                   <div className="w-50">
                   <h6 style={{fontSize: '14px', fontWeight: '600', paddingBottom: '16px'}}>Refer & Earn</h6>
                    <h2 style={{fontSize: '28px', fontWeight: '600', paddingBottom: '5px'}}>Up to 2 months membership extension</h2>
                    <h6 style={{fontSize: '12px', fontWeight: '400'}}>Your friend will get 10% off</h6>
                   </div>


                   <div>
      <Button color="" style={{height: 'fit-content', padding: '14px 32px', color: '#9DFF9D', borderRadius: '28px', border: 'none', background: 'black'}} onClick={toggle}>
        Refer a Friend <img src={rightarrow} alt="" />
      </Button>
      <Modal className='modal1' isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader className='' toggle={toggle}></ModalHeader>
        <ModalBody>
        <div className="refer-container pt-3">
                    <img src={refer} alt="" />
                    <h5>Refer and Earn</h5>
                    <h6>Refer a friend and get 200 invoices for free. Your friend will get 50 invoices.</h6>
                </div>
                <div className="refferal-container w-100 pt-4">
                    <h6 className='pb-2'>Your Referral link</h6>
                    <ReferralBox referralId={referralId}/>
                    <div className="or-span py-3" >
                                <span style={{border: '1px solid #8C7CC9'}}></span>
                                <h6 style={{color: '#8C7CC9' , border: '1px solid #8C7CC9'}}>OR</h6>
                                <span style={{border: '1px solid #8C7CC9'}}></span>
                              </div>
                              <Socialmedia  bgColor="transparent" bgColor1='white' />

                </div>
        </ModalBody>
        
      </Modal>
    </div>
                  
                </div>
              </div>

















        </div>
    )
}


export default Dashboard;