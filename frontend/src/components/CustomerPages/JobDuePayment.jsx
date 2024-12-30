import { useEffect, useState } from "react";
import config from '../../config';
import Table from '../Table/Table';
import DueModal from './DueModal';
import 'react-datepicker/dist/react-datepicker.css';
import { Eye } from "lucide-react";

const JobDuePayment = () => {
  const columns = ['Customer Code', 'Customer', 'Total Amount', 'Paid Amount', 'Due Amount', 'Show Due Transactions'];
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        const transactionPaid = creditTransactions.reduce((total, transaction) => total + transaction.paid, 0);
        const transactionDue = creditTransactions.reduce((total, transaction) => total + transaction.due, 0);
        const transactionPrice = creditTransactions.reduce((total, transaction) => total + transaction.price, 0);

        return {
          invoiceId: invoice.invoiceId,
          invoiceNo: invoice.invoiceNo,
          customerCode: invoice.customer.cusCode,
          customerName: invoice.customer.cusName,
          store: invoice.store,
          date: invoice.invoiceDate,
          totalAmount: transactionPrice,
          paidAmount: transactionPaid,
          dueAmount: transactionDue,
        };
      }).filter(Boolean);

      setData(formattedData);
      updateGroupedData(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroupedData = (currentData) => {
    const grouped = currentData.reduce((acc, item) => {
      const existing = acc.find(row => row.customerCode === item.customerCode);
      if (existing) {
        existing.totalAmount += Number(item.totalAmount);  
        existing.paidAmount += Number(item.paidAmount);  
        existing.dueAmount += Number(item.dueAmount);  
      } else {
        acc.push({ 
          ...item, 
          totalAmount: Number(item.totalAmount), 
          paidAmount: Number(item.paidAmount), 
          dueAmount: Number(item.dueAmount) 
        });
      }
      return acc;
    }, []);
    setGroupedData(grouped);
  };
  

  const handleViewDetails = (customerCode) => {
    const customerData = data.filter(item => item.customerCode === customerCode);
    setSelectedCustomer(customerData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
    fetchDueCustomer(); 
  };

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>Due Customer</h4>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : null}
          <Table
            data={groupedData.map(row => [
              row.customerCode,
              row.customerName,
              row.totalAmount,
              row.paidAmount,
              row.dueAmount,
              <button
                className="btn btn-primary"
                onClick={() => handleViewDetails(row.customerCode)}
              >
                <Eye />
              </button>
            ])}
            columns={columns}
            showButton={false}
            showActions={false}
          />
        </div>
      </div>

      {selectedCustomer && (
        <DueModal
          customerData={selectedCustomer}
          onClose={handleCloseModal}
          showModal={isModalOpen}
        />
      )}
    </div>
  );
};

export default JobDuePayment;