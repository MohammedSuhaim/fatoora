import React from 'react'
import Header from "../Modules/Header/Header"
import Sidebar from '../Modules/Sidebar/Sidebar'

export default function PrivateRoutes ({children}) {

    return(
        <div className="">
            <Sidebar/>
            <div className="right-content">
                <Header/>
                <div className="children p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}