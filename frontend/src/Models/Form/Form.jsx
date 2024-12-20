import React, { useState, useEffect } from 'react';
import './Form.css';
import config from '../../config';

const Form = ({ closeModal, onSave, cus }) => {
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    jobPosition: '',
    company: '',
    phone: '',
    email: '',
    cusStore:'',
  });

  // UseEffect to populate the form with customer data if editing
  useEffect(() => {
    if (cus) {
      setFormData({
        name: cus.cusName || '',
        jobPosition: cus.cusJob || '',
        company: cus.cusOffice || '',
        phone: cus.cusPhone || '',
        email: cus.cusEmail || '', 
        cusStore:cus.cusStore || '',
      });
    }
  }, [cus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove error message when user starts correcting the input
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Validation function
  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = 'Phone number must be 10 digits.';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required.';
    }

    return errors;
  };
  const handleSubmitCus = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const customerData = {
      cusCode: generateCustomerCode(),
      cusName: formData.name,
      cusJob: formData.jobPosition,
      cusOffice: formData.company,      
      cusAddress: formData.address,
      cusPhone: formData.phone,
      cusStore:formData.cusStore,
    };

    console.log('Customer data:', customerData);

    try {
      const url = cus
        ? `${config.BASE_URL}/customer/${cus.cusId}`
        : `${config.BASE_URL}/customer`;
      const method = cus ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      console.log('Response status:', response.status);

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log(cus ? 'Customer updated:' : 'Customer created:', responseData);
        setError(cus ? 'Successfully Updated!' : 'Successfully Created!');
        onSave(customerData);
        closeModal();
      } else {
        console.error('Failed to save customer:', responseData);
        setError(responseData.error || 'An error occurred while saving the customer.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while saving the customer.');
    }
  };

  let lastCustomerCode = 0;

  const generateCustomerCode = () => {
    lastCustomerCode += 1;
    return `cus${String(lastCustomerCode).padStart(3, '0')}`;
  };


  return (
    <div style={{ placeItems: 'center' }}>
      <h2>{cus ? 'Edit Customer' : 'New Customer'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmitCus} className="form-container">
        <div className="form-group-1">

          <div className="form-group">            
            <label htmlFor="name">Name <span>*</span></label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              aria-describedby={formErrors.name ? 'name-error' : undefined}
            />
            {formErrors.name && <span id="name-error" className="error-text">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label>Job Position</label>
            <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange} placeholder="Enter Job Position" />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter Workplace" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
              required
              aria-describedby={formErrors.phone ? 'phone-error' : undefined}
            />
            {formErrors.phone && <span id="phone-error" className="error-text">{formErrors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address <span>*</span></label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
              aria-describedby={formErrors.address ? 'address-error' : undefined}
            />
            {formErrors.address && <span id="address-error" className="error-text">{formErrors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="cusStore">Store<span>*</span></label>
           <select name="cusStore" id="cusStore" value={formData.cusStore} onChange={handleChange}  >
            <option value="">select store</option>
            <option value="colkan">Colkan</option>
            <option value="haman">Haman</option>
            <option value="terra">Terra</option>
           </select>
            {formErrors.cusStore && <span id="cusStore-error" className="error-text">{formErrors.cusStore}</span>}
          </div>
         
         

          <div className="form-actions">
            <button type="button" onClick={closeModal}>Close</button>
            <button type="submit">{cus ? 'Update' : 'Save Changes'}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
