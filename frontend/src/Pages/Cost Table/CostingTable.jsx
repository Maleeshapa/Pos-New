import React, { useState } from 'react';
import { Trash2, Plus, PlusSquare } from 'lucide-react';

const CostingTable = () => {
  const [columns, setColumns] = useState([
    { id: 'customer', title: 'Customer', type: 'text' },
    { id: 'productCode', title: 'Product Code', type: 'text' },
    { id: 'description', title: 'Description', type: 'text' },
    { id: 'warranty', title: 'Warranty', type: 'text' },
    { id: 'supplier', title: 'Supplier', type: 'text' },
    { id: 'unitCost', title: 'Unit Cost', type: 'number' },
    { id: 'marginPercentage', title: 'Margin %', type: 'number' },
    { id: 'marginValue', title: 'Margin Value', type: 'calculated' },
    { id: 'otherMarginPercentage', title: 'Other Margin %', type: 'number' },
    { id: 'otherMarginValue', title: 'Other Margin Value', type: 'calculated' },
    { id: 'pricePlusMargin', title: 'Price + Margin', type: 'calculated' },
    { id: 'sellingRate', title: 'Selling Rate', type: 'calculated' },
    { id: 'roundedSellingRate', title: 'Rounded Selling Rate', type: 'calculated' },
    { id: 'uom', title: 'UOM', type: 'text' },
    { id: 'qty', title: 'Qty', type: 'number' },
    { id: 'discountPercentage', title: 'Discount %', type: 'number' },
    { id: 'discountValue', title: 'Discount Value', type: 'calculated' },
    { id: 'discountedPrice', title: 'Discounted Price', type: 'calculated' },
    { id: 'amount', title: 'Amount', type: 'calculated' },
    { id: 'profit', title: 'Profit', type: 'calculated' }
  ]);

  const [data, setData] = useState([createEmptyRow()]);
  const [activeCell, setActiveCell] = useState({ rowIndex: null, colId: null });
  const [editValue, setEditValue] = useState('');

  function createEmptyRow() {
    return columns.reduce((acc, col) => {
      acc[col.id] = col.type === 'calculated' ? 0 : '';
      return acc;
    }, { id: Date.now() });
  }

  function calculateRow(row) {
    const unitCost = parseFloat(row.unitCost) || 0;
    const marginPercentage = parseFloat(row.marginPercentage) || 0;
    const otherMarginPercentage = parseFloat(row.otherMarginPercentage) || 0;
    const qty = parseFloat(row.qty) || 0;
    const discountPercentage = parseFloat(row.discountPercentage) || 0;

    const marginValue = unitCost * (marginPercentage / 100);
    const otherMarginValue = unitCost * (otherMarginPercentage / 100);
    const pricePlusMargin = unitCost + marginValue + otherMarginValue;
    const sellingRate = pricePlusMargin;
    const roundedSellingRate = Math.round(sellingRate / 10) * 10;
    const discountValue = sellingRate * (discountPercentage / 100);
    const discountedPrice = sellingRate - discountValue;
    const amount = discountedPrice * qty;
    const profit = amount - (unitCost * qty);

    return {
      ...row,
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

  function handleCellClick(rowIndex, colId) {
    const col = columns.find(c => c.id === colId);
    if (col.type !== 'calculated') {
      setActiveCell({ rowIndex, colId });
      setEditValue(data[rowIndex][colId]);
    }
  }

  function handleCellChange(e) {
    setEditValue(e.target.value);
  }

  function handleCellBlur() {
    if (activeCell.rowIndex !== null) {
      const newData = [...data];
      newData[activeCell.rowIndex] = {
        ...newData[activeCell.rowIndex],
        [activeCell.colId]: editValue
      };
      newData[activeCell.rowIndex] = calculateRow(newData[activeCell.rowIndex]);
      setData(newData);
      setActiveCell({ rowIndex: null, colId: null });
    }
  }

  function addRow() {
    setData([...data, createEmptyRow()]);
  }

  function deleteRow(index) {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  }

  function addColumn() {
    const newColumnId = `column${columns.length + 1}`;
    setColumns([...columns, {
      id: newColumnId,
      title: `Column ${columns.length + 1}`,
      type: 'text'
    }]);
    setData(data.map(row => ({ ...row, [newColumnId]: '' })));
  }

  function deleteColumn(colId) {
    const newColumns = columns.filter(col => col.id !== colId);
    const newData = data.map(row => {
      const newRow = { ...row };
      delete newRow[colId];
      return newRow;
    });
    setColumns(newColumns);
    setData(newData);
  }

  const tableStyles = {
    container: {
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      margin: '1rem'
    },
    buttonContainer: {
      marginBottom: '1rem',
      display: 'flex',
      gap: '0.5rem'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#4F46E5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    deleteButton: {
      padding: '0.25rem',
      backgroundColor: 'transparent',
      color: '#EF4444',
      border: 'none',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.875rem'
    },
    th: {
      padding: '0.75rem 1rem',
      backgroundColor: '#F9FAFB',
      borderBottom: '1px solid #E5E7EB',
      textAlign: 'left',
      fontWeight: '600',
      position: 'relative'
    },
    td: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #E5E7EB'
    },
    input: {
      width: '100%',
      padding: '0.25rem 0.5rem',
      border: '1px solid #E5E7EB',
      borderRadius: '4px'
    }
  };

  return (
    <div style={tableStyles.container}>
      <div style={tableStyles.buttonContainer}>
        <button style={tableStyles.button} onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
        <button style={tableStyles.button} onClick={addColumn}>
          <PlusSquare size={16} /> Add Column
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.id} style={tableStyles.th}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {col.title}
                    {col.type !== 'calculated' && (
                      <button
                        onClick={() => deleteColumn(col.id)}
                        style={tableStyles.deleteButton}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th style={tableStyles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id}>
                {columns.map(col => (
                  <td key={col.id} style={tableStyles.td}>
                    {activeCell.rowIndex === rowIndex && activeCell.colId === col.id ? (
                      <input
                        type={col.type}
                        value={editValue}
                        onChange={handleCellChange}
                        onBlur={handleCellBlur}
                        style={tableStyles.input}
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => handleCellClick(rowIndex, col.id)}
                        style={{ cursor: col.type === 'calculated' ? 'default' : 'text' }}
                      >
                        {col.type === 'calculated' ? 
                          parseFloat(row[col.id]).toFixed(2) : 
                          row[col.id]}
                      </div>
                    )}
                  </td>
                ))}
                <td style={tableStyles.td}>
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    style={tableStyles.deleteButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 

export default CostingTable;
