import React from 'react'
import Areagraph from '../Common/Areagraph';
import "./Report.css"
import Bargraph from '../Common/Bargraph';
import Singlebar from '../Common/Singlebar';
const Report = () => {


    return(
<div className="">
<div className="report-header">
            <h2>Report</h2>
            </div>
            <div className="create-container col-12 my-4">
               
                    <div className="d-flex justify-content-between">
                        <h5>Sales Overview</h5>
                        <div className="overview-right">
                            <h6>date</h6>
                            <button>Export</button>
                           
                        </div>
                       
                    </div>
                   <div className=""> <Areagraph/></div>
                </div>
                <div className="row my-4" style={{gap: '24px'}}>
                <div className="create-container col">
                <Singlebar/>
                </div>
                <div className="create-container col " style={{height: '330px'}}>
                <div className="d-flex justify-content-between">
                        <h5>Sales Overview</h5>
                        <div className="overview-right">
                            <h6>date</h6>
                            <button>Export</button>
                           
                        </div>
                       
                    </div>
                    <Bargraph />
                </div>
                </div>
</div>
       
    )
}

export default Report;