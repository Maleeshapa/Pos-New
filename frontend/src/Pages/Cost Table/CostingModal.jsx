import React, { useState, useEffect } from 'react';
import './CostingModal.css';
import config from '../../config';
import axios from 'axios';

const CostingModal = ({ showModal, closeModal, formData, onChange, onSubmit }) => {
    const [localFormData, setLocalFormData] = useState(formData);
    const [productCode, setProductCode] = useState(''); // Separate state for productCode

    useEffect(() => {
        if (showModal) {
            setLocalFormData(formData);
            setProductCode(formData.productCode || ''); // Sync with initial form data
        }
    }, [showModal, formData]);

    const fetchProductDetails = async (code) => {
        try {
            const response = await axios.get(`${config.BASE_URL}/product/codeOrName/${code}`);
            const product = response.data;

            setLocalFormData(prevData => ({
                ...prevData,
                warranty: product.productWarranty,
                description: product.productDescription,
            }));

            onChange({
                ...localFormData,
                productCode: code, // Ensure productCode stays consistent
                warranty: product.productWarranty,
                description: product.productDescription,
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

    // Separate handling for productCode
    if (name === 'productCode') {
        setProductCode(value); // Update productCode separately
        fetchProductDetails(value);
        return;
    }

    // Ensure updatedData is initialized correctly
    const updatedData = { ...localFormData, [name]: value };

        const unitCost = parseFloat(updatedData.unitCost) || 0;
        const ourMarginPercentage = parseFloat(updatedData.ourMarginPercentage) || 0;
        const otherMarginPercentage = parseFloat(updatedData.otherMarginPercentage) || 0;
        const qty = parseInt(updatedData.qty) || 1;
        const discountPercentage = parseFloat(updatedData.discountPercentage) || 0;

        updatedData.ourMarginValue = (unitCost * ourMarginPercentage) / 100;
        updatedData.otherMarginValue = (unitCost * otherMarginPercentage) / 100;
        updatedData.pricePlusMargin = updatedData.ourMarginValue + updatedData.otherMarginValue;
        updatedData.sellingRate = updatedData.pricePlusMargin / 0.9; 
        updatedData.sellingRateRounded = Math.ceil(updatedData.sellingRate / 10) * 10; 
        updatedData.unitPrice = updatedData.sellingRateRounded; 
        updatedData.discountValue = (updatedData.sellingRateRounded * discountPercentage) / 100;
        updatedData.discountedPrice = updatedData.sellingRateRounded - updatedData.discountValue;
        updatedData.amount = updatedData.discountedPrice * qty;
        updatedData.profit = (updatedData.ourMarginValue + parseFloat(updatedData.otherMarginPercentage)) * qty;
    
        setLocalFormData(updatedData);
        onChange(updatedData);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...localFormData, productCode }); 
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