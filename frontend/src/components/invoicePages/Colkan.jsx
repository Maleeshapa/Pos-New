import React, { useState } from 'react';
import './Colkan.css';
import one from '../../assets/1.jpg';
import config from '../../config';
import { jsPDF } from "jspdf";

const Colkan = () => {
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName: '',
        cusJob: '',
        delivaryNo: ''
    });
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [Transaction, setTransaction] = useState([]);

    const [ShowRemove, setShowRemove] = useState(null);
    const [isInvoice, setIsInvoice] = useState(false); // State to track radio button selection

    const handleRadioChange = (e) => {
        setIsInvoice(e.target.value === 'invoice');
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'invoiceNo') {
            try {
                const response = await fetch(`${config.BASE_URL}/invoice/invoiceNo/${value}`);
                if (response.ok) {
                    const invoiceData = await response.json();

                    const invoiceDate = new Date(invoiceData.invoiceDate);
                    const formattedDate = invoiceDate.toISOString().slice(0, 16);

                    setFormData(prevData => ({
                        ...prevData,
                        invoiceNo: invoiceData.invoiceNo,
                        invoiceDate: formattedDate,
                        cusName: invoiceData.cusName,
                        cusJob: invoiceData.cusJob,
                    }));

                    if (invoiceData.invoiceId) {
                        fetchInvoiceProducts(invoiceData.invoiceId);
                        fetchTransaction(invoiceData.invoiceId)
                    }
                } else {
                    setFormData(prevData => ({
                        ...prevData,
                        invoiceDate: '',
                        cusName: '',
                        cusJob: '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
                alert('An error occurred while fetching invoice data');
            }
        }
    };

    const fetchInvoiceProducts = async (invoiceId) => {
        try {
            const response = await fetch(`${config.BASE_URL}/invoiceProducts/${invoiceId}`);
            if (response.ok) {
                const data = await response.json();
                setInvoiceProducts(data);
            } else {
                alert('No invoice products found');
            }
        } catch (error) {
            console.error('Error fetching invoice products:', error);
            alert('An error occurred while fetching invoice products');
        }
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

    const handlePrint = () => {
        const printContent = document.getElementById('invoice-card');

        if (printContent) {
            const doc = new jsPDF();
            doc.html(printContent, {
                callback: function (doc) {
                    doc.autoPrint();
                    window.open(doc.output('bloburl'), '_blank');
                    doc.save('invoice.pdf');
                },
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 800,
            });
        } else {
            console.error('Invoice card not found!');
        }
    };

    return (
        <div>
            <div className="scrolling-container">
                <h4>Colkan</h4>
                <div className="invoice-page">
                    <div className="invoice">
                        <div id="invoice-card">

                            <section className="invoice-header">
                                <img src={one} alt="" className="header-img" />
                            </section>

                            <section className="billing-details">
                                <div className="invoice-info">
                                    <h3>Billing Details</h3>
                                    <div className="details mb-2">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            className="form-input"
                                            name="cusName"
                                            value={formData.cusName}
                                        />
                                    </div>
                                    <div className="details mb-2">
                                        <input type="text" className="form-input" onChange={handleChange} name="cusJob" value={formData.cusJob} />
                                    </div>
                                    <div className="details mb-2">
                                        {!isInvoice && (
                                            <div className="row">
                                                <div className="details-box col-md-6">
                                                    <label htmlFor="">Pickup from</label>
                                                    <input type="text" className="form-input" name="cusAddress" />
                                                </div>
                                                <div className="details-box col-md-6">
                                                    <label htmlFor="">Pickup point</label>
                                                    <input type="text" className="form-input" name="cusAddress" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="details">Capital Twin Speaks</p>
                                    <p className="details">No 24 Staple Street Colombo 2</p>
                                </div>
                                <div className="invoice-info">
                                    {!isInvoice && (
                                        <div className="details">
                                            <label htmlFor="">Delivary No</label>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                className="form-input"
                                                name="delivaryNo"
                                                value={formData.delivaryNo}
                                            />
                                        </div>)}
                                    <div className="details">
                                        <label htmlFor="">Invoice No</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            className="form-input"
                                            name="invoiceNo"
                                            value={formData.invoiceNo}
                                        />
                                    </div>
                                    <div className="details">
                                        <label htmlFor="">Date</label>
                                        <input
                                            type="datetime-local"
                                            onChange={handleChange}
                                            className="form-input date"
                                            name="invoiceDate"
                                            value={formData.invoiceDate}
                                        />
                                    </div>
                                    <div className="details">
                                        <label htmlFor="">Purchase Order</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            className="form-input"
                                            name="PurchaseOrder"
                                            value={formData.PurchaseOrder}
                                        />
                                    </div>
                                </div>
                            </section>

                            <table className="invoice-table">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        {isInvoice && (
                                            <th>Unit Price</th>)}
                                        {isInvoice && (
                                            <th>Total LKR</th>)}
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
                                                onMouseEnter={() => setShowRemove(index)}
                                                onMouseLeave={() => setShowRemove(null)}
                                                onClick={() => removeProduct(index)}
                                                className={`table-row ${ShowRemove === index ? 'row-hover' : ''}`}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{invoiceProduct.product.productName}</td>
                                                <td>{invoiceProduct.invoiceQty}</td>
                                                {isInvoice && (
                                                    <td>{invoiceProduct.product.productSellingPrice}</td>)}
                                                {isInvoice && (
                                                    <td>{(invoiceProduct.totalAmount)}</td>)}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td id="table-content" colSpan={3} rowSpan={3}>
                                            <div className="table-content" contentEditable="true">
                                                Notes:
                                            </div>
                                        </td>
                                        {isInvoice && (
                                            <td>Subtotal</td>
                                        )}
                                        {isInvoice && (
                                            <td>
                                                {invoiceProducts.reduce(
                                                    (total, product) => total + product.product.productSellingPrice * product.invoiceQty,
                                                    0
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                    {isInvoice && (
                                        <tr>
                                            <td>Discount</td>
                                            {Transaction.map((Transaction) => (
                                                < td>{Transaction.discount}</td>
                                            ))}
                                        </tr>
                                    )}
                                    {isInvoice && (
                                        <tr>
                                            <td>TOTAL</td>
                                            {Transaction.map((Transaction) => (
                                                < td>{Transaction.paid}</td>
                                            ))}
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <footer className="invoice-footer ">
                                <p className='text-danger font-weight-bold'>I / We hereby acknowledge the receipt of the above goods are received in damages.</p>

                                <div className="signature">
                                    <table className="signature-table">
                                        <thead>
                                            <tr>
                                                <th>Prepared by</th>
                                                <th>Issued by</th>
                                                <th>Company seal & sign</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </footer>
                        </div>
                    </div>

                    <div className="options">
                        <div className="invoice-type">
                            <form action="">
                                <label className='invoice-type-label' htmlFor="">Invoice</label>
                                <input
                                    type="radio"
                                    name="formType"
                                    value="invoice"
                                    checked={isInvoice}
                                    onChange={handleRadioChange}
                                />
                                <br></br>
                                <label className='invoice-type-label' htmlFor="">Delivary</label>
                                <input
                                    type="radio"
                                    name="formType"
                                    value="other"
                                    checked={!isInvoice}
                                    onChange={handleRadioChange}
                                />
                            </form>
                        </div>
                        <button onClick={handlePrint} className='btn btn-success'>Print Invoice</button>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Colkan;
