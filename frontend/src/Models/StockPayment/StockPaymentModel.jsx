import React, { useState } from 'react'

function StockPaymentModel({ closeModal }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        chequeAmount: '',
        cashAmount: '',
        stockQty: '',
        vat: '',
        total: '',
        due: '',
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handelSubmit = (e) => {
        
    };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "10%", zIndex: 1000, }}>
            <div className="p-3" style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "100%", maxWidth: "400px", padding: "20px" }}>
                <h4>Supplier Payment Update</h4>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handelSubmit} className='mt-4'>
                    <div className="form-group">
                        <label htmlFor="supplierName">Supplier Name</label>
                        <input type="text" className="form-control" id="supplierName" name='name' value={formData.name} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chequeAmount">Cheque Amount</label>
                        <input type="text" className="form-control" id="chequeAmount" name='chequeAmount' value={formData.chequeAmount} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cashAmount">Cash Amount</label>
                        <input type="text" className="form-control" id="cashAmount" name='cashAmount' value={formData.cashAmount} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQty">Stock Quantity</label>
                        <input type="text" className="form-control" id="stockQty" name='stockQty' value={formData.stockQty} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vat">Vat</label>
                        <input type="text" className="form-control" id="vat" name='vat' value={formData.vat} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Total</label>
                        <input type="text" className="form-control" id="total" name='total' value={formData.total} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due">Due</label>
                        <input type="text" className="form-control" id="due" name='due' value={formData.due} onChange={handelChange} />
                    </div>

                    <div className="modal-footer ">
                        <button type="button" className="btn" style={{ backgroundColor: "red", color: "white", borderRadius: "nome", padding: "10px ,20px ", }} onClick={closeModal}>Close</button>
                        <button type="button" className='btn' style={{ backgroundColor: "yellow", color: "black", borderRadius: "nome", padding: "10px ,20px ", }}>Save changes</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default StockPaymentModel