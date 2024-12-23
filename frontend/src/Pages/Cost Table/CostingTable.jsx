import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const CostingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);

  const columns = [
    { id: 'customer', title: 'Description Customer', type: 'text' },
    { id: 'productCode', title: 'Product Code', type: 'text' },
    { id: 'description', title: 'Description', type: 'text' },
    { id: 'warranty', title: 'Warranty', type: 'text' },
    { id: 'supplier', title: 'Supplier', type: 'text' },
    { id: 'unitCost', title: 'Unit Cost', type: 'number' },
    { id: 'marginPercentage', title: 'Our Margin %', type: 'number' },
    { id: 'marginValue', title: 'Our Margin Value', type: 'calculated' },
    { id: 'otherMarginPercentage', title: 'Other Margin %', type: 'number' },
    { id: 'otherMarginValue', title: 'Other Margin Value', type: 'calculated' },
    { id: 'pricePlusMargin', title: 'Price + Margin', type: 'calculated' },
    { id: 'sellingRate', title: 'Selling Rate Before Discount', type: 'calculated' },
    { id: 'roundedSellingRate', title: 'Rounded to Nearest 10', type: 'calculated' },
    { id: 'uom', title: 'UOM', type: 'text' },
    { id: 'qty', title: 'Qty', type: 'number' },
    { id: 'unitPrice', title: 'Unit Price', type: 'number' },
    { id: 'discountPercentage', title: 'Discount %', type: 'number' },
    { id: 'discountValue', title: 'Discount Value', type: 'calculated' },
    { id: 'discountedPrice', title: 'Discounted Price', type: 'calculated' },
    { id: 'amount', title: 'Amount', type: 'calculated' },
    { id: 'profit', title: 'Profit', type: 'calculated' }
  ];



  function calculateValues(values) {
    const unitCost = parseFloat(values.unitCost) || 0;
    const marginPercentage = parseFloat(values.marginPercentage) || 0;
    const otherMarginPercentage = parseFloat(values.otherMarginPercentage) || 0;
    const qty = parseFloat(values.qty) || 0;
    const discountPercentage = parseFloat(values.discountPercentage) || 0;

    const marginValue = unitCost * (marginPercentage / 100);
    const otherMarginValue = unitCost * (otherMarginPercentage / 100);
    const pricePlusMargin = unitCost + marginValue + otherMarginValue;
    const sellingRate = pricePlusMargin;
    const roundedSellingRate = Math.round(sellingRate / 10) * 10;
    const discountValue = roundedSellingRate * (discountPercentage / 100);
    const discountedPrice = roundedSellingRate - discountValue;
    const amount = discountedPrice * qty;
    const profit = amount - (unitCost * qty);

    return {
      ...values,
      marginValue,
      otherMarginValue,
      pricePlusMargin,
      sellingRate,
      roundedSellingRate,
      discountValue,
      discountedPrice,
      amount,
      profit
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(calculateValues(newFormData));
  };

  const handleSubmit = () => {
    setData([...data, { id: Date.now(), ...formData }]);
    setFormData({});
    setShowModal(false);
  };

  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const highlightedColumns = [
    'customer','description', 'supplier', 'unitCost', 'marginPercentage', 'marginValue',
    'otherMarginPercentage', 'otherMarginValue', 'pricePlusMargin',
    'sellingRate', 'roundedSellingRate', 'profit'
  ];

  return (
    <div className="container-fluid p-4">
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        <Plus className="me-2" size={16} /> Add Row
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              {columns.map(col => (
                <th 
                  key={col.id} 
                  className={`text-nowrap ${highlightedColumns.includes(col.id) ? 'table-warning' : ''}`}
                >
                  {col.title}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                {columns.map(col => (
                  <td 
                    key={col.id} 
                    className={`text-nowrap ${highlightedColumns.includes(col.id) ? 'table-warning' : ''}`}
                  >
                    {col.type === 'calculated' ? 
                      parseFloat(row[col.id]).toFixed(2) : 
                      row[col.id]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => deleteRow(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-wrapper">
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title">Add New Row</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-0">
                  <div className="form-container p-4">
                    <div className="row g-3">
                      {columns.map(col => (
                        col.type !== 'calculated' && (
                          <div key={col.id} className="col-md-6">
                            <label className="form-label">{col.title}</label>
                            <input
                              type={col.type}
                              name={col.id}
                              value={formData[col.id] || ''}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>
                        )
                      ))}
                      {columns.map(col => (
                        col.type === 'calculated' && (
                          <div key={col.id} className="col-md-6">
                            <label className="form-label">{col.title}</label>
                            <input
                              type="number"
                              value={formData[col.id] || 0}
                              className="form-control bg-light"
                              readOnly
                            />
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      <style>
        {`
          .modal-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1050;
          }
          
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
          }
          
          .modal {
            z-index: 1055;
          }
          
          .modal-body {
            max-height: calc(100vh - 130px);
            overflow-y: auto;
          }

          .form-container {
            background-color: #f8f9fa;
          }
          
          .table-responsive {
            max-height: calc(100vh - 150px);
            overflow-y: auto;
          }
          
          .table th {
            position: sticky;
            top: 0;
            background: #f8f9fa;
            z-index: 1;
          }
          
          @media (max-width: 768px) {
            .modal-dialog {
              margin: 0.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CostingTable;