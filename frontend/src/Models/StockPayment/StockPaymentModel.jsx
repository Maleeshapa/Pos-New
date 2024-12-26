import React, { useState } from 'react';
import './StockPayment.css';

function StockPaymentModel({ closeModal }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        totalAmount: '',
        totalQty: '',
        vat: '',
        cashAmount: '',
        chequeAmount: '',
        due: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div style={{ placeItems: 'center' }}>
            <h4>Update Payment</h4>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group-1">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Total Amount </label>
                        <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Total Quantity</label>
                        <input type="number" name="totalQty" value={formData.totalQty} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Vat %</label>
                        <input type="number" name="vat" value={formData.vat} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Cash Amount</label>
                        <input type="number" name="cashAmount" value={formData.cashAmount} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Cheque Amount</label>
                        <input type="number" name="chequeAmount" value={formData.chequeAmount} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Due Amount</label>
                        <input type="number" name="due" value={formData.due} onChange={handleChange} />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={closeModal}>Close</button>
                        <button type="submit">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default StockPaymentModel;
