import React from 'react'
import './Colkan.css'
import one from '../../assets/1.jpg'

const Colkan = () => {
    return (
        <div>
            <div className="scrolling-container">
                <h4>Colkan</h4>
                <div className="invoice">
                    <section className="invoice-header">
                        <img src={one} alt="" className='header-img' />
                    </section>

                    <section className="billing-details">
                        <h3>Billing Details</h3>
                        <p className='details'>Capital Twin Speaks</p>
                        <p className='details'>No 24 Staple Street Colombo 2 - ADDRESS MUST</p>
                        <div className="invoice-info">
                            <p className='details'>Invoice No: 1508-24</p>
                            <p className='details'>Date: 22.07.2024</p>
                            <p className='details'>Purchase Order</p>
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
                                <td>LED 18W T8 4FT Single Input Glass Tube Light 6500K ENL-18w-362 Brand: ENLITE</td>
                                <td>17</td>
                                <td>800.00</td>
                                <td>13,600.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <section className="notes">
                        <p>Notes: Payment mode: Cash or cheque. All cheques are to be drawn in favour of "TERRA WALKERS" and crossed a/c payee only.</p>
                        <p>Sampath Bank | Account Number: 0117100010407 | Account Name: TERRA</p>
                        <p>Notes: [DELIVERY ADDRESS]</p>
                    </section>

                    <div className="totals">
                        <p>Subtotal: 13,600.00</p>
                        <p>Discount: (1,360.00)</p>
                        <h4>TOTAL: 12,240.00</h4>
                    </div>

                    <footer className="invoice-footer">
                        <p>I've hereby acknowledge the receipt of the above goods are received in damages.</p>
                        <div className="signature">
                            <p>Prepared by</p>
                            <p>Issued by</p>
                            <p>Company seal & sign</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Colkan
