import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import ConfirmModal from '../../Models/ConfirmModal';
import config from '../../config';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCus, setSelectedCus] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);

  const columns = ['#', 'Customer Code','Customer Name', 'Customer Job', 'Customer Office', 'Customer Address', 'Customer Phone', ];

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

      const formattedData = customers.map(cus => [
        cus.cusId,
        cus.cusCode,
        cus.cusName,
        cus.cusJob,
        cus.cusOffice,
        cus.cusAddress,
        cus.cusPhone,
        
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const cusId = data[deleteRowIndex][0];
      const response = await fetch(`${config.BASE_URL}/customer/${cusId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      setData(prevData => prevData.filter((_, index) => index !== deleteRowIndex));
      fetchCustomer();
    } catch (err) {
      setError(err.message);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const confirmDelete = (rowIndex) => {
    setDeleteRowIndex(rowIndex);
    setShowConfirmModal(true);
  };

  const handleEdit = (rowIndex) => {
    const selectedCusData = data[rowIndex];
    setSelectedCus({
      cusName: selectedCusData[1],
      cusAddress: selectedCusData[3],
      cusPhone: selectedCusData[4],
      cusJob: selectedCusData[5],
      cusOffice: selectedCusData[6],
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
            onDelete={confirmDelete}
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
        {showConfirmModal && (
          <ConfirmModal
            onConfirm={handleDelete}
            onClose={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerList;
