import React, { useEffect, useState } from 'react';
import './SelectDN.css';
import one from '../../assets/1.jpg';
import two from '../../assets/2.jpg';
import three from '../../assets/3.jpg';
import config from '../../config';
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from 'react-router';

const SelectDN = () => {
  const { store, invoiceNo } = useParams();
  const [colkan, setColkan] = useState(false)
  const [haman, setHaman] = useState(false)
  const [terra, setTerra] = useState(false)
  const[invoiceTime,setInvoiceTime]=useState('')
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
        setInvoiceTime(invoiceData.invoiceTime)
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
        // alert('Invoice not found');
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      alert('An error occurred while fetching invoice data');
    }
  };

  const fetchInvoiceProducts = async (invoiceId) => {
    try {
      const response = await fetch(`${config.BASE_URL}/deliveryNotes/${invoiceId}`);
      if (response.ok) {
        const data = await response.json();
        // const filteredProducts = data.filter(product => product.deliveryStatus !== 'Delivered');
        setInvoiceProducts(data);
      } else {
        // alert('No invoice products found');
      }
    } catch (error) {
      console.error('Error fetching invoice products:', error);
      alert('An error occurred while fetching invoice products');
    }
  };

  const generateDeliveryNo = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const time = invoiceTime;
    const deliveryNo = `DN-${formData.invoiceNo}-${time}-${currentYear}`;

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
        // alert('No Transaction found');
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
            sendQty:product.sendQty-updatedQty,
            deliverdQty: updatedQty,
            deliveryStatus:"delivered"
          };

          const response = await fetch(`${config.BASE_URL}/deliveryNotes/${product.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryData),
          });

          if (!response.ok) {
            throw new Error(`Failed to update product ${product.id}`);
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
    navigate(`/delivery/${store}/${invoiceNo}`);
    await updateDeliveryNote();
  };

  const [showAddress, setShowAddress] = useState(true)
  const [showBank, setShowBank] = useState(false)

  const handleAddress = (e) => {
    setShowAddress(e.target.checked);
  };
  const handleBank = (e) => {
    setShowBank(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Fetch data dynamically when `invoiceNo` changes
    if (name === 'invoiceNo' && value) {
      fetchInvoiceData(value);
    }
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Create Delivery Note</h4>
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
                  {showAddress && (
                    <div className="details mb-2">
                      <label htmlFor="">Customer Address</label>
                      <div className="details-box w-100">
                        <textarea
                          className="form-input"
                          name="cusAddress"
                          rows="2"
                          style={{ resize: "both" }}
                          value={formData.cusAddress}
                        ></textarea>
                      </div>
                    </div>
                  )}

                </div>
                <div className="invoice-info">
                  <div className="details mb-2">
                    <label htmlFor="">Delivary No</label>
                    <input
                      type="text"
                      className="form-input"
                      name="delivaryNo"
                      onChange={handleInputChange}
                      value={formData.delivaryNo}
                    />
                  </div>
                  <div className="details mb-2">
                    <label htmlFor="">Invoice No</label>
                    <input
                      type="text"
                      className="form-input"
                      name="invoiceNo"
                      value={formData.invoiceNo}
                      onChange={handleChange}
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
                  <div className="invoice-type">
                  </div>
                  <button onClick={handlePrint} className='btn btn-success'>Print Invoice</button>
                </div>
              </section>

              {/* product table---------------------------------------------------------------- */}
              <table className="invoice-table" >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th colSpan={2}>Description</th>
                    <th>Quantity</th>
                    <th className='text-center'>Delivery Quantity</th>
                    <th className='text-center'>Last Delivered Quantity</th>
                    <th className='text-center'>Current Delivery Quantity</th>
                    {/* <th>Unit Price</th>
                    <th>Total LKR</th> */}
                    <th>Status</th>
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
                        <td className='text-center' id='table-sn'>{invoiceProduct.sendQty}</td>
                        <td className='text-center' id={`table-dn-${index}`}>{invoiceProduct.deliverdQty}</td>
                        <td className='text-center' id={`table-sn-${index}`}
                          contentEditable
                          suppressContentEditableWarning
                        >  
                        </td>
                        <td className={invoiceProduct.deliveryStatus === 'notDelivered' ? 'not-delivery' : 'delivery'} >{invoiceProduct.deliveryStatus}</td>
                        <td onMouseEnter={() => setShowRemove(index)}
                          onMouseLeave={() => setShowRemove(null)}
                          onClick={() => removeProduct(index)}
                          className={`table-row ${ShowRemove === index ? 'row-hover' : ''}`}>
                          <button className='btn btn-danger'>Remove</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      {showBank && (
                        <>
                          Payment mode : Cash or cheque. All cheques are to be drawn in favour of "Colkan" and crossed a/c<br></br>
                          {colkan && (
                            <>
                              Bank:HNB<br></br>
                              Account Number : 250010032342<br></br>
                              Account Name : Colkan Holdings (Pvt) LTD<br></br>
                              Branch Name : Colkan
                            </>
                          )}

                          {haman && (
                            <>
                              Bank:BOC<br></br>
                              Account Number : 93829087<br></br>
                              Account Name : Haman<br></br>
                              Branch Name : Wellewathe
                            </>
                          )}

                          {terra && (
                            <>
                              Bank:Sampath Bank<br></br>
                              Account Number : 0117 1000 1407<br></br>
                              Account Name : Terra walkers<br></br>
                              Branch Name : Kirulapona
                            </>
                          )}
                        </>
                      )}
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

export default SelectDN;
