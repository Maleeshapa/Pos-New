import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreditNote.css'; // You can create your own styles for the Credit Note page

const CreditNote = () => {
  const { id } = useParams();  // Extract the 'id' parameter from the URL
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Example items you might display in your CreditNote page
  const creditItems = [
    { path: 'colkan', Name: 'Colkan' },
    { path: 'haman', Name: 'Haman' },
    { path: 'terra', Name: 'Terra' },
  ];

  const handleSelect = (path, index) => {
    setSelected(index);
    navigate(`/CreditNote/${path}/${id}`);  // Navigate to a new path with the CreditNote id and selected item path
  };

  return (
    <div>
      {/* <h4>Credit Note for Return Item ID: {id}</h4> */}
      <div className="scrolling-container">
        {/* <h4>Select Credit Item</h4> */}
        <div className="image-box-container">
          {creditItems.map((item, index) => (
            <div 
              key={item.path} 
              className={`image-box ${selected === index ? 'selected' : ''}`} 
              onClick={() => handleSelect(item.path, index)}
            >
              <h3>{item.Name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditNote;
