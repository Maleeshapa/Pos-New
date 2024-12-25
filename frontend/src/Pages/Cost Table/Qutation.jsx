import React from 'react';

function Qutation() {
  const columns = [
    'Qutation No',
    'Customer Name',
    'Customer Office',
    'Customer Address',
    'Date',
    'Item Picture',
    'Product Code',
    'Description',
    'Warranty',
    'Unit Price',
    'Qty',
    'Discount',
    'Discounted',
    'Amount',
  ];

  return (
    <div className='mt-5 container-fluid'>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Add rows dynamically here */}
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Qutation;
