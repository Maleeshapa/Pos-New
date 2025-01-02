import React, { useEffect, useState } from 'react';
import config from '../../../config';
import { jsPDF } from "jspdf";
import './CreditNote.css'
import { useParams } from 'react-router-dom';
import one from '../../../assets/1.jpg';
import two from '../../../assets/2.jpg';
import three from '../../../assets/3.jpg';

const CreditNote = () => {
    const { store, invoiceNo } = useParams();
    const [colkan, setColkan] = useState(false)
    const [haman, setHaman] = useState(false)
    const [terra, setTerra] = useState(false)
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName: '',
        cusJob: '',
        cusOffice: '',
        cusAddress: '',
        proforma: '',
        purchaseOrder: '',
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

                const generatedProformaNo = `CR-${invoiceData.invoiceNo}-${new Date().getFullYear().toString().slice(-2)}`;

                setFormData({
                    invoiceNo: invoiceData.invoiceNo,
                    invoiceDate: new Date(invoiceData.invoiceDate).toISOString().slice(0, 16),
                    cusName: invoiceData.customer.cusName,
                    cusJob: invoiceData.customer.cusJob,
                    cusOffice: invoiceData.customer.cusOffice,
                    cusAddress: invoiceData.customer.cusAddress,
                    cusPhone: invoiceData.customer.cusPhone,
                    cusEmail: invoiceData.customer.cusEmail,
                    proforma: generatedProformaNo,
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
                    const totalPages = doc.internal.getNumberOfPages();
    
                    // Loop through each page to add a footer with page number
                    for (let i = 1; i <= totalPages; i++) {
                        doc.setPage(i);
                        doc.setFontSize(10);
                        const pageWidth = doc.internal.pageSize.width;
                        const pageHeight = doc.internal.pageSize.height;
    
                        const footerText = `Page ${i} of ${totalPages}`;
                        const textWidth = doc.getTextWidth(footerText);
    
                        // Center the footer text at the bottom of each page
                        doc.text(footerText, (pageWidth - textWidth) / 2, pageHeight - 10);
                    }
    
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
    const [showPhone, setShowPhone] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const handleAddress = (e) => {
        setShowAddress(e.target.checked);
    };
    const handleBank = (e) => {
        setShowBank(e.target.checked);
    };
    const handlePhone = (e) => {
        setShowPhone(e.target.checked);
    };
    const handleEmail = (e) => {
        setShowEmail(e.target.checked);
    };

    const [note, setNote] = useState('Note:');

    return (
        <div>
            <div className="scrolling-container">
                <h4>Credit Note</h4>
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
                                <h4>Credit Note</h4>
                            </div>
                            <section className="billing-details">
                                <div className="invoice-info">
                                    <label>Billing Details</label>
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
                                    {showPhone && (
                                        <div className="details mb-2">
                                            <input type="text" className="form-input" name="cusPhone" value={formData.cusPhone} />
                                        </div>
                                    )}
                                    {showEmail && (
                                        <div className="details mb-2">
                                            <input type="text" className="form-input" name="cusEmail" value={formData.cusEmail} />
                                        </div>
                                    )}
                                </div>
                                <div className="performa-details-container">
                                    <div className="performa-details">
                                        <label htmlFor="">Credit Note No.</label>
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
                                        <td colSpan={3} rowSpan={3}>
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
                                            <td>{Transaction.discount}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>TOTAL</td>
                                        {Transaction.map((Transaction) => (
                                            <td>{Transaction.paid}</td>
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
                                                <td >Credit Advice:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Kindly deduct this amount from the payment of the Invoice No.{formData.invoiceNo}</td>
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
                                                <td >Credit Advice:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Kindly deduct this amount from the payment of the Invoice No.{formData.invoiceNo}</td>
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
                                                <td >Credit Advice:</td>
                                                <td>:</td>
                                                <td colSpan={2}>Kindly deduct this amount from the payment of the Invoice No.{formData.invoiceNo}</td>
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

                            <div className="delivery-note mt-2">
                                <textarea value={note} name="note" rows={3} id="deliveryNote" onChange={(e) => setNote(e.target.value)}></textarea>
                            </div>

                            <footer className="invoice-footer ">
                                {/* <p className='text-danger font-weight-bold'>Payment mode :  Cash or cheque. All cheques are to be drawn in favour of "Colkan" and crossed a/c.</p>
                                 */}
                                <div className="signature">
                                    <table className="signature-table">
                                        <thead>
                                            <tr>
                                                <th>Prepared by</th>
                                                <th>Issued by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
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
                                    checked={showAddress}
                                    onChange={handleAddress}
                                />
                                <br />
                                <label className='invoice-type-label' htmlFor="">Bank</label>
                                <input
                                    type="checkbox"
                                    name="bank"
                                    value="bank"
                                    checked={showBank}
                                    onChange={handleBank}
                                />
                                
                                <br />
                                <label className='invoice-type-label' htmlFor="">Phone</label>
                                <input
                                    type="checkbox"
                                    name="phone"
                                    value="phone"
                                    checked={showPhone}
                                    onChange={handlePhone}
                                />
                                <br />
                                <label className='invoice-type-label' htmlFor="">Email</label>
                                <input
                                    type="checkbox"
                                    name="email"
                                    value="email"
                                    checked={showEmail}
                                    onChange={handleEmail}
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

export default CreditNote;
