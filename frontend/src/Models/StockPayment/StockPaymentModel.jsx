import React, { useEffect, useState } from 'react';
import config from '../../config';

function StockPaymentModel({ showModal, closeModal, onSave, stockPayment }) {
    const [error, setError] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        chequeAmount: '',
        cashAmount: '',
        stockQty: '',
        vat: '',
        total: '',
        due: '',
    });

    // Load supplier list
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/suppliers`);
                if (response.ok) {
                    const data = await response.json();
                    setSuppliers(data);
                } else {
                    setError('Failed to fetch supplier list');
                }
            } catch (err) {
                setError(`Error: ${err.message}`);
            }
        };

        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (stockPayment) {
            setFormData({
                name: stockPayment.supplierName || '',
                chequeAmount: stockPayment.chequeAmount || '',
                cashAmount: stockPayment.cashAmount || '',
                stockQty: stockPayment.stockQty || '',
                vat: stockPayment.vat || '',
                total: stockPayment.total || '',
                due: stockPayment.due || '',
            });
        }
    }, [stockPayment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };

            // Calculate due amount
            const cashAmount = parseFloat(newData.cashAmount) || 0;
            const chequeAmount = parseFloat(newData.chequeAmount) || 0;
            const totalPaidAmount = cashAmount + chequeAmount;

            newData.due = (parseFloat(newData.total) - totalPaidAmount).toFixed(2);

            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const selectedSupplier = suppliers.find(
                (supplier) => supplier.name === formData.supplierName
            );

            if (!selectedSupplier) {
                setError('Invalid supplier name');
                return;
            }

            const requestBody = {
                supplierId: selectedSupplier.id,
                cashAmount: formData.cashAmount,
                chequeAmount: formData.chequeAmount,
                stockQty: formData.stockQty,
                vat: formData.vat,
                total: formData.total,
                due: formData.due,
            };

            const response = await fetch(
                `${config.BASE_URL}/stockPayment${stockPayment ? `/${stockPayment.stockPaymentId}` : ''}`,
                {
                    method: stockPayment ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save payment');
            }
            onSave();
            closeModal();
        } catch (err) {
            setError(err.message);
        }
    };

    if (!showModal) return null;

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "10%", zIndex: 1000, }}>
            <div className="p-3" style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "100%", maxWidth: "400px", padding: "20px" }}>
                <h4>Supplier Payment Update</h4>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className="form-group">
                        <label htmlFor="supplierName">Supplier Name</label>
                        <input type="text" className="form-control" id="supplierName" name='name' value={formData.name} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQty">Stock Quantity</label>
                        <input type="text" className="form-control" id="stockQty" name='stockQty' value={formData.stockQty} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vat">Vat %</label>
                        <input type="text" className="form-control" id="vat" name='vat' value={formData.vat} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Total</label>
                        <input type="text" className="form-control" id="total" name='total' value={formData.total} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due">Due</label>
                        <input type="text" className="form-control" id="due" name='due' value={formData.due} onChange={handleChange} disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="chequeAmount">Cheque Amount</label>
                        <input type="text" className="form-control" id="chequeAmount" name='chequeAmount' value={formData.chequeAmount} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cashAmount">Cash Amount</label>
                        <input type="text" className="form-control" id="cashAmount" name='cashAmount' value={formData.cashAmount} onChange={handleChange} />
                    </div>

                    <div className="modal-footer ">
                        <button type="button" className="btn" style={{ backgroundColor: "red", color: "white", borderRadius: "nome", padding: "10px ,20px ", }} onClick={closeModal}>Close</button>
                        <button type="submit" className='btn' style={{ backgroundColor: "yellow", color: "black", borderRadius: "nome", padding: "10px ,20px ", }}>{stockPayment ? 'Update' : 'Save Changes'}</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default StockPaymentModel