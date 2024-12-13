import React, { useState } from "react";

const CostingTable = () => {
  const [rows, setRows] = useState([
    {
      description: "500W FLOODLIGHT DAYLIGHT - 01",
      unitCost: 10500,
      marginPercentage: 42,
      discountPercentage: 10,
      qty: 1,
    },
    {
      description: "200W FLOODLIGHT DAYLIGHT - 08",
      unitCost: 4000,
      marginPercentage: 52,
      discountPercentage: 10,
      qty: 8,
    },
    {
      description: "40W B22 DAYLIGHT -02",
      unitCost: 1100,
      marginPercentage: 35,
      discountPercentage: 10,
      qty: 2,
    },
  ]);

  const calculateRow = (row) => {
    const marginValue = (row.unitCost * row.marginPercentage) / 100;
    const sellingRate = row.unitCost + marginValue;
    const discountValue = (sellingRate * row.discountPercentage) / 100;
    const discountedPrice = sellingRate - discountValue;
    const amount = discountedPrice * row.qty;
    const profit = amount - row.unitCost * row.qty;

    return {
      ...row,
      marginValue,
      sellingRate,
      discountValue,
      discountedPrice,
      amount,
      profit,
    };
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value ? parseFloat(value) : 0;
    setRows(updatedRows);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Description</th>
              <th>Unit Cost</th>
              <th>Margin %</th>
              <th>Margin Value</th>
              <th>Selling Rate</th>
              <th>Discount %</th>
              <th>Discount Value</th>
              <th>Discounted Price</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const calculatedRow = calculateRow(row);
              return (
                <tr key={index}>
                  <td>{row.description}</td>
                  <td>
                    <input
                      type="number"
                      value={row.unitCost}
                      className="form-control"
                      onChange={(e) =>
                        handleInputChange(index, "unitCost", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.marginPercentage}
                      className="form-control"
                      onChange={(e) =>
                        handleInputChange(index, "marginPercentage", e.target.value)
                      }
                    />
                  </td>
                  <td>{calculatedRow.marginValue.toFixed(2)}</td>
                  <td>{calculatedRow.sellingRate.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={row.discountPercentage}
                      className="form-control"
                      onChange={(e) =>
                        handleInputChange(index, "discountPercentage", e.target.value)
                      }
                    />
                  </td>
                  <td>{calculatedRow.discountValue.toFixed(2)}</td>
                  <td>{calculatedRow.discountedPrice.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={row.qty}
                      className="form-control"
                      onChange={(e) =>
                        handleInputChange(index, "qty", e.target.value)
                      }
                    />
                  </td>
                  <td>{calculatedRow.amount.toFixed(2)}</td>
                  <td>{calculatedRow.profit.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CostingTable;
