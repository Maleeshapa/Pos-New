import React, { useState, useEffect } from 'react';
import './CostingModal.css';

const CostingModal = ({ showModal, closeModal, formData, onChange, onSubmit }) => {
    const [localFormData, setLocalFormData] = useState(formData);

    useEffect(() => {
        if (showModal) {
            setLocalFormData(formData);
        }
    }, [showModal, formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        // Auto-calculated fields
        const unitCost = parseFloat(updatedData.unitCost) || 0;
        const ourMarginPercentage = parseFloat(updatedData.ourMarginPercentage) || 0;
        const otherMarginPercentage = parseFloat(updatedData.otherMarginPercentage) || 0;
        const qty = parseInt(updatedData.qty) || 1;
        const discountPercentage = parseFloat(updatedData.discountPercentage) || 0;

        updatedData.ourMarginValue = (unitCost * ourMarginPercentage) / 100;
        updatedData.otherMarginValue = (unitCost * otherMarginPercentage) / 100;
        updatedData.pricePlusMargin = updatedData.ourMarginValue + updatedData.otherMarginValue;
        updatedData.sellingRate = updatedData.pricePlusMargin / 0.9; // Selling Rate Before Discount Calculation
        updatedData.sellingRateRounded = Math.ceil(updatedData.sellingRate / 10) * 10; // Round to nearest 10 (upwards)
        updatedData.unitPrice = updatedData.sellingRateRounded; // Unit Price matches Selling Rate Rounded
        updatedData.discountValue = (updatedData.sellingRateRounded * discountPercentage) / 100;
        updatedData.discountedPrice = updatedData.sellingRateRounded - updatedData.discountValue;
        updatedData.amount = updatedData.discountedPrice * qty;
        updatedData.profit = (updatedData.ourMarginValue + parseFloat(updatedData.otherMarginPercentage)) * qty;
    
        setLocalFormData(updatedData);
        onChange(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(localFormData);
        closeModal();
    };

    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-centered">
                <h4>Add/Edit Costing Entry</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {Object.keys(localFormData).map((key) => (
                            <div className="form-group" key={key}>
                                <label htmlFor={key} className="text-capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    id={key}
                                    className={`form-control ${
                                        key.includes('Value') || key.includes('Price') || key === 'profit'
                                            ? 'bg-warning'
                                            : ''
                                    }`}
                                    value={localFormData[key]}
                                    onChange={handleInputChange}
                                    readOnly={
                                        key.includes('Value') || key.includes('Price') || key === 'profit'
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-danger" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CostingModal;