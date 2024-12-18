import { useEffect, useState } from "react";
import Table from '../Table/Table';
import config from '../../config';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react';

const Credit = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const columns = ["ID", "Invoice No","Type","Customer", 'address',"store", "Date/time", "Transaction Type", "Total Amount","Creadit Pay", "Due", "invoice"];

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  const fetchSalesHistory = async () => {
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
        const transactiondue = creditTransactions.reduce((total, transaction) => total + transaction.due, 0);
        const transactionPrice = creditTransactions.reduce((total, transaction) => total + transaction.price, '');
        const transactionTypes = creditTransactions.map((transaction) => transaction.transactionType).join(', ') || "Unknown";

        return [
          invoice.invoiceId,
          invoice.invoiceNo,
          invoice.status,
          invoice.customer.cusName,
          invoice.customer.cusAddress,
          invoice.store,
          formattedInvoiceDate,
          transactionTypes,
          transactionPrice,
          transactionPaid,
          transactiondue,
          <div>
            <Link to={`/${invoice.store}PF/${invoice.invoiceNo}`}><button className="btn btn-primary">Credit Invoice</button></Link>
            <Link to={`/salesDetails/${invoice.invoiceNo}`}><button className="btn btn-warning"><Eye/></button></Link>
          </div>,
        ];
      }).filter(Boolean);

      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const title = 'Credit';
  const invoice = 'Credit.pdf';

  const handleDelete = async (rowIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this invoice?");
    const invoiceId = data[rowIndex][0];
    if (confirmDelete) {
      try {
        const transactionResponse = await fetch(`${config.BASE_URL}/transactions/invoice/${invoiceId}`, {
          method: 'DELETE',
        });
        if (!transactionResponse.ok) {
          throw new Error('Failed to delete transactions');
        }

        const invoiceProductResponse = await fetch(`${config.BASE_URL}/invoiceProduct/${invoiceId}`, {
          method: 'DELETE',
        });
        if (!invoiceProductResponse.ok) {
          throw new Error('Failed to delete invoice products');
        }

        const invoiceResponse = await fetch(`${config.BASE_URL}/invoice/${invoiceId}`, {
          method: 'DELETE',
        });
        if (!invoiceResponse.ok) {
          throw new Error('Failed to delete the invoice');
        }

        setData((prevData) => prevData.filter(item => item[0] !== rowIndex));
        fetchSalesHistory();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>Credit</h4>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (<p></p>)}
          <Table
            data={data}
            columns={columns}
            title={title}
            invoice={invoice}
            showEdit={false}
            showButton={false}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Credit;
