// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home'
import PublicRoutes from './PublicRoute';
import PrivateRoutes from './PrivateRoute';
import Dashboard from "../Modules/Dashboard/Dashboard"
import Loginpage from '../PublicModules/Loginpage';
import Homepage from '../HomePage/Homepage';
import Otppage from '../PublicModules/OTPpage';
import Forgotpassword from '../PublicModules/Forgotpassword';
import Createaccount from '../PublicModules/Createaccount';
import Kycpage from '../PublicModules/Kycpage';
import Createinvoice from '../Modules/Invoice/Createinvoice';
import Issuedinvoice from '../Modules/Invoice/Issuedinvoice';
import Invoicedetails from '../Modules/Invoice/Invoicedetails';
import Invoicepdf from '../Modules/Invoice/Invoicepdf';
import Sidebarmini from '../Usersetting/Usersettingsidebar';
import Passwordchange from '../Usersetting/Passwordchange';
import Membershippage from '../Membership/Membership';
import Report from '../Report/Reportpage';
import Numberlogin from '../PublicModules/Numberlogin';
import Numberotppage from '../PublicModules/Numberotp';

// import Homepage from '../../Components/HomePage/Homepage';

function AppRoutes() {
  return (
      <Router basename="/fatoora">
          <div className="app">
        <Routes  >
        <Route path='/' element={<PublicRoutes><Homepage/></PublicRoutes>}></Route>
          <Route path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}></Route>
          <Route path='/loginpage' element= {<PublicRoutes> <Loginpage/> </PublicRoutes>}></Route>
          <Route path='/homepage' element = {<PublicRoutes> <Homepage/></PublicRoutes>}></Route>
          <Route path='/otppage' element= {<PublicRoutes> <Otppage/> </PublicRoutes>}></Route>
          <Route path='/forgotpassword' element= {<PublicRoutes> <Forgotpassword/> </PublicRoutes>}></Route>
          <Route path='/createaccount' element= {<PublicRoutes> <Createaccount/> </PublicRoutes>}></Route>
          <Route path='/kycpage' element= {<PublicRoutes> <Kycpage/> </PublicRoutes>}></Route>
          <Route path='/createinvoice' element={<PrivateRoutes><Createinvoice/></PrivateRoutes>}></Route>
          <Route path='/issuedinvoice' element={<PrivateRoutes><Issuedinvoice/></PrivateRoutes>}></Route>
          <Route path='/invoicedetails' element={<PrivateRoutes><Invoicedetails/></PrivateRoutes>}></Route>
          <Route path='/aa' element={<PrivateRoutes><Invoicepdf/></PrivateRoutes>}></Route>
          <Route path='/settings' element={<PrivateRoutes><Sidebarmini/></PrivateRoutes>}></Route>
          <Route path='/passwordchange' element={<PrivateRoutes><Passwordchange/></PrivateRoutes>}></Route>
          <Route path='/membershippage' element={<PrivateRoutes><Membershippage/></PrivateRoutes>}></Route>
          <Route path='/reportpage' element={<PrivateRoutes><Report/></PrivateRoutes>}></Route>
          <Route path='/numberlogin' element= {<PublicRoutes> <Numberlogin/> </PublicRoutes>}></Route>
          <Route path='/numberotppage' element= {<PublicRoutes> <Numberotppage/> </PublicRoutes>}></Route>




          


        </Routes>
        </div>
      </Router>
   
  );
}

export default AppRoutes;
