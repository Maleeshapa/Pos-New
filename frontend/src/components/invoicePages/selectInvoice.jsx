import React, { useEffect, useState } from 'react';
import config from '../../config';
import { useNavigate, useParams } from 'react-router';

const SelectInvoice = () => {
  const { store, invoiceNo } = useParams();
  const [colkan, setColkan] = useState(false)
  const [haman, setHaman] = useState(false)
  const [terra, setTerra] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNo: '',
    invoiceDate: '',
    PurchaseOrder: '',
    cusName: '',
    cusJob: '',
    cusOffice: '',
    cusAddress: '',
    delivaryNo: ''
  });
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [Transaction, setTransaction] = useState([]);
  const [ShowRemove, setShowRemove] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (invoiceNo) {
      fetchInvoiceData(invoiceNo);
    }
  }, [invoiceNo]);


  useEffect(() => {
    generateDeliveryNo();
  }, [invoiceProducts]);

  const fetchInvoiceData = async (invoiceNo) => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoice/invoiceNo/${invoiceNo}`);
      if (response.ok) {
        const invoiceData = await response.json();

        setFormData({
          invoiceNo: invoiceData.invoiceNo,
          invoiceDate: new Date(invoiceData.invoiceDate).toISOString().slice(0, 16),
          cusName: invoiceData.customer.cusName,
          cusJob: invoiceData.customer.cusJob,
          cusAddress: invoiceData.customer.cusAddress,
          cusOffice: invoiceData.customer.cusOffice,
          PurchaseOrder: invoiceData.purchaseNo,
        });

        if (invoiceData.invoiceId) {
          fetchInvoiceProducts(invoiceData.invoiceId);
          fetchTransaction(invoiceData.invoiceId);
        }

        if (store === 'colkan') {
          setColkan(true)
        }
        if (store === 'haman') {
          setHaman(true)
        }
        if (store === 'terra') {
          setTerra(true)
        }
      } else {
        alert('Invoice not found');
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      alert('An error occurred while fetching invoice data');
    }
  };

  const fetchInvoiceProducts = async (invoiceId) => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoiceProducts/${invoiceId}`);
      if (response.ok) {
        const data = await response.json();
        const productsWithQty = data.map((product) => ({
          ...product,
          updatedQty: product.invoiceQty, // Add updatedQty field
        }));
        setInvoiceProducts(productsWithQty);
      } else {
        alert('No invoice products found');
      }
    } catch (error) {
      console.error('Error fetching invoice products:', error);
      alert('An error occurred while fetching invoice products');
    }
  };  

  const generateDeliveryNo = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const rowCount = invoiceProducts.length;
    const deliveryNo = `DN-${formData.invoiceNo}-1-${currentYear}`;

    setFormData((prev) => ({
      ...prev,
      delivaryNo: deliveryNo,
    }));
  };

  const fetchTransaction = async (invoiceId) => {
    try {
      const response = await fetch(`${config.BASE_URL}/transaction/invoice/${invoiceId}`);
      if (response.ok) {
        const transactionData = await response.json();
        setTransaction(transactionData);
        console.log(transactionData);
      } else {
        alert('No Transaction found');
      }
    } catch (error) {
      console.error('Error fetching Transaction:', error);
      alert('An error occurred while fetching the transaction');
    }
  };

  const removeProduct = (index) => {
    setInvoiceProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
  };

  const updateDeliveryNote = async () => {
    try {
      const updatePromises = invoiceProducts.map(async (product, index) => {

        const qtyCell = document.querySelector(`#table-sn-${index}`);
        const updatedQty = qtyCell ? parseInt(qtyCell.textContent.trim()) : product.invoiceQty;

        // Ensure qty is a valid number and meets conditions
        if (updatedQty > 0) {
          console.log(`Updating product with ID: ${product.id}, Qty: ${updatedQty}`);

          const deliveryData = {
            invoiceQty: updatedQty,
          };

          const response = await fetch(`${config.BASE_URL}/invoiceProductsQty/${product.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryData),
          });

          if (response.ok) {
            setSuccessMessage('invoice Update Success');
          }
          if (!response.ok) {
            throw new Error(`Failed to update product ${product.id}`);
            setError(Error);
          }

          return response.json();
        } else {
          console.warn(`Skipped updating product with ID: ${product.id} as quantity is invalid.`);
          return null;
        }
      });

      const results = await Promise.all(updatePromises.filter(promise => promise !== null));
      console.log('Updated product statuses:', results);

      // Update state to reflect changes
      setInvoiceProducts((prevProducts) =>
        prevProducts.map((product, index) => ({
          ...product,
          invoiceQty: document.querySelector(`#table-sn-${index}`)?.textContent.trim() || product.invoiceQty,
          deliveryStatus: 'Delivered',
        }))
      );
    } catch (error) {
      console.error('Error updating product statuses:', error);
      alert('An error occurred while updating product statuses.');
    }
  };

  const navigate = useNavigate();

  const handlePrint = async () => {
    navigate(`/invoice/${store}/${invoiceNo}`);
    await updateDeliveryNote();
  };
  const handleUpdate = async () => {
    await updateDeliveryNote();
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Create Invoice Note</h4>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <div className="invoice-page">
          <div className="invoice-2">
            <div id="invoice-card">

              <div className="type-head text-center">
              </div>
              <section className="billing-details">
                <div className="invoice-info">
                  <div className="details mb-2">
                    <label htmlFor="">Customer Name</label>
                    <input type="text" className="form-input" name="cusName" value={formData.cusName} />
                  </div>
                  <div className="details mb-2">
                    <label htmlFor="">Customer Staff Position</label>
                    <input type="text" className="form-input" name="cusJob" value={formData.cusJob} />
                  </div>
                  <div className="details mb-2">
                    <label htmlFor="">Customer Company</label>
                    <input type="text" className="form-input" name="cusOffice" value={formData.cusOffice} />
                  </div>

                </div>
                <div className="invoice-info">
                  <div className="details mb-2">
                    <label htmlFor="">Invoice No</label>
                    <input
                      type="text"
                      className="form-input"
                      name="invoiceNo"
                      value={formData.invoiceNo}
                    />
                  </div>
                  <div className="details mb-2">
                    <label htmlFor="">Date</label>
                    <input
                      type="datetime-local"
                      className="form-input date"
                      name="invoiceDate"
                      onChange={handleInputChange}
                      value={formData.invoiceDate}
                    />
                  </div>
                  <div className="details ">
                    <label htmlFor="">Purchase Order</label>
                    <input
                      type="text"
                      className="form-input"
                      name="PurchaseOrder"
                      value={formData.PurchaseOrder}
                    />
                  </div>
                </div>

                <div className="options">
                  <button onClick={handleUpdate} className='btn btn-primary'>Update Invoice</button>
                  <button onClick={handlePrint} className='btn btn-success'>Print Invoice</button>
                </div>
              </section>

              {/* product table---------------------------------------------------------------- */}
              <table className="invoice-table" >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th colSpan={2}>Description</th>
                    <th className='text-center'>Product Quantity</th>
                    <th className='text-center'>Update Quantity</th>
                    {/* <th>Unit Price</th>
                    <th>Total LKR</th> */}
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5}>No products found for this invoice.</td>
                    </tr>
                  ) : (
                    invoiceProducts.map((invoiceProduct, index) => (
                      <tr key={index}
                      >
                        <td id='table-sn'>{index + 1}</td>
                        <td colSpan={2} id='tableDes'>{invoiceProduct.product.productName} </td>
                        <td className='text-center' id='table-sn'>{invoiceProduct.invoiceQty}</td>
                        <td className='text-center' id={`table-sn-${index}`}
                          contentEditable
                          suppressContentEditableWarning
                        >
                        </td>
                        {/* <td className={invoiceProduct.deliveryStatus === 'notDelivered' ? 'not-delivery' : 'delivery'} >{invoiceProduct.deliveryStatus}</td> */}
                        <td onMouseEnter={() => setShowRemove(index)}
                          onMouseLeave={() => setShowRemove(null)}
                          onClick={() => removeProduct(index)}
                          className={`table-row ${ShowRemove === index ? 'row-hover' : ''}`}>
                          <button className='btn btn-danger'>Delete</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                    </td>
                    <td>Total Quantity</td>
                    <td className='text-center'>
                      {invoiceProducts.reduce((total, product) => total + Number(product.invoiceQty), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SelectInvoice;
