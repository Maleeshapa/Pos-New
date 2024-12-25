import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import config from '../../config';

function SupplierPayments() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['#', 'Supplier Name', 'Cheque Amount', 'Cash Amount', 'Total Quantity', 'Vat %', 'Total Amount', 'Due Amount'];

  useEffect(() => {
    fetchStockPaymentsList();
  });

  const fetchStockPaymentsList = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stockPayments`);
      if (!response.ok) {
        setError(`Failed to fetch supplier payments list: ${response.status} ${response.statusText}`);
      }
      const stockPay = await response.json();
      const formattedData = stockPay.map(stockPay => [
        stockPay.stockPaymentId || '-',
        stockPay.supplier?.supplierName || '-',
        stockPay.chequeAmount !== 0 ? stockPay.chequeAmount : '-',
        stockPay.cashAmount !== 0 ? stockPay.cashAmount : '-',
        stockPay.stockQty !== 0 ? stockPay.stockQty : '-',
        stockPay.vat !== 0 ? stockPay.vat : '-',
        stockPay.total !== 0 ? stockPay.total : '-',
        stockPay.due !== 0 ? stockPay.due : '-',
      ]);

      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(`Error fetching supplier payments list: ${err.message}`);
      setIsLoading(false);
    }
  };

  const title = 'Supplier Payment Details';
  const invoice = 'Supplier Payment Details.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Supplier Payment Details</h4>
        <h4>Product List</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            search={'Search by Supplier Name'}
            data={data}
            columns={columns}
            showButton={false}
            showDate={false}
            title={title}
            invoice={invoice}
            showActions={false}
          />
        )}
      </div>
    </div>
  );
}

export default SupplierPayments;
