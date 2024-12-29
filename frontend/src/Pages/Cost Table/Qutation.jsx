import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

function Qutation() {
  const [costings, setCostings] = useState([]); // Store the fetched data
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows

  // Fetch data from the backend
  useEffect(() => {
    axios.get(`${config.BASE_URL}/costings`)
      .then(response => {
        setCostings(response.data);
      })
      .catch(error => {
        console.error('Error fetching costings:', error);
      });
  }, []);

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mt-5 container-fluid">
      <h1>Costing Data</h1>
      <table className="table table-bordered table-dark  table-striped ">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Total Amount</th>
            <th>Total Profit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {costings.map(header => (
            <React.Fragment key={header.id}>
              {/* Costing Header Row */}
              <tr>
                <td>{header.id}</td>
                <td>${header.total_amount}</td>
                <td>${header.total_profit}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => toggleRow(header.id)}
                  >
                    {expandedRows[header.id] ? 'Collapse' : 'Expand'}
                  </button>
                </td>
              </tr>
              {/* Costing Details (Visible when expanded) */}
              {expandedRows[header.id] && (
                <tr>
                  <td colSpan="4">
                    <table className="table table-sm table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Description Customer</th>
                          <th>Product Code</th>
                          <th>Warranty</th>
                          <th>Supplier</th>
                          <th>Unit Cost</th>
                          <th>Our Margin %</th>
                          <th>Our Margin Value</th>
                          <th>Price Plus Margin</th>
                          <th>Selling Rate</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Discount %</th>
                          <th>Discount Value</th>
                          <th>Discounted Price</th>
                          <th>Amount</th>
                          <th>Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {header.CostingDetails.map(detail => (
                          <tr key={detail.id}>
                            <td>{detail.id}</td>
                            <td>{detail.description_customer}</td>
                            <td>{detail.product_code}</td>
                            <td>{detail.warranty}</td>
                            <td>{detail.supplier}</td>
                            <td>${detail.unit_cost}</td>
                            <td>{detail.our_margin_percentage}%</td>
                            <td>${detail.our_margin_value}</td>
                            <td>${detail.price_plus_margin}</td>
                            <td>${detail.selling_rate}</td>
                            <td>{detail.qty}</td>
                            <td>${detail.unit_price}</td>
                            <td>{detail.discount_percentage}%</td>
                            <td>${detail.discount_value}</td>
                            <td>${detail.discounted_price}</td>
                            <td>${detail.amount}</td>
                            <td>${detail.profit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Qutation;
