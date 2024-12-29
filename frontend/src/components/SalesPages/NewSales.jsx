import React, { useState, useEffect } from 'react';
import { CirclePlus, Plus, PlusCircle, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './NewSales.css';
import Table from '../Table/Table'
import config from '../../config';

const NewSales = ({ invoice }) => {
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [productId, setProductId] = useState('');
  const [stockId, setStockId] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('Invoice');
  const [cusId, setCusId] = useState('');
  const [file, setFile] = useState(null);

  const DateTime = () => {
    const now = new Date();
    const NewTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);

    const [date, time] = NewTime.split(', ');
    return { date: date.split('/').reverse().join('-'), time };
  };

  // const Columns = ["Customer Code", 'Customer Name', 'Product Code', 'Product Name', 'Product Price', 'Quantity', 'Discount', 'Total Price', 'Warranty', 'Product ID', 'Stock ID'];
  const Columns = ['Product Code', 'Product Name', 'Product Price', 'Quantity', 'Discount', 'Total Price', 'Warranty', 'Product ID', 'Stock ID'];

  const [formData, setFormData] = useState({
    cusName: '',
    cusNic: '',
    cusCode: '',
    cusAddress: '',
    productNo: '',
    productName: '',
    productPrice: '',
    qty: '',
    discount: '',
    discountRs: '',
    totalPrice: '',
    productNote: '',
    discountPrice: '',
    emi: '',
    amount: '',
    card: '',
    cheque: '',
    online: '',
    bank: '',
    cash: '',
    user: '',
    userName: '',
    paidAmount: '',
    dueAmount: '',
    note: '',
    invoiceDate: DateTime().date + " " + DateTime().time,
    invoiceNo: '',
    purchaseNo: '',
    salesPerson: '',
    cusJob: '',
    cusOffice: ''
  });

  // useEffect(() => {
  //   const fetchLastInvoiceNumber = async () => {
  //     try {
  //       const response = await fetch(`${config.BASE_URL}/invoice/last`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         const nextInvoiceNo = data.lastInvoiceNo + 1;
  //         setFormData(prevData => ({
  //           ...prevData,
  //           invoiceNo: nextInvoiceNo.toString()
  //         }));
  //         console.log(nextInvoiceNo.toString());
  //         console.log(data);
  //       }

  //     } catch (error) {
  //       console.error('Error fetching last invoice number:', error);
  //     }
  //   };
  //   fetchLastInvoiceNumber();
  //   fetchUserId();
  // }, []);

  const fetchUserId = async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      try {
        const response = await fetch(`${config.BASE_URL}/user/name/${userName}`);
        if (!response.ok) throw new Error('User not found');
        const userData = await response.json();
        setFormData(prev => ({ ...prev, user: userData.userId, userName: userData.userName }));
      } catch (err) {
        console.log('err', err);
      }
    } else {
      console.log('err');
    }
  };

  useEffect(() => {
    if (!formData.user) {
      fetchUserId();
    }
  }, [formData.user]);

  const [customerStore, setCustomerStore] = useState('');

  const fetchCustomerData = async (cusName) => {
    try {
      const response = await fetch(`${config.BASE_URL}/customer/cusName/${cusName}`);
      if (response.ok) {
        const customerData = await response.json();
        setCusId(customerData.cusId)
        setFormData(prevData => ({
          ...prevData,
          cusName: customerData.cusName,
          cusJob: customerData.cusJob,
          cusOffice: customerData.cusOffice,
          cusAddress: customerData.cusAddress
        }));
        setCustomerStore(customerData.cusStore)
        setSelectedStore(customerData.cusStore);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'cusName') {
      fetchCustomerData(value);
    }
    if (name === 'productNo' || name === 'productName') {
      try {
        const response = await fetch(`${config.BASE_URL}/product/codeOrName/${value}`);
        if (response.ok) {
          const productData = await response.json();
          setProductId(productData.productId)
          setFormData(prevData => ({
            ...prevData,
            productNo: productData.productCode,
            productName: productData.productName || prevData.productName,
            productPrice: productData.productSellingPrice,
            qty: 1,
            discount: productData.productDiscount,
            totalPrice: productData.productSellingPrice,
            productNote: productData.productWarranty + ' ' + productData.productDescription,
            emi: productData.productEmi
          }));
          if (productData.productId) {
            fetchStockData(productData.productId);
          }
        } else {
          setFormData(prevData => ({
            ...prevData,
            productPrice: '',
            qty: '',
            totalPrice: '',
            productNote: ''
          }));
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    if (name === 'salesPerson') {
      const selectedUserId = value;
      setFormData(prevData => ({
        ...prevData,
        salesPerson: selectedUserId
      }));
    }
  };

  const fetchStockData = async (productId) => {
    try {
      const response = await fetch(`${config.BASE_URL}/stock/product/${productId}`);
      if (response.ok) {
        const stockData = await response.json();
        setStockId(stockData.stockId)
      } else {
        const errorBody = await response.json(); // Log the response body
        console.log('Error fetching stock:', errorBody);
        setFormData(prevData => ({
          ...prevData,
          stockId: ''
        }));
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    const discountedPrice = (formData.productPrice || 0) * (1 - (formData.discount || 0) / 100);
    const newTotalPrice = discountedPrice * (formData.qty || 1);
    setFormData(prevData => ({ ...prevData, totalPrice: newTotalPrice }));
  }, [formData.productPrice, formData.discount, formData.qty]);

  const discount = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));

    const productPrice = parseFloat(formData.productPrice) || 0;
    const qty = parseFloat(formData.qty) || 1;
    const discountRs = name === "discountRs" ? numericValue : parseFloat(formData.discountRs) || 0;
    const discountedPrice = productPrice - discountRs;
    const newTotalPrice = discountedPrice * qty;

    setFormData((prevData) => ({
      ...prevData,
      totalPrice: newTotalPrice.toFixed(2),
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.productNo || !formData.productName || !formData.productPrice || !formData.qty) {
      alert("Please fill in all the product details.");
      return;
    }
    const newRow = [
      // formData.cusName,
      // formData.cusAddress,
      formData.productNo,
      formData.productName,
      formData.productPrice,
      formData.qty,
      formData.discount || formData.discountRs,
      formData.totalPrice,
      formData.productNote,
      productId,
      stockId,
    ];

    setTableData(prevData => [...prevData, newRow]);
    setFormData(prevData => ({
      ...prevData,
      productNo: '',
      productName: '',
      productPrice: '',
      qty: '',
      discount: '',
      discountRs: '',
      totalPrice: '',
      productNote: '',
      emi: ''
    }));
    resetSalesPerson();
    console.log("Added new row:", newRow);
    console.log("Updated table data:", [...tableData, newRow]);

    const updatedTableData = [...tableData, newRow];
    let totalAmount = 0;
    let totalDiscount = 0;
    let payableAmount = 0;

    updatedTableData.forEach((row) => {
      const price = parseFloat(row[4]) || 0;
      const qty = parseFloat(row[5]) || 0;
      const discount = parseFloat(row[6]) || 0;
      const totalPrice = parseFloat(row[7]) || 0;

      totalAmount += price * qty;
      totalDiscount += discount;
      payableAmount += totalPrice;
    });
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: totalAmount.toFixed(2),
      discountPrice: totalDiscount.toFixed(2),
      amount: payableAmount.toFixed(2),
    }));

  };

  const navigate = useNavigate();

  const changeStatus = () => {
    setInvoiceStatus('draft');
  };

  const [selectedStore, setSelectedStore] = useState('');
  const [delivary, setDelivary] = useState('invoice')
  const handleInvoice = (e) => {
    const store = e.target.value;
    setSelectedStore(store);
    setCustomerStore(store);
  };

  const handleDelivary = (e) => {
    if (e.target.checked) {
      setDelivary('notDelivered');
      setInvoiceStatus('delivery');
    } else {
      setDelivary('invoice');
    }
  }
  const [showCard, setCard] = useState(false);
  const [showCash, setCash] = useState(false);
  const [showCredit, setCredit] = useState(false);
  const [showCheque, setCheque] = useState(false);
  const [showBank, setBank] = useState(false);
  const [showOnline, setOnline] = useState(false);

  const handleCard = (e) => {
    setCard(e.target.checked)
  }
  const handleCash = (e) => {
    setCash(e.target.checked)
  }
  const handleCredit = (e) => {
    setCredit(e.target.checked)
  }
  const handleCheque = (e) => {
    setCheque(e.target.checked)
  }
  const handleBank = (e) => {
    setBank(e.target.checked)
  }
  const handleOnlinePay = (e) => {
    setOnline(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoiceData = {
        invoiceDate: DateTime().date + " " + DateTime().time,
        status: invoiceStatus,
        purchaseNo: formData.purchaseNo,
        store: selectedStore,
        cusId: cusId,
      };
      console.log('Sending invoice data:', invoiceData);

      const invoiceResponse = await fetch(`${config.BASE_URL}/invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (!invoiceResponse.ok) {
        const errorData = await invoiceResponse.json();
        console.error('Invoice error details:', errorData);
        throw new Error(errorData.error || 'Failed to create invoice');
      }
      const invoiceResult = await invoiceResponse.json();
      console.log('Invoice created:', invoiceResult);

      //image
      const formDataImage = new FormData();
      formDataImage.append("image", file);

      const imageResponse = await fetch(`${config.BASE_URL}/invoice/${invoiceResult.invoiceId}`, {
        method: "POST",
        body: formDataImage,
      });

      // if (!imageResponse.ok) {
      //   const errorData = await imageResponse.json();
      //   console.error("Image upload error details:", errorData);
      //   throw new Error(errorData.error || "Failed to upload image");
      // }

      const imageResult = await imageResponse.json();
      console.log("Image uploaded successfully:", imageResult);

      //product------------------------------------------------------------------------------------------
      const invalidProducts = tableData.filter(row => !row[3]);
      if (invalidProducts.length > 0) {
        throw new Error('One or more products have an invalid product ID.');
      }

      const productInvoice = tableData.map(row => ({
        productId: row[9],
        stockId: row[10],
        invoiceId: invoiceResult.invoiceId,
        invoiceNo: invoiceResult.invoiceNo,
        totalAmount: row[4] * row[5],
        invoiceQty: row[5],
        invoiceProductStatus: delivary,
      }));
      console.log('Invoice No before sending:', formData.invoiceNo);

      const productResponse = await fetch(`${config.BASE_URL}/invoiceProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productInvoice),
      });

      //deliveryNote---------------------------------------------------------------
      const deliveryNote = tableData.map(row => ({
        productId: row[9],
        stockId: row[10],
        invoiceId: invoiceResult.invoiceId,
        invoiceNo: invoiceResult.invoiceNo,
        totalAmount: row[4] * row[5],
        invoiceQty: row[5],
        sendQty: row[5],
        deliveryStatus: delivary,
      }));
      console.log('Invoice No before sending:', formData.invoiceNo);

      const deliveryResponse = await fetch(`${config.BASE_URL}/deliveryNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryNote),
      });

      const deliveryResult = await deliveryResponse.json();
      console.log('Delivery Note data :', deliveryResult);
      console.log('Delivery Status:', delivary);

      if (!productResponse.ok) {
        const errorData = await productResponse.json();

        if (errorData.insufficientProducts) {
          const errorMessage = errorData.insufficientProducts
            .map(product =>
              `Product: ${product.productName}\n` +
              `Available Stock: ${product.availableStock}\n` +
              `Requested Quantity: ${product.requestedQuantity}`
            )
            .join('\n\n');

          alert(`Insufficient Stock:\n${errorMessage}`);
          return;
        }

        console.error('Product error details:', errorData);
        throw new Error(errorData.error || 'Failed to send Product');
      }

      const productResult = await productResponse.json();
      console.log('Product ID before sending:', productId);
      console.log('Sending product data:', productInvoice);
      console.log('product created:', productResult);

      //transaction Data----------------------------------------------------------------------------------
      const transactionData = {
        transactionType: [
          showCard && 'card',
          showCash && 'cash',
          showCredit && 'credit',
          showCheque && 'cheque',
          showOnline && 'online',
          showBank && 'bank'
        ].filter(Boolean).join(' '),
        price: parseFloat(formData.amount) || 0,
        dateTime: DateTime().date + " " + DateTime().time,
        discount: parseFloat(formData.discountPrice) || 0,
        note: formData.note || '',
        paid: parseFloat(formData.paidAmount) || 0,
        due: parseFloat(formData.dueAmount) || 0,
        invoiceId: invoiceResult.invoiceId,
        userId: formData.user,
      };

      console.log('Sending transaction data:', transactionData);

      const transactionResponse = await fetch(`${config.BASE_URL}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!transactionResponse.ok) {
        const errorData = await transactionResponse.json();
        console.error('Transaction error details:', errorData);
        throw new Error(errorData.error || 'Failed to create transaction');
      }

      const transactionResult = await transactionResponse.json();
      console.log('Transaction created:', transactionResult);


      alert('sales created successfully!');

      if (invoiceStatus === 'draft') {
        navigate('/sales/new')
      }
      else if (delivary === 'notDelivered') {
        navigate(`/delivery/${selectedStore}/${invoiceResult.invoiceNo}`)
      }
      else if (!selectedStore) {
        alert('Select Department')
      }
      else {
        navigate(`/invoice/${selectedStore}/${invoiceResult.invoiceNo}`)
      }
      setTableData([]);
      resetForm();
      resetSalesPerson();
    } catch (error) {
      console.error('Error:', error);
      alert(`${error.message}`);
    }
  };

  const resetForm = () => {
    setCustomerStore('');
    setTableData([]);
    setFormData({
      cusName: '',
      cusNic: '',
      cusCode: '',
      productNo: '',
      productName: '',
      productPrice: '',
      qty: '',
      discount: '',
      discountRs: '',
      totalPrice: '',
      productNote: '',
      emi: '',
      amount: '',
      card: '',
      cheque: '',
      online: '',
      bank: '',
      cash: '',
      paidAmount: '',
      dueAmount: '',
      note: '',
      totalAmount: '',
      discountPrice: '',
      cusJob: '',
      cusOffice: '',
      purchaseNo: '',
      cusAddress: ''
    });
  };

  const resetSalesPerson = () => {
    setFormData(prevData => ({
      ...prevData,
      salesPerson: 'select',
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));

    const totalPaid = parseFloat(name === 'card' ? numericValue : formData.card || 0)
      + parseFloat(name === 'cheque' ? numericValue : formData.cheque || 0)
      + parseFloat(name === 'credit' ? numericValue : formData.credit || 0)
      + parseFloat(name === 'bank' ? numericValue : formData.bank || 0)
      + parseFloat(name === 'cash' ? numericValue : formData.cash || 0);

    const payableAmount = parseFloat(formData.amount) || 0;
    const dueAmount = payableAmount - totalPaid;

    setFormData((prevData) => ({
      ...prevData,
      paidAmount: totalPaid.toFixed(2),
      dueAmount: dueAmount.toFixed(2),
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Capture the selected file
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Sales Invoice</h4>
        <form action="" onSubmit={handleSubmit} >
          <div className="customer-form">
            <div className="sales-add-form">
              <div className="customer">
                <div className="subCaption">
                  <p><User />Customer Details</p>
                  <button className="btn btn-success btn-sm mb-3" type="button">
                    <Link to={'/customer/customer-list'} style={{ color: 'white', textDecoration: 'none' }}>
                      Create Customer
                    </Link>
                  </button>


                </div>

                <div className="customer-details">
                  <input onChange={handleChange} value={formData.cusName} type="text" className="form-control" name="cusName" id="cusName" placeholder="Customer Name" />
                </div>
                <div className="customer-details">
                  <input onChange={handleChange} value={formData.cusJob} type="text" className="form-control" name="cusJob" id="cusJob" placeholder="Customer Job Position" />
                </div>
                <div className="customer-details">
                  <input onChange={handleChange} value={formData.cusOffice} type="text" className="form-control" name="cusOffice" id="cusOffice" placeholder="Customer Company" />
                </div>
                <div className="customer-details">
                  <input onChange={handleChange} value={formData.cusAddress} type="text" className="form-control" name="cusAddress" id="cusAddress" placeholder="Customer Address" />
                </div>
                <div className="seltction_options">
                  <div className="store">

                    <div className="payment-details">
                      <div className="payment-details-amount">
                        <input type="radio" name="store" value='colkan' id="colkan" checked={customerStore === 'colkan'} onChange={handleInvoice} style={{ width: '20px' }} />
                        <label className='payment-lable' htmlFor="">Colkan</label>
                      </div>
                    </div>

                    <div className="payment-details">
                      <div className="payment-details-amount">
                        <input type="radio" name="store" value='terra' id="terra" checked={customerStore === 'terra'} onChange={handleInvoice} />
                        <label className='payment-lable' htmlFor="">Terra</label>
                      </div>
                    </div>

                    <div className="payment-details">
                      <div className="payment-details-amount">
                        <input type="radio" name="store" value='haman' id="haman" checked={customerStore === 'haman'} onChange={handleInvoice} />
                        <label className='payment-lable' htmlFor="">Haman</label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="product">
                <div className="subCaption d-flex justify-content-between  mb-3">
                  <p className="mb-0 d-flex align-items-center">
                    <ShoppingCart className="me-2" /> Product Details
                  </p>
                  <button
                    className="btn btn-success btn-sm me-2"
                    type="button"
                    onClick={() => navigate('/product/create')}
                  >
                    Create Product
                  </button>

                </div>

                <div className="row">
                  <div className="product-details col-md-4 mb-2">
                    <input onChange={handleChange} value={formData.productNo} type="text" name="productNo" className="form-control" id="productNo" placeholder="Product Code" />
                  </div>
                  <div className="product-details col-md-8 mb-2">
                    <input onChange={handleChange} value={formData.productName} type="text" name="productName" className="form-control" id="productName" placeholder="Product Name" />
                  </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.productPrice} type="number" name="productPrice" className="form-control" id="price" placeholder="Product Price" onWheel={(e) => e.target.blur()} />
                  </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.qty} type="number" onWheel={(e) => e.target.blur()} name="qty" className="form-control" id="qty" placeholder="Enter Quantity" />
                  </div>

                  {/* <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.discount} type="number" onWheel={(e) => e.target.blur()} name="discount" className="form-control" id="discount" placeholder="Product Discount %" />
                  </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={discount} value={formData.discountRs} type="number" onWheel={(e) => e.target.blur()} name="discountRs" className="form-control" id="discountRs" placeholder="Product Discount - Rs LKR" />
                  </div> */}


                  <div className="product-details col-md-3 mb-2">
                    <label htmlFor="discountType">Discount Type</label>
                    <select
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      value={formData.discountType || ''}
                      name="discountType"
                      className="form-control"
                      id="discountType"
                    >
                      <option value="">Select Type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>

                  {formData.discountType === 'percentage' && (
                    <div className="product-details col-md-3 mb-2">
                      <label htmlFor="discount">Discount (%)</label>
                      <input
                        onChange={handleChange}
                        value={formData.discount}
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        name="discount"
                        className="form-control"
                        id="discount"
                        placeholder="Product Discount %"
                      />
                    </div>
                  )}

                  {formData.discountType === 'fixed' && (
                    <div className="product-details col-md-3 mb-2">
                      <label htmlFor="discountRs">Discount (LKR)</label>
                      <input
                        onChange={handleChange}
                        value={formData.discountRs}
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        name="discountRs"
                        className="form-control"
                        id="discountRs"
                        placeholder="Product Discount - Rs LKR"
                      />
                    </div>
                  )}



                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.totalPrice} type="number" onWheel={(e) => e.target.blur()} name="totalPrice" className="form-control" id="totalPrice" placeholder="Total Price" />
                  </div>


                  <div className="product-details col-md-6 mb-2">
                    <textarea onChange={handleChange} value={formData.productNote} name="productNote" className="form-control" id="productNote" placeholder="Warranty" rows="3"></textarea>
                  </div>


                </div>
              </div>
            </div>
            <div className="sales-addbtn d-grid d-md-flex me-md-2 justify-content-end px-5">
              <button className="btn btn-primary btn-md" onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>

          <div className="product-table">
            <Table
              data={tableData}
              columns={Columns}
              showSearch={false}
              showButton={false}
              showActions={false}
              showRow={false}
              showDate={false}
              showPDF={false}
            />
          </div>

          <div className="payment-form">
            <div className="payment-form-group">
              <div className="sales-person-box">

                <div className="sales-person">
                  <label id='label'>Cashier</label>
                  <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="form-control" readOnly />
                </div>
                <div className="sales-person">
                  <label htmlFor="" id='label'>Invoice Date</label>
                  <input type="datetime-local" className="form-control" name="invoiceDate" onChange={handleChange} value={formData.invoiceDate} id="date" />
                </div>
                <div className="sales-person">
                  <label id='label'>Purchase Order No</label>
                  <input type="text" className="form-control" name="purchaseNo" id='purchaseNo' value={formData.purchaseNo} onChange={handleChange} />
                </div>
                <div className="sales-person">
                  <label id='label'>Purchase Order Image</label>
                  <input type="file" className="form-control" onChange={handleFileChange} accept="image/*,.pdf" />
                </div>
              </div>

              <div className="amount-box">
                <div className="amount-group">
                  <label htmlFor="" id='label'>Total Amount</label>
                  <input type="number" className="form-control" value={formData.totalAmount} onChange={handleChange} id='readOnly' readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>Discount</label>
                  <input type="number" className="form-control" value={formData.discountPrice} onChange={handleChange} id='readOnly' readOnly />
                </div>
              </div>
            </div>

            <div className="payment-form-group">
              <div className="payment-details-box">
                <div className="payment-details">
                  <label htmlFor="" id='label'>Payable Amount</label>
                  <input type="number" className="form-control" value={formData.amount} id='readOnly' readOnly />
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="cashAmount" id="cashAmount" onChange={handleCash} />
                    <label htmlFor="" id='label'>Cash Payment</label>
                  </div>

                  {showCash && (
                    <input type="number" className="form-control" id='payment' name='cash' value={formData.cash} onChange={handlePaymentChange} placeholder='Cash Amount' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="card" id="card" onChange={handleCard} />
                    <label htmlFor="" id='label'>Card Payment</label>
                  </div>
                  {showCard && (
                    <input type="number" className="form-control" id='' name='card' onChange={handlePaymentChange} value={formData.card} placeholder='Card Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="credit" id="credit" onChange={handleCredit} />
                    <label htmlFor="" id='label'>Credit Payment</label>
                  </div>
                  {showCredit && (
                    <input type="number" className="form-control" id='payment' name='credit' value={formData.credit} onChange={handlePaymentChange} placeholder='credit Amount' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="cheque" id="cheque" onChange={handleCheque} />
                    <label htmlFor="" id='label'>Cheque Payment</label>
                  </div>
                  {showCheque && (
                    <input type="number" className="form-control" id='' name='cheque' value={formData.cheque} onChange={handlePaymentChange} placeholder='Cheque Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="online" id="online" onChange={handleOnlinePay} />
                    <label htmlFor="" id='label'>Online Payment</label>
                  </div>
                  {showOnline && (
                    <input type="number" className="form-control" id='' name='online' value={formData.online} onChange={handlePaymentChange} placeholder='online Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="bank" id="bank" onChange={handleBank} />
                    <label htmlFor="" id='label'>Bank Payment</label>
                  </div>
                  {showBank && (
                    <input type="number" className="form-control" id='' name='bank' value={formData.bank} onChange={handlePaymentChange} placeholder='Bank Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
              </div>
              <div className="amount-box">
                <div className="amount-group">
                  <label htmlFor="" id='label'>Paid Amount</label>
                  <input className="form-control" value={formData.paidAmount} type="number" onWheel={(e) => e.target.blur()} name="totalAmount" id="readOnly" readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>Due Amount</label>
                  <input className="form-control" type="number" value={formData.dueAmount} onWheel={(e) => e.target.blur()} name="discount" id="readOnly" readOnly />
                </div>
                <div className="seltction_options">
                  <div className="store">
                    <div className="payment-details-amount">
                      <input type="checkbox" name="notDelivered" value='notDelivered' id="notDelivered" onChange={handleDelivary} />
                      <label className='payment-lable' htmlFor="">Delivey</label>
                    </div>
                  </div>
                </div>
                <div className="btn-pos mt-4">
                  <div className="payment-form-button d-grid d-md-flex me-md-2 justify-content-end px-5">
                    <button className='btn btn-warning mb-2' type='submit' onClick={changeStatus}>Draft</button>
                  </div>
                  <div className="payment-form-button  d-grid d-md-flex me-md-2 justify-content-end px-5">
                    <button className='btn btn-danger btn-md mb-2' type='reset' onClick={resetForm} >Cancel</button>
                    <button className='btn btn-primary btn-md mb-2' type='submit'>Create invoice</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div >
    </div >
  )
}

export default NewSales;