import React from 'react'
import "./Membership.css"

const Membershippage = () => {

    return(
        <div className="create-container" style={{minHeight: '37rem'}}>
             <h2 style={{padding: '', fontSize: '28', fontWeight: '700', color: '#3D3362'}}>Membership</h2>
             <div className="py-4" style={{display: 'flex', gap: '14px'}}>
                <button className='active-btn'>Active Subscription</button>
                <button className='history-btn'>Billing history</button>
             </div>
             <div className="membership-plan-container">
             <div className="basic-plan-details">
                <div className="">
                    <h4>Basic Plan</h4>
                    <h5>SR25? Month</h5>
                     </div>
                     <div className="d-flex" style={{gap: '32px'}}>
                    <div className="">
                        <h1>Purchased date</h1>
                        <h2>12 Aug 2025</h2>
                    </div>
                    <div className="">
                        <h1>Next billing date</h1>
                        <h2>15 sep 2025</h2>
                    </div>
                </div>
                
            </div>
            <div className="basic-plan-details pt-4">
            <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                    <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                </ul>
                <div className="">
                    <button className='mr-3'>Cancel Subscription</button>
                    <button>Upgrade Plan</button>
                </div>
            </div>
             </div>






        </div>



    )
}

export default Membershippage;