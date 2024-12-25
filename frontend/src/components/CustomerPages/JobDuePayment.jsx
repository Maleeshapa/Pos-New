import { useEffect, useState } from "react";
import config from '../../config';
import Table from '../Table/Table';
import 'react-datepicker/dist/react-datepicker.css';

const JobDuePayment = () => {
  const columns = ['Invoice Number', 'Customer Code', 'Customer', 'Store', 'Date', 'Total Amount', 'Paid Amount', 'Due Amount'];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order for Due Amount

  useEffect(() => {
    fetchDueCustomer();
  }, []);

  const fetchDueCustomer = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoices`);
      if (!response.ok) {
        setError('Failed to fetch Sales Invoices');
        return;
      }
      const invoices = await response.json();

      const transactionPromises = invoices.map(async (invoice) => {
        const transactionResponse = await fetch(`${config.BASE_URL}/transaction/invoice/${invoice.invoiceId}`);
        if (transactionResponse.ok) {
          return await transactionResponse.json();
        }
        return [];
      });

      const transactionsData = await Promise.all(transactionPromises);

      const formattedData = invoices.map((invoice, index) => {
        const invoiceTransactions = transactionsData[index] || [];
        const creditTransactions = invoiceTransactions.filter(transaction => transaction.transactionType === 'credit');
        if (creditTransactions.length === 0) return null;

        const invoiceDate = new Date(invoice.invoiceDate);
        const formattedInvoiceDate = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}-${String(invoiceDate.getDate()).padStart(2, '0')} ${String(invoiceDate.getHours()).padStart(2, '0')}:${String(invoiceDate.getMinutes()).padStart(2, '0')}`;

        const transactionPaid = creditTransactions.reduce((total, transaction) => total + transaction.paid, 0);
        const transactionDue = creditTransactions.reduce((total, transaction) => total + transaction.due, 0);
        const transactionPrice = creditTransactions.reduce((total, transaction) => total + transaction.price, 0);

        return [
          invoice.invoiceNo,
          invoice.customer.cusCode,
          invoice.customer.cusName,
          invoice.store,
          formattedInvoiceDate,
          transactionPrice,
          transactionPaid,
          transactionDue
        ];
      }).filter(Boolean);

      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const sortDataByDueAmount = () => {
    const sortedData = [...data].sort((a, b) => {
      const dueA = a[7]; // Due Amount column index
      const dueB = b[7];
      return sortOrder === 'asc' ? dueA - dueB : dueB - dueA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  const title = 'Due_customer';
  const invoice = 'Due_customer.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>Due customer</h4>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : null}
          <Table
            data={data}
            columns={columns.map((col, index) => {
              if (col === 'Due Amount') {
                return (
                  <span key={index} onClick={sortDataByDueAmount} style={{ cursor: 'pointer' }}>
                    {col} {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                );
              }
              return col;
            })}
            title={title}
            invoice={invoice}
            showButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDuePayment;
