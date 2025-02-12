import React from 'react'
import "./Header.css"
import logo from "../../../Assets/Images/Fatoora logo.svg"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';






function Headerlogin({islogedin,setisLogedin}){
    const navigate = useNavigate();
    
    const handleClick = () =>{
        navigate('/createaccount')
    }   
    const onClick = () =>{
        navigate('/loginpage')
    }   

    return(
       

        

<Navbar  expand="lg">
            <Navbar.Brand href="/fatoora"><img src={logo} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse style={{justifyContent: 'end'}} id="basic-navbar-nav">
                <Nav className="">
                    <Nav.Link >Home</Nav.Link>
                    <Nav.Link >Pricing</Nav.Link>
                    <Nav.Link >Features</Nav.Link>
                    <Nav.Link >FAQ's</Nav.Link>
                    <Nav.Link >Contact Us</Nav.Link>
                    <Nav.Link onClick={handleClick}>Signup</Nav.Link>
                    <Nav.Link onClick={onClick}>SignIn</Nav.Link>
                       
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Headerlogin ;
