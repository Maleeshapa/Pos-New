import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import config from '../../config';
import StockPaymentModel from '../../Models/StockPayment/StockPaymentModel';

function SupplierPayments() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStockPay, setSelectedStockPay] = useState(null);

  const columns = ['#', 'Supplier Name', 'Cheque Amount', 'Cash Amount', 'Total Quantity', 'Vat %', 'Total Amount', 'Due Amount'];
  const btnName = ['Add Product'];

  useEffect(() => {
    fetchStockPaymentsList();
  }, []);

  const fetchStockPaymentsList = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stockPayments`);
      if (!response.ok) {
        throw new Error(`Failed to fetch supplier payments list: ${response.status} ${response.statusText}`);
      }
      const stockPay = await response.json();
      const formattedData = stockPay.map(stockPay => [
        stockPay.stockPaymentId || '-',
        stockPay.supplier?.supplierName || '-',
        stockPay.chequeAmount || '-',
        stockPay.cashAmount || '-',
        stockPay.stockQty || '-',
        stockPay.vat || '-',
        stockPay.total || '-',
        stockPay.due || '-',
      ]);
      setData(formattedData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddStockPay = () => {
    setSelectedStockPay(null);
    setShowEditModal(true);
  };

  const handleEditClick = (rowIndex) => {
    const selectedStockPayData = data[rowIndex];
    setSelectedStockPay({
      stockPaymentId: selectedStockPayData[0],
      supplierName: selectedStockPayData[1],
      chequeAmount: selectedStockPayData[2],
      cashAmount: selectedStockPayData[3],
      stockQty: selectedStockPayData[4],
      vat: selectedStockPayData[5],
      total: selectedStockPayData[6],
      due: selectedStockPayData[7],
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const title = 'Supplier Payment Details';
  const invoice = 'Supplier Payment Details.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>{title}</h4>
        <Table
          search="Search by Supplier Name"
          data={data}
          onAdd={handleAddStockPay}
          btnName={btnName}
          columns={columns}
          showButton={false}
          showDate={false}
          title={title}
          invoice={invoice}
          showActions={true}
          showDelete={false}
          onEdit={handleEditClick}
        />
        <StockPaymentModel
          showModal={showEditModal}
          closeModal={handleCloseModal}
          onSave={fetchStockPaymentsList}
          stockPayment={selectedStockPay}
        />
      </div>
    </div>
  );
}

export default SupplierPayments;
