import React, { useEffect, useState } from 'react';
import './NewStock.css';
import Table from '../Table/Table';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const NewStock = () => {

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState([]);
  const [preview, setPreview] = useState('');
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [supplierSuggestions, setSupplierSuggestions] = useState([]);
  const [tableData, setTableData] = useState(data || []);


  const columns = ['Stock Name', 'Supplier Name', 'Store', 'Product Name', 'Category', 'Mfd Date', 'Exp Date', 'Unit Price', 'Quantity', 'Description', 'Total Price'];

  const [formData, setFormData] = useState({
    stockName: '',
    supplierSearch: '',
    store: '',
    productSearch: '',
    category: '',
    mfd: '',
    exp: '',
    price: '',
    qty: '',
    description: '',
    totalPrice: '',

    totalQty: '',
    total: '',
    vat: '',
    cashAmount: '',
    chequeAmount: '',
    due: '',
    vatWithTotal: '',
  });

  const initialFormState = {
    stockName: '',
    supplierSearch: '',
    store: '',
    productSearch: '',
    category: '',
    mfd: '',
    exp: '',
    price: '',
    qty: '',
    description: '',

    totalPrice: '',
    totalQty: '',
    total: '',
    vat: '',
    cashAmount: '',
    chequeAmount: '',
    due: '',
    vatWithTotal: '',
  };

  useEffect(() => {
    fetchStores();
    fetchCategories();
    fetchSuppliers();
  }, []);

  //store
  const fetchStores = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stores`);
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      } else {
        console.error('Failed to fetch stores');
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  //categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  //suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/suppliers`);
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Failed to fetch suppliers');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  //product search
  const handleProductSearch = async (e) => {
    const query = e.target.value;
    setProductSearch(query);

    if (query.length >= 2) {
      try {
        const response = await fetch(`${config.BASE_URL}/products/suggestions?query=${query}`);
        if (response.ok) {
          const suggestions = await response.json();
          setProductSuggestions(suggestions);
        } else {
          console.error('Failed to fetch product suggestions');
        }
      } catch (error) {
        console.error('Error fetching product suggestions:', error);
      }
    } else {
      setProductSuggestions([]);
    }
  };

  //product select
  const handleProductSelect = async (productName) => {
    setProductSearch(productName);
    setProductSuggestions([]);

    try {
      const response = await fetch(`${config.BASE_URL}/product/productName/${productName}`);
      if (response.ok) {
        const product = await response.json();
        setFormData(prevData => ({
          ...prevData,
          product: product.productId,
          category: product.category_categoryId,
          price: product.productBuyingPrice,
        }));
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  //supplier search
  const handleSupplierSearch = async (e) => {
    const query = e.target.value;
    setSupplierSearch(query);

    if (query.length >= 2) {
      try {
        const response = await fetch(`${config.BASE_URL}/suppliers/suggestions?query=${query}`);
        if (response.ok) {
          const suggestions = await response.json();
          setSupplierSuggestions(suggestions);
        } else {
          console.error('Failed to fetch supplier suggestions');
        }
      } catch (error) {
        console.error('Error fetching supplier suggestions:', error);
      }
    } else {
      setSupplierSuggestions([]);
    }
  };

  //supplier select
  const handleSupplierSelect = async (supplierName) => {
    setSupplierSearch(supplierName);
    setSupplierSuggestions([]);

    try {
      const response = await fetch(`${config.BASE_URL}/supplier/supplierName/${supplierName}`);
      if (response.ok) {
        const supplier = await response.json();
        setFormData(prevData => ({
          ...prevData,
          supplier: supplier.supplierId,
          supplierName: supplier.supplierName,
        }));
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };


  const resetForm = () => {
    setFormData(initialFormState);
    setPreview('');
    setProductSearch('');
    setSupplierSearch('');
  };

  const navigate = useNavigate();

  const handleNewStockClick = () => {
    navigate('/stock-reports/current-stock');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // Calculate totalPrice when price or qty changes
      if (name === 'price' || name === 'qty') {
        const price = parseFloat(newData.price) || 0;
        const qty = parseFloat(newData.qty) || 0;
        newData.totalPrice = (price * qty).toFixed(2);
      }

      // Calculate VAT and total price with VAT
      if (name === 'vat' || name === 'total') {
        const vat = parseFloat(newData.vat) || 0;
        const total = parseFloat(newData.total) || 0;
        const vatAmount = (vat / 100) * total;
        newData.vatWithTotal = (total + vatAmount).toFixed(2);
      }

      // Calculate due amount
      const cashAmount = parseFloat(newData.cashAmount) || 0;
      const chequeAmount = parseFloat(newData.chequeAmount) || 0;
      const totalPaidAmount = cashAmount + chequeAmount;

      newData.due = (parseFloat(newData.vatWithTotal) - totalPaidAmount).toFixed(2);

      return newData;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const stock = tableData.map(row => ({
        stockName: row[0],
        supplier_supplierId: row[1],
        store_storeId: row[2],
        products_productId: row[3],
        category_categoryId: row[4],
        stockPrice: parseFloat(row[7]),
        stockQty: parseInt(row[8], 10),
        stockDescription: row[9],
        stockStatus: 'In Stock',
      }));

      const invalidRows = stock
        .map((item, index) => {
          const errors = [];
          if (!item.stockName) errors.push("Stock Name is missing");
          if (isNaN(item.stockPrice)) errors.push("Stock Price is invalid");
          if (isNaN(item.stockQty)) errors.push("Stock Quantity is invalid");
          return errors.length ? { rowIndex: index + 1, errors } : null;
        })
        .filter(Boolean);

      if (invalidRows.length > 0) {
        const errorDetails = invalidRows
          .map(row => `Row ${row.rowIndex}: ${row.errors.join(", ")}`)
          .join("\n");
        setError(`Invalid stock data:\n${errorDetails}`);
        return;
      }

      const response = await fetch(`${config.BASE_URL}/stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
      });

      if (!response.ok) {
        throw new Error('Failed to submit stock data');
      }

      setSuccessMessage('Stock data submitted successfully!');
      setError(null);
      resetForm();
      setTableData([]);
    } catch (error) {
      console.error('Error submitting stock data:', error);
      setError('Failed to create new stock. Please try again.');
    }
  };

  const handleAddStock = (e) => {
    e.preventDefault();

    if (!formData.stockName || !formData.supplier || !formData.category || !formData.totalPrice) {
      alert("Please fill in the necessary details.");
      return;
    }

    const newRow = [
      formData.stockName,
      formData.supplier,
      formData.store,
      formData.product,
      formData.category,
      formData.mfd || 'N/A',
      formData.exp || 'N/A',
      formData.price,
      formData.qty,
      formData.description,
      formData.totalPrice,
    ];

    setTableData(prevData => [...prevData, newRow]);
    resetForm();
  };

  useEffect(() => {
    const totalQuantity = tableData.reduce((sum, row) => sum + parseInt(row[8] || 0, 10), 0);
    const totalAmount = tableData.reduce((sum, row) => sum + parseFloat(row[10] || 0), 0);

    setFormData((prevData) => ({
      ...prevData,
      totalQty: totalQuantity,
      total: totalAmount.toFixed(2),
    }));
  }, [tableData]);

  const handleDelete = (rowIndex) => {
    setTableData(prevData => prevData.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="scrolling-container">
      <div className="container-fluid my-5 mt-2">
        <h4 className="mb-4">Create New Stock</h4>
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

        <div className="d-flex justify-content-end mt-4">
          <button className='btn btn-warning' onClick={handleNewStockClick}>Current Stock</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <label htmlFor="stockName" className="form-label">Stock Name / Stock Number</label>
              <input type="text" name="stockName" value={formData.stockName} className="form-control" onChange={handleChange} required />

              <div className="row mt-2">
                <div className="col-md-6">
                  <label htmlFor="supplier" className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    name="supplierSearch"
                    className="form-control"
                    value={supplierSearch}
                    onChange={handleSupplierSearch}
                    required
                  />
                  {supplierSuggestions.length > 0 && (
                    <ul className="list-group mt-0">
                      {supplierSuggestions.map((supplier, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSupplierSelect(supplier.supplierName)}
                        >
                          {supplier.supplierName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="store" className="form-label">Store</label>
                  <select name="store" value={formData.store} onChange={handleChange} className="form-select" required>
                    <option value="">Select Store</option>
                    {stores.map((store) => (
                      <option key={store.storeId} value={store.storeId}>
                        {store.storeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <label htmlFor="" className='mb-1'>Description</label>
                  <textarea onChange={handleChange} name='description' id='' value={formData.description} className='form-control' rows={2}></textarea>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="productSearch" className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="productSearch"
                    className="form-control"
                    value={productSearch}
                    onChange={handleProductSearch}
                    required
                  />
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

                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">Product Category</label>
                  <input
                    type="text"
                    name="category"
                    value={categories.find(c => c.categoryId === formData.category)?.categoryName || ''}
                    className="form-control"
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="" className='mb-1'>Manufacture Date </label>
                  <input onChange={handleChange} type="date" name='mfd' id='' onWheel={(e) => e.target.blur()} value={formData.mfd} className='form-control' />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="" className='mb-1'>Expiration date</label>
                  <input onChange={handleChange} type="date" name='exp' id='' onWheel={(e) => e.target.blur()} value={formData.exp} className='form-control' />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="number" name="price" value={formData.price} className="form-control" onChange={handleChange} readOnly />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="qty" className="form-label">Quantity</label>
                  <input type="number" name="qty" value={formData.qty} required className="form-control" onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="totalPrice" className="form-label">Total Price</label>
                  <input type="text" name="totalPrice" value={formData.totalPrice} className="form-control" readOnly />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-primary" onClick={handleAddStock}>Add Stock +</button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <Table
              search="Search"
              data={tableData}
              columns={columns}
              showButton={false}
              showActions={true}
              showSearch={false}
              showPDF={false}
              showDate={false}
              showRow={false}
              showEdit={false}
              onDelete={handleDelete}
            />
          </div>

          <div className='row mt-3 justify-content-end'>
            <div className="col-md-2 mb-3">
              <label htmlFor="qty" className="form-label">Total Quantity</label>
              <input type="number" name="totalQty" value={formData.totalQty} required className="form-control" onChange={handleChange} readOnly />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Total Amount</label>
              <input type="number" name="total" value={formData.total} className="form-control" onChange={handleChange} readOnly />
            </div>
          </div>

          <div className='row mt-3'>
            <div className="col-md-2 mb-3">
              <label htmlFor="totalPrice" className="form-label">Vat</label>
              <input type="number" name="vat" value={formData.vat} className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="totalPrice" className="form-label">Vat + Total</label>
              <input type="number" name="vatWithTotal" value={formData.vatWithTotal} className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Cash Amount</label>
              <input type="number" name="cashAmount" value={formData.cashAmount} className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="qty" className="form-label">Cheque Amount</label>
              <input type="number" name="chequeAmount" value={formData.chequeAmount} required className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="qty" className="form-label">due</label>
              <input type="number" name="due" value={formData.due} required className="form-control" onChange={handleChange} readOnly />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <button type="reset" className="btn btn-danger me-2" onClick={resetForm}>Clear</button>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>New Stock</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewStock;