import React, { useEffect, useState } from 'react';
import config from '../../config';
import Table from '../Table/Table';

const CreateProductReturn = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
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
        userName: '',
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

    useEffect(() => {
        fetchStores();
        fetchUsers();
        fetchReturnData();
        fetchUserId();
    }, []);



    const fetchUserId = async () => {
        const userName = localStorage.getItem('userName');
        if (userName) {
            try {
                const response = await fetch(`${config.BASE_URL}/user/name/${userName}`);
                if (!response.ok) throw new Error('User not found');
                const userData = await response.json();

                setFormData(prev => ({
                    ...prev,
                    user: userData.userId,
                    userName: userData.userName,
                }));
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('No username found in local storage.');
        }
    };


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
        } catch (err) {
            setError(err.message);
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

            if (data.length > 0) {
                setFormData(prevData => ({
                    ...prevData,
                    store: data[0].storeId,
                }));
            }
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

    return (
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
            <form onSubmit={handleSubmit} className='mb-2' style={{ paddingLeft: '20px' }}>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Invoice Number</label>
                        <input type="number" className="form-control" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} onWheel={(e) => e.target.blur()} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Cashier</label>
                        <input type="text" name="userName" value={formData.userName} className="form-control" disabled />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Store</label>
                        <input type="text" className="form-control" name="store"
                            value={
                                stores.find(store => store.storeId === formData.store)?.storeName || ""
                            }
                            disabled
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Date</label>
                        <input type="datetime-local" className="form-control" name="returnDate" value={formData.returnDate} onChange={handleChange} disabled />
                    </div>
                </div>
            </form>


            <div className="col-md-12">
                <div className="product-table">
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
                </div>
            </div>
            <div className="d-grid d-md-flex me-md-2 justify-content-end px-5">
                <button className="btn btn-danger btn-md mb-2" type="button" onClick={() => setFormData(initialFormData)}>Clear</button>
                <button className="btn btn-primary btn-md mb-2" type="submit">Proceed</button>
            </div>
        </div >
    );
};

export default CreateProductReturn;
