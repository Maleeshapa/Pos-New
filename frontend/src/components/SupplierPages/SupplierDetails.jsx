import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import config from '../../config';
import SupplierForm from '../../Models/SupplierForm/SupplierForm';
import ConfirmModal from '../../Models/ConfirmModal';

function SupplierDetails() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSup, setSelectedSup] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const columns = ['#', 'Supplier Name', 'Supplier Address', 'NIC', 'Email', 'Contact 1', 'Contact 2', 'Status'];
  const btnName = ' + New Supplier ';

  useEffect(() => {
    fetchSuppliers();
  });

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/suppliers`);
      if (!response.ok) {
        setError('Failed to fetch supplier list');
        return;
      }
      const supplier = await response.json();
      const formattedData = supplier.map(supplier => [
        supplier.supplierId,
        supplier.supplierName,
        supplier.supplierAddress,
        supplier.supplierNic,
        supplier.supplierEmail,
        supplier.supplierTP,
        supplier.supplierSecondTP,
        <select
          className="form-control"
          value={supplier.supplierStatus}
          onChange={(e) => handleStatusChange(supplier.supplierId, e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (supplierId, newStatus) => {
    try {
      const response = await fetch(`${config.BASE_URL}/supplier/${supplierId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supplierStatus: newStatus }),
      });

      if (!response.ok) {
        setError('Failed to update supplier status');
      }
      fetchSuppliers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (rowIndex) => {
    const SupplierData = data[rowIndex];
    setSelectedSup({
      supplierId: SupplierData[0],
      supplierName: SupplierData[1],
      supplierAddress: SupplierData[2],
      supplierNic: SupplierData[3],
      supplierEmail: SupplierData[4],
      supplierTP: SupplierData[5],
      supplierSecondTP: SupplierData[6],
      supplierPaid: SupplierData[7],
      supplierBalance: SupplierData[8],
      supplierPaymentDate: SupplierData[9],
    });
    setShowModal(true);
  };

  const openDeleteConfirmModal = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    setShowConfirmModal(false);
    try {
      const supplierId = data[selectedRowIndex][0];
      const response = await fetch(`${config.BASE_URL}/supplier/${supplierId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Supplier is used for creating stock');
      } else {
        fetchSuppliers();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const title = 'Supplier Details';
  const invoice = 'Supplier Details.pdf';

  const openModal = () => {
    setSelectedSup(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Supplier Details</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p></p>
        )}
        <Table
          search={'Search by Supplier Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          onAdd={openModal}
          onEdit={handleEdit}
          onDelete={openDeleteConfirmModal}
          title={title}
          invoice={invoice}
          showDate={false}
        />

        <SupplierForm
          showModal={showModal}
          closeModal={closeModal}
          onSave={fetchSuppliers}
          supplier={selectedSup}
        />

        {showConfirmModal && (
          <ConfirmModal
            onConfirm={handleDelete}
            onClose={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default SupplierDetails;
