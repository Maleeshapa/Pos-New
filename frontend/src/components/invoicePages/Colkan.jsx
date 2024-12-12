import React, { useState } from 'react';
import './Colkan.css';
import one from '../../assets/1.jpg';
import config from '../../config';

const Colkan = () => {
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName: '',
    });
    const [invoice, setInvoice] = useState({});
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [Transaction, setTransaction] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'invoiceNo') {
            try {
                const response = await fetch(`${config.BASE_URL}/invoice/invoiceNo/${value}`);
                if (response.ok) {
                    const invoiceData = await response.json();
                    setInvoice(invoiceData.invoiceId);

                    const invoiceDate = new Date(invoiceData.invoiceDate);
                    const formattedDate = invoiceDate.toISOString().slice(0, 16);

                    setFormData(prevData => ({
                        ...prevData,
                        invoiceNo: invoiceData.invoiceNo,
                        invoiceDate: formattedDate,
                        cusName: invoiceData.cusName,
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

    return (
        <div>
            <div className="scrolling-container">
                <h4>Colkan</h4>
                <div className="invoice">
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
                                    placeholder='Customer Staff Name'
                                />
                            </div>
                            <div className="details mb-2">
                                <input type="text" className="form-input" name="cusJob" placeholder='Customer Staff Position' />
                            </div>
                            <p className="details">Capital Twin Speaks</p>
                            <p className="details">No 24 Staple Street Colombo 2 - ADDRESS MUST</p>
                        </div>
                        <div className="invoice-info">
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
                                <th>Unit Price</th>
                                <th>Total LKR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>No products found for this invoice.</td>
                                </tr>
                            ) : (
                                invoiceProducts.map((invoiceProduct, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{invoiceProduct.product.productName}</td>
                                        <td>{invoiceProduct.invoiceQty}</td>
                                        <td>{invoiceProduct.product.productSellingPrice}</td>
                                        <td>{(invoiceProduct.totalAmount)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <div className="table-content" contentEditable="true">
                                        Notes: Payment mode
                                    </div>
                                </td>
                                <td>Subtotal</td>
                                <td>
                                    {invoiceProducts.reduce(
                                        (total, product) => total + product.product.productSellingPrice * product.invoiceQty,
                                        0
                                    )}

                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <div className="table-content" contentEditable="true">
                                        Sampath Bank | Account Number: 0117100010407 | Account Name: TERRA
                                    </div>
                                </td>
                                <td>Discount</td>
                                {Transaction.map((Transaction, index) => (
                                    < td>{Transaction.discount}</td>
                                ))
                                }
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <div className="table-content" contentEditable="true">
                                        Notes: [DELIVERY ADDRESS]
                                    </div>
                                </td>
                                <td>TOTAL</td>
                                {Transaction.map((Transaction, index) => (
                                    < td>{Transaction.paid}</td>
                                ))
                                }
                            </tr>
                        </tbody>
                    </table>

                    <footer className="invoice-footer">
                        <p>We hereby acknowledge the receipt of the above goods are received in damages.</p>

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
        </div >
    );
};

export default Colkan;
