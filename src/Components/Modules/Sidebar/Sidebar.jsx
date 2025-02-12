import React, { useState } from "react";
import dashboard from "../../../Assets/Images/Dashboard.svg";
import invoice from "../../../Assets/Images/Invoice.svg";
import membership from "../../../Assets/Images/Membership.svg";
import design from "../../../Assets/Images/Design&theme.svg";
import report from "../../../Assets/Images/Report.svg";
import help from "../../../Assets/Images/help&support.svg";
import logo from "../../../Assets/Images/Fatoora logo.svg";
import logout from "../../../Assets/Images/log-out-01.svg";
import globe from "../../../Assets/Images/globe-01.svg";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/dashboard');
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [masterDropdownOpen, setMasterDropdownOpen] = useState(false);

  const handleClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const isActive = (paths) => {
    return paths.includes(location.pathname);
  };

  const toggleEventDropdown = (no) => {
    if (no === 1) {
      setEventDropdownOpen(!eventDropdownOpen);
      setMasterDropdownOpen(false);
    } else if (no === 2) {
      setMasterDropdownOpen(!masterDropdownOpen);
      setEventDropdownOpen(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarlogo">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <a
            className={`sidebar-item ${activeLink === '/dashboard' ? 'active' : ''}`}
            onClick={() => handleClick('/dashboard')}
          >
            <img src={dashboard} className=""></img>
            <h6>Dashboard</h6>
          </a>

          <div className="">
            <div
              onClick={() => toggleEventDropdown(2)}
              className={`event-link ${activeLink.includes('/event') ? 'active' : ''}`}
              style={{}}
            >
              <a
                className={`sidebar-item ${isActive(['/issuedinvoice', '/another-path']) ? 'active' : ''}`}
                onClick={() => toggleEventDropdown(2)}
                style={{ fontWeight: 'bold' }}
              >
                <img src={globe} alt="" />
                <h6>Invoice</h6>
              </a>
            </div>
            {masterDropdownOpen && (
              <>
                <div className="mt-1" style={{ display: 'flex', flexDirection: 'column', marginLeft: '22%', gap: '4px' }}>
                  <a
                    className={`sidebar-subitem ${activeLink === '/issuedinvoice' ? 'active' : ''}`}
                    onClick={() => handleClick('/issuedinvoice')}
                  >
                    Issued
                  </a>
                  <a
                    className={`sidebar-subitem ${activeLink === '/' ? 'active' : ''}`}
                    onClick={() => handleClick('/')}
                  >
                    Draft
                  </a>
                  <a
                    className={`sidebar-subitem ${activeLink === '/' ? 'active' : ''}`}
                    onClick={() => handleClick('/')}
                  >
                    Approval
                  </a>
                  <a
                    className={`sidebar-subitem ${activeLink === '/' ? 'active' : ''}`}
                    onClick={() => handleClick('/')}
                  >
                    Expertise
                  </a>
                </div>
              </>
            )}
          </div>

          <a
            className={`sidebar-item ${activeLink === '/membershippage' ? 'active' : ''}`}
            onClick={() => handleClick('/membershippage')}
          >
            <img src={membership} className=""></img>
            <h6>Membership</h6>
          </a>
          <a className="sidebar-item">
            <img src={design} className=""></img>
            <h6>Design & Theme</h6>
          </a>
          <a
            className={`sidebar-item ${activeLink === '/reportpage' ? 'active' : ''}`}
            onClick={() => handleClick('/reportpage')}
          >
            <img src={report} className=""></img>
            <h6>Report</h6>
          </a>
          <a className="sidebar-item">
            <img src={help} className=""></img>
            <h6>Help & Support</h6>
          </a>
        </div>
        <div className="sidebar-logout">
          <div className="dropdown sidebar-dropdown">
            <button
              className="btn dropdown-toggle d-flex align-items-center p-0"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={globe} alt="" />
              <h6>Language</h6>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
          <a href="" className="logout sidebar-item">
            <img src={logout} alt="" className="" />
            <h6>Logout</h6>
          </a>
        </div>
      </div>
    </div>
  );
}
