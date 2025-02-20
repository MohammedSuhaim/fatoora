import React from "react";
import search from "../../../Assets/Images/search-md.svg";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dot from "../../../Assets/Images/dots-vertical.svg"
import mail from "../../../Assets/Images/mail-01.svg"
import prev from "../../../Assets/Images/share-03.svg"
import whatsapp from "../../../Assets/Images/whatsapp.svg"
import filter from "../../../Assets/Images/filterimg.svg"
const data = [
    {
      invoiceno: 1,
      customer: 24571,
      customerno: 0,
      email: 14524,
    date: 18,
      invoicetotal: 5412,
    },
    {
        invoiceno: 1,
        customer: 24571,
        customerno: 0,
        email: 14524,
      date: 18,
        invoicetotal: 5412,
      },
      {
        invoiceno: 1,
        customer: 24571,
        customerno: 0,
        email: 14524,
      date: 18,
        invoicetotal: 5412,
      },
      {
        invoiceno: 1,
        customer: 24571,
        customerno: 0,
        email: 14524,
      date: 18,
     invoicetotal: 5412,
      },
  ];

  


  const Issuedinvoice = () => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/createinvoice');
    };
  
    return (
      <div className="">
        <div className="create-container">
          <div className="issued-header pb-4">
            <h5>Issued Invoice</h5>
            <button onClick={handleClick}>+ Create Invoice</button>
          </div>
          <div className="issue-search-container">
            <div className="search-container" style={{ flex: '0 0 70%', padding: '2px 15px' }}>
              <img src={search} alt="" />
              <FormControl
                type="search"
                placeholder="Search anything"
                className="mr-sm-2 search-box"
              />
            </div>
            <div className="dropdown issued-category">
              <button
                className="btn dropdown-toggle category-btn"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </div>
            </div>
            <div className="filter-container">
              <button className="filter-btn">
                <img src={filter} alt="" />
                filter
              </button>
              <div className="filter-menu">
                {/* filter content here */}
              </div>
            </div>
          </div>
          <div className="py-5">
            <table className="w-100 issue-table">
              <thead>
                <tr>
                  <th>Invoice no</th>
                  <th>Customer</th>
                  <th>Customer no</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Invoice total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.map((i, index) => (
                  <tr key={index}>
                    <td style={{ width: '5%' }}>{i.invoiceno}</td>
                    <td>{i.customer}</td>
                    <td>{i.customerno}</td>
                    <td>{i.email}</td>
                    <td>{i.date}</td>
                    <td>{i.invoicetotal}</td>
                    <td style={{ width: '5%' }}>
                      <div className="dropdown p-1">
                        <button
                          className="btn dropdown w-100 d-flex justify-content-between align-items-center"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="false"
                          aria-expanded="false"
                        >
                          <img src={dot} alt="" />
                        </button>
                        <div
                          className="dropdown-menu issue-table-menu"
                          style={{
                            transform: 'translate3d(0px, -109px, 0px)',
                            width: '100%',
                          }}
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item table-btn" href="#">
                            <img src={mail} alt="" />
                            <h6>Send Email</h6>
                          </a>
                          <a className="dropdown-item table-btn" href="#">
                            <img src={prev} alt="" />
                            <h6>Preview</h6>
                          </a>
                          <a className="dropdown-item table-btn" href="#">
                            <img src={whatsapp} alt="" />
                            <h6>Whatsapp</h6>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default Issuedinvoice;
  