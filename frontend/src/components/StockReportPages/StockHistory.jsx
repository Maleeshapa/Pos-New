import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import config from '../../config';

function StockHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const columns = ['#', 'Stock Name', 'Stock Supplied Date', 'Product Name', 'M Date', 'Exp Date', 'Price per Item', 'Supplied Quantity', 'Total stock price before vat', 'Vat', 'Stock Price + VAT', 'Paid', 'Due', 'Description'];

  useEffect(() => {
    fetchStock();
  });

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stockHistory`);
      if (!response.ok) {
        setError('Failed to fetch stock History');
      }
      const stock = await response.json();

      const formattedData = stock.map(stock => {

        const stockDate = new Date(stock.stock?.stockDate);
        // Format dates to "YYYY-MM-DD HH:mm"
        const formattedStockDate = `${stockDate.getFullYear()}-${String(stockDate.getMonth() + 1).padStart(2, '0')}-${String(stockDate.getDate()).padStart(2, '0')} ${String(stockDate.getHours()).padStart(2, '0')}:${String(stockDate.getMinutes()).padStart(2, '0')}`;

        return [
          stock.stockHistoryId,
          stock.stock?.stockName,
          formattedStockDate,
          stock.product?.productName || "Unknown",
          stock.stock?.mfd,
          stock.stock?.exp,
          stock.product?.productBuyingPrice,
          stock.stockHistoryQty,
          stock.stock?.stockPrice || "-",
          stock.stock?.vat || "-",
          stock.stock?.total || "-",
          stock.stock?.cashAmount || stock.stock?.chequeAmount || '-',
          stock.stock?.due || '-',
          stock.stock.stockDescription || '-',
        ];
      });
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const title = 'Stock History';
  const invoice = 'Stock History.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Stock History</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            search={'Search by Product Name'}
            data={data}
            showActions={false}
            columns={columns}
            title={title}
            showButton={false}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default StockHistory;