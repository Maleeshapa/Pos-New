
import React, { useEffect, useState } from 'react';
import './ProformaInvoice.css';
import two from '../../assets/2.jpg';
import config from '../../config';
import { jsPDF } from "jspdf";
import { useParams } from 'react-router-dom';

const HamanProformaInvoice = () => {
    const { invoiceNo } = useParams();
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName: '',
        cusJob: '',
        cusOffice: '',
        proforma: ''
    });
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [Transaction, setTransaction] = useState([]);

    const [ShowRemove, setShowRemove] = useState(null);

    useEffect(() => {
        if (invoiceNo) {
            fetchInvoiceData(invoiceNo);
        }
    }, [invoiceNo]);

    const fetchInvoiceData = async (invoiceNo) => {
        try {
            const response = await fetch(`${config.BASE_URL}/invoice/invoiceNo/${invoiceNo}`);
            if (response.ok) {
                const invoiceData = await response.json();
    
                const generatedProformaNo = `PR-${invoiceData.invoiceNo}-${new Date().getFullYear().toString().slice(-2)}`;
    
                setFormData({
                    invoiceNo: invoiceData.invoiceNo,
                    invoiceDate: new Date(invoiceData.invoiceDate).toISOString().slice(0, 16),
                    cusName: invoiceData.customer.cusName,
                    cusJob: invoiceData.customer.cusJob,
                    cusOffice: invoiceData.customer.cusOffice,
                    proforma: generatedProformaNo,
                });
    
                if (invoiceData.invoiceId) {
                    fetchInvoiceProducts(invoiceData.invoiceId);
                    fetchTransaction(invoiceData.invoiceId);
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

    const [showAddress, setShowAddress] = useState(false)
    const [showBank, setShowBank] = useState(false)

    const handleAddress = (e) => {
        setShowAddress(e.target.checked);
    };
    const handleBank = (e) => {
        setShowBank(e.target.checked);
    };

    return (
        <div>
            <div className="scrolling-container">
                <h4>Haman Profoma Invoice</h4>
                <div className="invoice-page">
                    <div className="invoice">
                        <div id="invoice-card">

                            <section className="invoice-header">
                                <img src={two} alt="" className="header-img" />
                            </section>

                            <section className="billing-details">
                                <div className="invoice-info">
                                    <h3>Billing Details</h3>

                                    <div className="details mb-2">
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="cusName"
                                            value={formData.cusName}
                                        />
                                    </div>

                                    <div className="details mb-2">
                                        <input type="text" className="form-input" name="cusJob" value={formData.cusJob} />
                                    </div>

                                    <div className="details mb-2">
                                        <input type="text" className="form-input" name="cusJob" value={formData.cusOffice} />
                                    </div>

                                    {showAddress && (
                                        <div>
                                            <p className="details">67 Norris Canal Road,</p>
                                            <p className="details"> Colombo 10</p>
                                        </div>
                                    )}
                                </div>
                                <div className="performa-details-container">

                                    <div className="performa-details">
                                        <label htmlFor="">Proforma Invoice No.</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="proforma"
                                            value={formData.proforma}
                                        />
                                    </div>

                                    <div className="performa-details">
                                        <label htmlFor="">Date</label>
                                        <input
                                            type="datetime-local"
                                            className="form-input date"
                                            name="invoiceDate"
                                            value={formData.invoiceDate}
                                        />
                                    </div>

                                    <div className="performa-details">
                                        <label htmlFor="">Invoice No.</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="invoiceNo"
                                            value={formData.invoiceNo}
                                        />
                                    </div>

                                    <div className="performa-details">
                                        <label htmlFor="">Purchase Order No.</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="purchaseOrder"
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
                                            <tr key={index}
                                                className={`table-row`}
                                            >
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
                                        <td colSpan={3}></td>
                                        <td>Subtotal</td>
                                        <td>
                                            {invoiceProducts.reduce(
                                                (total, product) => total + product.product.productSellingPrice * product.invoiceQty,
                                                0
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td>Discount</td>
                                        {Transaction.map((Transaction) => (
                                            <td>{Transaction.discount}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td>TOTAL</td>
                                        {Transaction.map((Transaction) => (
                                            <td>{Transaction.paid}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <footer className="invoice-footer ">
                                <p className='text-danger font-weight-bold'>Payment mode :  Cash or cheque. All cheques are to be drawn in favour of "Colkan" and crossed a/c.</p>
                                {/* <p className='text-danger font-weight-bold'>Payment mode :  Cash or cheque. All cheques are to be drawn in favour of "TERRA WALKERS" and crossed a/c.</p> */}
                                {/* <p className='text-danger font-weight-bold'>Payment mode :  Cash or cheque. All cheques are to be drawn in favour of "TERRA WALKERS" and crossed a/c.</p> */}


                                {showBank && (
                                    <p className="bank-details">
                                        HNB Bank | Account Number: 25001003234 | COLKAN HOLDINGS (PVT) LTE | 250 | COLKANH.HANEEF
                                    </p>
                                )}
                                <div className="signature">
                                    <table className="signature-table">
                                        <thead>
                                            <tr>
                                                <th>Prepared by</th>
                                                <th>Issued by</th>
                                                <th> </th>
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
                                <br />
                                <label className='invoice-type-label' htmlFor="">Address</label>
                                <input
                                    type="checkbox"
                                    name="address"
                                    value="address"
                                    onChange={handleAddress}
                                />
                                <br />
                                <label className='invoice-type-label' htmlFor="">Bank</label>
                                <input
                                    type="checkbox"
                                    name="bank"
                                    value="bank"
                                    onChange={handleBank}
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

export default HamanProformaInvoice;
