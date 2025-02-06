import React from 'react'
import Header from '../Modules/Header/Header'
import Headerlogin from '../Modules/Header/HeaderLogin'
import "./Routes.css"



export default function PublicRoutes ({children}) {

    return(
        <div className="publicroutes">
            <Headerlogin/>
            {children}
        </div>
    )
}