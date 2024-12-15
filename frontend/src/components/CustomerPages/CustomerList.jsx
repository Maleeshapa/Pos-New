import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import config from '../../config';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCus, setSelectedCus] = useState(null);

  // Update column headers to match the new database structure
  const columns = ['#', 'Customer Name', 'Customer Code', 'Customer Address', 'Customer Phone', 'Customer Job', 'Customer Office'];

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/customers`);
      if (!response.ok) {
        setError('Failed to fetch Customer list');
        return;
      }
      const customers = await response.json();

      // Format the data to match the table structure
      const formattedData = customers.map(cus => [
        cus.cusId,
        cus.cusName,
        cus.cusCode,
        cus.cusAddress,
        cus.cusPhone,
        cus.cusJob,
        cus.cusOffice,
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Customer?");
    if (confirmDelete) {
      try {
        const cusId = data[rowIndex][0];
        const response = await fetch(`${config.BASE_URL}/customer/${cusId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete customer');
        }

        setData(prevData => prevData.filter((_, index) => index !== rowIndex));
        fetchCustomer();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (rowIndex) => {
    const selectedCusData = data[rowIndex];
    setSelectedCus({
      cusName: selectedCusData[0],
      cusJob: selectedCusData[1],
      cusOffice: selectedCusData[2],
      cusAddress: selectedCusData[3],
    });
    setModalIsOpen(true);
  };

  const openModal = () => {
    setSelectedCus(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchCustomer();
  };

  const title = 'Customer List';
  const invoice = 'customer_list.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Customer List</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            showButton={true}
            btnName={"Add New Customer"}
            onAdd={openModal}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showDate={false}
            title={title}
            invoice={invoice}
          />
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Customer Form"
        >
          <Form
            closeModal={closeModal}
            onSave={fetchCustomer}
            cus={selectedCus}
            style={{
              content: {
                width: '30%',
                height: '90%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CustomerList;
