import React from 'react'
import './Colkan.css'
import one from '../../assets/1.jpg'
import { useState } from 'react'
import config from '../../config';

const Colkan = () => {
    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        PurchaseOrder: '',
        cusName:'',
    })
    const [invoice,setInvoice]=useState([])

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
                        cusName:invoiceData.cusName
                    }));
                } else {
                    setFormData(prevData => ({
                        ...prevData,
                        invoiceId: '',
                        invoiceDate: '',
                    }));
                    alert('Invoice not found');
                    console.log('Invoice not found');
                }
            
            } catch (error) {
                console.error('Error fetching invoice data:', error);
                alert('An error occurred while fetching invoice data');
            }
        }
    };
    
    
    return (
        <div>
            <div className="scrolling-container">
                <h4>Colkan</h4>
                <div className="invoice">
                    <section className="invoice-header">
                        <img src={one} alt="" className='header-img' />
                    </section>

                    <section className="billing-details">
                        <div className="invoice-info">
                            <h3>Billing Details</h3>
                            <div className="details mb-2">
                                <input type="text" onChange={handleChange} className='form-input' name='cusName' value={formData.cusName} />
                            </div>
                            <div className="details mb-2">
                                <input type="text" className='form-input' name='cusJob' />
                            </div>
                            <p className='details'>Capital Twin Speaks</p>
                            <p className='details'>No 24 Staple Street Colombo 2 - ADDRESS MUST</p>
                        </div>
                        <div className="invoice-info">
                            <div className="details">
                                <label htmlFor="">Invoice No</label>
                                <input type="text" onChange={handleChange} className='form-input' name='invoiceNo' value={formData.invoiceNo} />
                            </div>
                            <div className="details">
                                <label htmlFor="">Date</label>
                                <input type="datetime-local" onChange={handleChange} className='form-input date' name='invoiceDate' value={formData.invoiceDate} />
                            </div>
                            <div className="details">
                                <label htmlFor="">Purchase Order</label>
                                <input type="text" onChange={handleChange} className='form-input' name='PurchaseOrder' />
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
                            <tr>
                                <td>1</td>
                                <td>product</td>
                                <td>17</td>
                                <td>800.00</td>
                                <td>13,600.00</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3} ><div className='table-content' contenteditable='true'>Notes: Payment mode</div></td>
                                <td>Subtotal</td>
                                <td> 13,600.00</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3} ><div className='table-content' contenteditable='true'>Sampath Bank | Account Number: 0117100010407 | Account Name: TERRA</div></td>
                                <td>Discount</td>
                                <td>1,360.00</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3}><div className='table-content' contenteditable='true'> Notes: [DELIVERY ADDRESS]</div></td>
                                <td>TOTAL</td>
                                <td>12,240.00</td>
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
        </div>
    )
}

export default Colkan
