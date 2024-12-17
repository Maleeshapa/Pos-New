import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectInvoice.css';
import { useParams } from 'react-router-dom';

const SelectInvoice = () => {
  const {invoiceNo}=useParams();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Define meaningful IDs for navigation
  const invoices = [
    { path: 'colkan', Name: 'Colkan' },
    { path: 'haman', Name: 'Haman' },
    { path: 'terra', Name: 'Terra' },
  ];

  const handleSelect = (path, index) => {
    setSelected(index);
    navigate(`/${path}/${invoiceNo}`);
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Select Invoice</h4>
        <div className="image-box-container">
          {invoices.map((invoice, index) => (
            <div key={invoice.path} className={`image-box ${selected === index ? 'selected' : ''}`} onClick={() => handleSelect(invoice.path, index)}>
              <h3>{invoice.Name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectInvoice;
