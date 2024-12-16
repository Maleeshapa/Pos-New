import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewSales from '../../components/SalesPages/NewSales';
import SalesHistory from '../../components/SalesPages/SalesHistory';
import Header from '../../components/SideBar/Header'
import Draft from '../../components/SalesPages/Draft';
import Credit from '../../components/SalesPages/Creadit';
import Delivery from '../../components/SalesPages/Delivery';

const Sales = () => {
  return (
    <div>
      <div className='show-Header'><Header /></div>
      <Routes>
        <Route path="new" element={<NewSales />} />
        <Route path="history" element={<SalesHistory />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="draft" element={<Draft />} />
        <Route path="credit" element={<Credit />} />
      </Routes>
    </div>
  );
};

export default Sales;