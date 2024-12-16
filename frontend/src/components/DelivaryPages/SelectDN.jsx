import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectDN = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Define meaningful IDs for navigation
  const invoices = [
    { path: 'colkanDN', Name: 'ColkanDN' },
    { path: 'hamanDN', Name: 'HamanDN' },
    { path: 'terraDN', Name: 'TerraDN' },
  ];

  const handleSelect = (path, index) => {
    setSelected(index);
    navigate(`/${path}`);
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Select Delivery Invoice</h4>
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

export default SelectDN;
