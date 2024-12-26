import React, { useEffect, useState } from 'react';
import './InvoiceNote.css';
import one from '../../assets/1.jpg';
import two from '../../assets/2.jpg';
import three from '../../assets/3.jpg';
import config from '../../config';
import { jsPDF } from "jspdf";
import { useParams } from 'react-router-dom';

const InvoiceNote = () => {
    const { store, invoiceNo } = useParams();
    const [colkan, setColkan] = useState(false)
    const [haman, setHaman] = useState(false)
    const [terra, setTerra] = useState(false)
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName: '',
        cusOffice: '',
        cusJob: '',
        cusAddress: ''
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

                setFormData({
                    invoiceNo: invoiceData.invoiceNo,
                    invoiceDate: new Date(invoiceData.invoiceDate).toISOString().slice(0, 16),
                    cusName: invoiceData.customer.cusName,
                    cusJob: invoiceData.customer.cusJob,
                    cusAddress: invoiceData.customer.cusAddress,
                    PurchaseOrder: invoiceData.purchaseNo,
                    cusOffice: invoiceData.customer.cusOffice,
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

    const [showAddress, setShowAddress] = useState(true)
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
                <h4>Invoice </h4>
                <div className="invoice-page">
                    <div className="invoice">
                        <div id="invoice-card">
                            {colkan && (
                                <section className="invoice-header">
                                    <img src={one} alt="" className="header-img" />
                                </section>
                            )}
                            {haman && (
                                <section className="invoice-header">
                                    <img src={two} alt="" className="header-img" />
                                </section>

                            )}
                            {terra && (
                                <section className="invoice-header">
                                    <img src={three} alt="" className="header-img" />
                                </section>
                            )}
                            <div className="type-head text-center">
                                <h4>Invoice</h4>
                            </div>
                            <section className="billing-details">
                                <div className="invoice-info">
                                    <label>Billing Details</label>
                                    <div className="details mb-2">
                                        <input type="text" className="form-input" name="cusName" value={formData.cusName} />
                                    </div>
                                    <div className="details mb-2">
                                        <input type="text" className="form-input" name="cusJob" value={formData.cusJob} />
                                    </div>
                                    <div className="details mb-2">
                                        <input type="text" className="form-input" name="cusOffice" value={formData.cusOffice} />
                                    </div>
                                    {showAddress && (
                                        <div className="details mb-2">
                                            <div className="details-box">
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
                                        <label htmlFor="">Invoice No</label>
                                        <input type="text" className="form-input" name="invoiceNo" value={formData.invoiceNo} />
                                    </div>
                                    <div className="details mb-2">
                                        <label htmlFor="">Date</label>
                                        <input type="datetime-local" className="form-input date" name="invoiceDate" value={formData.invoiceDate} />
                                    </div>
                                    <div className="details ">
                                        <label htmlFor="">Purchase Order</label>
                                        <input type="text" className="form-input" name="PurchaseOrder" value={formData.PurchaseOrder} />
                                    </div>
                                </div>

                            </section>

                            {/* product table---------------------------------------------------------------- */}
                            <table className="invoice-table mb-2">
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
                                                <td id='table-sn'>{index + 1}</td>
                                                <td id='tableDes'>{invoiceProduct.product.productName}</td>
                                                <td id='table-sn'>{invoiceProduct.invoiceQty}</td>
                                                <td id='table-sn' >{invoiceProduct.product.productSellingPrice}</td>
                                                <td id='table-sn'>{(invoiceProduct.totalAmount)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td id="table-content" colSpan={3} rowSpan={3}>
                                            {showBank && (
                                                <>
                                                    Payment mode : Cash or cheque. All cheques are to be drawn in favour of "Colkan" and crossed a/c payee only<br></br>
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
                                        <td>Subtotal</td>
                                        <td>
                                            {invoiceProducts.reduce(
                                                (total, product) => total + product.product.productSellingPrice * product.invoiceQty,
                                                0
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        {Transaction.map((Transaction) => (
                                            < td>{Transaction.discount}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>TOTAL</td>
                                        {Transaction.map((Transaction) => (
                                            < td>{Transaction.paid}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            {/*bank details-------------------------------------------------------------------*/}
                            {/* {showBank && (
                                <>
                                    {colkan && (
                                        <table>
                                            <tr>
                                                <td >Payment mode:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Cash or cheque. All cheques are to be drawn in favour of "Colkan" and crossed a/c </td>
                                            </tr>
                                            <tr>
                                                <td>Bank </td>
                                                <td>:</td>
                                                <td>HNB</td>
                                            </tr>
                                            <tr>
                                                <td>Account Number </td>
                                                <td>:</td>
                                                <td>250010032342</td>
                                            </tr>
                                            <tr>
                                                <td>Account Name </td>
                                                <td>:</td>
                                                <td>Colkan Holdings (Pvt) LTD</td>
                                            </tr>
                                            <tr>
                                                <td>Branch Name </td>
                                                <td>:</td>
                                                <td>Colkan</td>
                                            </tr>
                                        </table>
                                    )}
                                </>)}

                            {showBank && (
                                <>
                                    {haman && (
                                        <table>
                                            <tr>
                                                <td >Payment mode:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Cash or cheque. All cheques are to be drawn in favour of "Hamn" and crossed a/c </td>
                                            </tr>
                                            <tr>
                                                <td>Bank </td>
                                                <td>:</td>
                                                <td>BOC</td>
                                            </tr>
                                            <tr>
                                                <td>Account Number </td>
                                                <td>:</td>
                                                <td>93829087</td>
                                            </tr>
                                            <tr>
                                                <td>Account Name </td>
                                                <td>:</td>
                                                <td>Haman</td>
                                            </tr>
                                            <tr>
                                                <td>Branch Name </td>
                                                <td>:</td>
                                                <td>Wellewathe</td>
                                            </tr>
                                        </table>
                                    )}
                                </>)}

                            {showBank && (
                                <>
                                    {terra && (
                                        <table>
                                            <tr>
                                                <td >Payment mode:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Cash or cheque. All cheques are to be drawn in favour of "Terra" and crossed a/c </td>
                                            </tr>
                                            <tr>
                                                <td>Bank </td>
                                                <td>:</td>
                                                <td>Sampath Bank</td>
                                            </tr>
                                            <tr>
                                                <td>Account Number </td>
                                                <td>:</td>
                                                <td>0117 1000 1407</td>
                                            </tr>
                                            <tr>
                                                <td>Account Name </td>
                                                <td>:</td>
                                                <td>Terra walkers</td>
                                            </tr>
                                            <tr>
                                                <td>Branch Name </td>
                                                <td>:</td>
                                                <td>Kirulapona</td>
                                            </tr>
                                        </table>
                                    )}
                                </>)} */}

                            <footer className="invoice-footer ">
                                <p className='font-weight-bold'>I / We hereby acknowledge the receipt of the above goods are received in damages.</p>

                                <div className="signature">
                                    <table className="signature-table">
                                        <thead>
                                            <tr> <th>Prepared by</th>  <th>Issued by</th> <th>Company seal & sign</th> </tr>
                                        </thead>
                                        <tbody>
                                            <tr> <td></td>  <td></td>  <td></td> </tr>
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
                                <input type="checkbox" name="address" value="address" checked={showAddress} onChange={handleAddress} />
                                <br />
                                <label className='invoice-type-label' htmlFor="">Bank</label>
                                <input type="checkbox" name="bank" value="bank" checked={showBank} onChange={handleBank} />
                            </form>
                        </div>
                        <button onClick={handlePrint} className='btn btn-success'>Print Invoice</button>

                    </div>

                </div>
            </div>
        </div >
    );
};

export default InvoiceNote;
