import React, { useState } from 'react';
import CostingModal from './CostingModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash } from 'lucide-react';

const CostingTable = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        descriptionCustomer: '',
        productCode: '',
        description: '',
        warranty: '',
        supplier: '',
        unitCost: 0,
        ourMarginPercentage: 0,
        ourMarginValue: 0,
        otherMarginPercentage: 0,
        otherMarginValue: 0,
        pricePlusMargin: 0,
        sellingRate: 0,
        sellingRateRounded: 0,
        uom: '',
        qty: 1,
        unitPrice: 0,
        discountPercentage: 0,
        discountValue: 0,
        discountedPrice: 0,
        amount: 0,
        profit: 0,
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (updatedData) => {
        setFormData(updatedData);
    };

    const handleSubmit = () => {
        if (formData.unitCost > 0 && formData.qty > 0) {
            setEntries([...entries, formData]);
            resetForm();
        } else {
            alert('Please fill in all the fields correctly.');
        }
    };

    const resetForm = () => {
        setFormData({
            descriptionCustomer: '',
            productCode: '',
            description: '',
            warranty: '',
            supplier: '',
            unitCost: 0,
            ourMarginPercentage: 0,
            ourMarginValue: 0,
            otherMarginPercentage: 0,
            otherMarginValue: 0,
            pricePlusMargin: 0,
            sellingRate: 0,
            sellingRateRounded: 0,
            uom: '',
            qty: 1,
            unitPrice: 0,
            discountPercentage: 0,
            discountValue: 0,
            discountedPrice: 0,
            amount: 0,
            profit: 0,
        });
    };

    const handleDelete = (index) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    return (
        <div className="container-fluid mt-4">
            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowModal(true)}
            >
                + Add Entry
            </button>

            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                        <th  className="table-warning">Description Customer</th>
                        <th>Product Code</th>
                        <th>Description</th>
                        <th>Warranty</th>
                        <th className="table-warning">Supplier</th>
                        <th className="table-warning">Unit Cost</th>
                        <th className="table-warning">Our Margin %</th>
                        <th  className="table-warning">Our Margin Value</th>
                        <th  className="table-warning">Other Margin %</th>
                        <th  className="table-warning">Other Margin Value</th>
                        <th  className="table-warning">Price + Margin</th>
                        <th  className="table-warning">Selling Rate</th>
                        <th  className="table-warning">Selling Rate (Rounded)</th>
                        <th>UOM</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Discount %</th>
                        <th>Discount Value</th>
                        <th>Discounted Price</th>
                        <th>Amount</th>
                        <th  className="table-warning">Profit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index}>
                        {Object.entries(entry).map(([key, value], i) => {
                            // Check if the key corresponds to a "table-warning" header
                            const isWarningColumn = [
                                'descriptionCustomer',
                                'supplier',
                                'unitCost',
                                'ourMarginPercentage',
                                'ourMarginValue',
                                'otherMarginPercentage',
                                'otherMarginValue',
                                'pricePlusMargin',
                                'sellingRate',
                                'sellingRateRounded',
                                'profit',
                            ].includes(key);
            
                            return (
                                <td key={i} className={isWarningColumn ? 'table-warning' : ''}>
                                    {value}
                                </td>
                            );
                        })}
                        <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(index)}
                                >
                                    <Trash size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CostingModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                formData={formData}
                onChange={(updatedData) => setFormData(updatedData)}
                onSubmit={(newEntry) => {
                    setEntries([...entries, newEntry]);
                    setFormData({
                        descriptionCustomer: '',
                        productCode: '',
                        description: '',
                        warranty: '',
                        supplier: '',
                        unitCost: 0,
                        ourMarginPercentage: 0,
                        ourMarginValue: 0,
                        otherMarginPercentage: 0,
                        otherMarginValue: 0,
                        pricePlusMargin: 0,
                        sellingRate: 0,
                        sellingRateRounded: 0,
                        uom: '',
                        qty: 1,
                        unitPrice: 0,
                        discountPercentage: 0,
                        discountValue: 0,
                        discountedPrice: 0,
                        amount: 0,
                        profit: 0,
                    });
                }}
            />
        </div>
    );
};

export default CostingTable;
