import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectInvoice.css';
import one from '../../assets/1.jpg';
import two from '../../assets/2.jpg';
import three from '../../assets/3.jpg';

const SelectInvoice = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Define meaningful IDs for navigation
  const invoices = [
    { path: 'colkan', image: one },
    { path: 'haman', image: two },
    { path: 'terra', image: three },
  ];

  const handleSelect = (path, index) => {
    setSelected(index);
    navigate(`/selected/${path}`);
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Select Invoice</h4>
        <div className="image-box-container">
          {invoices.map((invoice, index) => (
            <div
              key={invoice.path}
              className={`image-box ${selected === index ? 'selected' : ''}`}
              onClick={() => handleSelect(invoice.path, index)}
            >
              <img src={invoice.image} alt={`Invoice ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectInvoice;
