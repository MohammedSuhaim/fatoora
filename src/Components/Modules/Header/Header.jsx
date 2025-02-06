import React , { useEffect, useState} from "react";
import search from "../../../Assets/Images/search-md.svg"
import notification from "../../../Assets/Images/Notification.svg"
import hlogo from "../../../Assets/Images/header-img.svg"
import "./Header.css"
import logo from "../../../Assets/Images/Fatoora logo.svg"
import { useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function Headerpage({islogedin,setisLogedin}){
    
    return(
        <Navbar className="navbar" expand="lg">
        <Form inline style={{flex: "0 0 65%"}}>
            <div className="search-container">
                <img src={search} alt="" />
            <FormControl  type="search" placeholder="Search anything" className="mr-sm-2 search-box" />
            </div>
            {/* <Button variant="outline-success">Search</Button> */}
        </Form>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse   style={{justifyContent: 'right'}} id="basic-navbar-nav">
        <Nav className="">
            <Nav.Link href="#link"> <img src={notification} alt="" /></Nav.Link>
            <div className="d-flex">
                <img src={hlogo} alt="" />
            <NavDropdown title={
                               <span><h5>Toxic Caffine</h5><h6>admin@gmail.com</h6></span>
                               } 
                id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something else</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </div>
        </Nav>
        
    </Navbar.Collapse>
</Navbar>
    )
}




const Header = () => {
    const [islogedin, setisLogedin] = useState(false);
    return(
        <div className="">
            <Headerpage/>
           {/* { !islogedin ? <Headerpage islogedin={islogedin} setisLogedin={setisLogedin}/> :<Headerlogin islogedin={islogedin} setisLogedin={setisLogedin}/>} */}
        </div>
    )
}

export default Header ;

