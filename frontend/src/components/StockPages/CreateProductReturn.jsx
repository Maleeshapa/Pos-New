import React, { useEffect, useState } from 'react';
import './Stock.css';
import config from '../../config';

const CreateProductReturn = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [productSearch, setProductSearch] = useState('');
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
    const [productSuggestions, setProductSuggestions] = useState([]);
    const [data, setData] = useState([]);
    const Columns = ["id", "product", "Type", "qty", "price"];

    const getSriLankanTime = () => {
        const now = new Date();
        const sriLankanOffset = 5.5 * 60 * 60 * 1000;
        const sriLankanTime = new Date(now.getTime() + sriLankanOffset);
        return sriLankanTime.toISOString().slice(0, 16);
    };

    const initialFormData = {
        cusName: '',
        invoiceNo: '',
        returnType: '',
        user: '',
        store: '',
        returnDate: getSriLankanTime(),
        note: '',
        product: '',
        productNo: '',
        productName: '',
        qty: '',
        productNote: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    // Fetch stores, users, and returns on component mount
    useEffect(() => {
        fetchStores();
        fetchUsers();
        fetchReturnData();
    }, []);

    const fetchReturnData = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/returns`);
            if (!response.ok) throw new Error('Failed to fetch return list');
            const returnList = await response.json();

            const formattedData = returnList.map(returns => [
                returns.returnItemId,
                returns.products?.productName,
                returns.returnItemType,
                returns.returnQty,
                returns.products?.productSellingPrice,
            ]);

            setData(formattedData);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            // Validate invoice number and fetch its details
            const invoiceResponse = await fetch(`${config.BASE_URL}/invoiceProduct/${formData.invoiceNo}`);
            if (!invoiceResponse.ok) throw new Error('Invoice not found.');
            const invoiceData = await invoiceResponse.json();

            const response = await fetch(`${config.BASE_URL}/return`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    returnItemType: formData.returnType,
                    returnItemDate: formData.returnDate,
                    returnQty: formData.qty,
                    returnNote: formData.note,
                    productId: formData.product,
                    storeId: formData.store,
                    userId: formData.user,
                    invoiceId: invoiceData[0]?.invoiceId,
                    stockId: formData.stockId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create return.');
            }

            const result = await response.json();
            setSuccessMessage('Return created successfully.');
            setFormData(initialFormData);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/stores`);
            if (!response.ok) throw new Error('Failed to fetch stores');
            const data = await response.json();
            setStores(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleProductSearch = async (e) => {
        const query = e.target.value;
        setProductSearch(query);

        if (query.length >= 2) {
            try {
                const response = await fetch(`${config.BASE_URL}/products/suggestions?query=${query}`);
                if (!response.ok) throw new Error('Failed to fetch product suggestions');
                const suggestions = await response.json();
                setProductSuggestions(suggestions);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setProductSuggestions([]);
        }
    };

    const handleProductSelect = async (productName) => {
        setProductSearch(productName);
        setProductSuggestions([]);

        try {
            const productResponse = await fetch(`${config.BASE_URL}/product/productName/${productName}`);
            if (!productResponse.ok) throw new Error('Product not found');
            const product = await productResponse.json();

            const stockResponse = await fetch(`${config.BASE_URL}/stock/product/${product.productId}`);
            if (!stockResponse.ok) throw new Error('Stock ID not found for this product');
            const stock = await stockResponse.json();

            setFormData(prevData => ({
                ...prevData,
                product: product.productId,
                productNo: product.productCode,
                productName: product.productName,
                productNote: `${product.productDescription} ${product.productWarranty}`,
                stockId: stock.stockId,
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="scrolling-container">
                <h4>Create Product Return</h4>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="customer px-4 col-md-4">
                            <div className="Stock-details">
                                <label htmlFor="invoiceNo">Invoice Number</label>
                                <input type="number" className="form-control" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} onWheel={(e) => e.target.blur()} />
                            </div>
                            <div className="Stock-details mb-2">
                                <label htmlFor="returnType">Return Type</label>
                                <select name="returnType" className="form-control" value={formData.returnType} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="Damage">Damaged</option>
                                    <option value="WarrantyClaim">Warranty Claim</option>
                                    <option value="Exchange">Exchange</option>
                                </select>
                            </div>
                            <div className="Stock-details">
                                <label htmlFor="user">Person</label>
                                <select name="user" className="form-control" value={formData.user} onChange={handleChange}>
                                    <option value="">Select Store</option>
                                    {users.map((user) => (
                                        <option key={user.userId} value={user.userId}>
                                            {user.userName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="Stock-details mb-2">
                                <label htmlFor="store">Store</label>
                                <select name="store" className="form-control" value={formData.store} onChange={handleChange}>
                                    <option value="">Select Store</option>
                                    {stores.map((store) => (
                                        <option key={store.storeId} value={store.storeId}>
                                            {store.storeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="Stock-details mb-2">
                                <label htmlFor="returnDate">Return Date</label>
                                <input type="datetime-local" className="form-control" name="returnDate" value={formData.returnDate} onChange={handleChange} readOnly />
                            </div>
                            <div className="Stock-details mb-2">
                                <label htmlFor="note">Note</label>
                                <textarea className="form-control" name="note" value={formData.note} onChange={handleChange} placeholder="Add your note here" rows={3} />
                            </div>
                        </div>

                        <div className="product col-md-8">
                            <div className="row">
                                <div className="Stock-details col-md-4 mb-2">
                                    <label htmlFor="productName">Product Name</label>
                                    <input type="text" className="form-control" name="productName" value={productSearch} onChange={handleProductSearch} />
                                    {productSuggestions.length > 0 && (
                                        <ul className="list-group mt-0">
                                            {productSuggestions.map((product, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => handleProductSelect(product.productName)}
                                                >
                                                    {product.productName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="Stock-details col-md-4">
                                    <label htmlFor="productNo">Product Number</label>
                                    <input type="text" className="form-control" name="productNo" value={formData.productNo} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="Stock-details col-md-4 mb-2">
                                    <label htmlFor="qty">Quantity</label>
                                    <input type="number" className="form-control" name="qty" value={formData.qty} onChange={handleChange} onWheel={(e) => e.target.blur()} />
                                </div>
                                <div className="Stock-details col-md-4 mb-2">
                                    <label htmlFor="productNote">Note / Warranty</label>
                                    <textarea className="form-control" name="productNote" value={formData.productNote} onChange={handleChange} rows={2} />
                                </div>
                                <div className="col-md-4 mt-5">
                                    <button className="btn btn-danger btn-md" type="button" onClick={() => setFormData(initialFormData)}>Clear</button>
                                    <button className="btn btn-primary btn-md">Proceed</button>
                                </div>
                            </div>

                            {/* <div className="product-table">
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <Table
                                        data={data}
                                        columns={Columns}
                                        showSearch={false}
                                        showButton={false}
                                        showActions={false}
                                        showRow={false}
                                        showDate={false}
                                        showPDF={false}
                                    />
                                )}
                            </div> */}

                        </div>
                    </div>
                    {/* <div className="d-grid d-md-flex me-md-2 justify-content-end px-5">
                        <button className="btn btn-danger btn-md mb-2" type="button" onClick={() => setFormData(initialFormData)}>Clear</button>
                        <button className="btn btn-primary btn-md mb-2" type="submit">Proceed</button>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default CreateProductReturn;
