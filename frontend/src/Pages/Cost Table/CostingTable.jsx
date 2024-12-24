import React, { useState } from 'react';
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

        setFormData(updatedData);
    };

    const handleSubmit = () => {
        // Make sure all necessary data is present
        if (
            formData.unitCost > 0 &&
            formData.qty > 0 &&
            formData.profit >= 0
        ) {
            setEntries([...entries, formData]);
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
        } else {
            alert("Please fill in all the fields correctly.");
        }
    };

    const handleDelete = (index) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    return (
        <div className="container-fluid mt-4">
            <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#entryModal">
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
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                    <Trash size={16} />
                </button>
            </td>
        </tr>
    ))}
</tbody>


            </table>

            {/* Modal */}
            <div className="modal fade" id="entryModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Entry</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {Object.keys(formData).map((key) => (
                                    <div className="col-md-6 mb-3" key={key}>
                                        <label className="form-label text-capitalize">
                                            {key.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                key.includes('Value') || key.includes('Price') || key === 'profit'
                                                    ? 'bg-warning'
                                                    : ''
                                            }`}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            readOnly={
                                                key.includes('Value') ||
                                                key.includes('Price') ||
                                                key === 'profit'
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostingTable;
