import React, { useState } from 'react';
import './Membership.css';

const Membershippage = () => {
    const [view, setView] = useState('subscription');

    return (
        <div className="create-container" style={{ minHeight: '37rem' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#3D3362' }}>Membership</h2>
            <div className="py-4" style={{ display: 'flex', gap: '14px' }}>
                <button className={`history-btn ${view === 'subscription' ? 'active' : ''}`} onClick={() => setView('subscription')}>Active Subscription</button>
                <button className={`history-btn ${view === 'billing' ? 'active' : ''}`} onClick={() => setView('billing')}>Billing History</button>
            </div>
            {view === 'subscription' ? (
                <div className="membership-plan-container">
                    <div className="basic-plan-details">
                        <div>
                            <h4>Basic Plan</h4>
                            <h5>SR25 / Month</h5>
                        </div>
                        <div className="d-flex" style={{ gap: '32px' }}>
                            <div>
                                <h1>Purchased Date</h1>
                                <h2>12 Aug 2025</h2>
                            </div>
                            <div>
                                <h1>Next Billing Date</h1>
                                <h2>15 Sep 2025</h2>
                            </div>
                        </div>
                    </div>
                    <div className="basic-plan-details pt-4">
                        <ul>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                        </ul>
                        <div>
                            <button className="mr-3">Cancel Subscription</button>
                            <button>Upgrade Plan</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="billing-history-container">
                   <table className='w-100'>
                    <thead>
                        <tr>
                            <th>Plan</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Download Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>basic plan</td>
                            <td>12/12/2002</td>
                            <td>rs 5155</td>
                            <td>logo download</td>
                        </tr>
                        <tr>
                            <td>basic plan</td>
                            <td>12/12/2002</td>
                            <td>rs 5155</td>
                            <td>logo download</td>
                        </tr>
                        <tr>
                            <td>basic plan</td>
                            <td>12/12/2002</td>
                            <td>rs 5155</td>
                            <td>logo download</td>
                        </tr>
                    </tbody>
                   </table>
                </div>
            )}
        </div>
    );
}

export default Membershippage;
