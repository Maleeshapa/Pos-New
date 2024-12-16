import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sales from './Pages/Sales/Sales';
import Customer from './Pages/Customer/Customer';
import Product from './Pages/Product/Product';
import GRN from './Pages/GRN/GRN';
import Stock from './Pages/Stock/Stock';
import Staff from './Pages/Staff/Staff';
import StockReports from './Pages/StockReports/StockReports';
import SalesReports from './Pages/SalesReport/SalesReports';
import Supplier from './Pages/Supplier/Supplier';
import Rental from './Pages/Rental/Rental';
import Login from './Pages/Login';
import Header from './components/SideBar/Header';
import SelectInvoice from './components/invoicePages/selectInvoice';
import Colkan from './components/invoicePages/Colkan';
import Haman from './components/invoicePages/Haman';
import Terra from './components/invoicePages/Terra';
import Upload from './Pages/Upload/Upload';
import SalesDetails from './components/SalesPages/SalesDetails';
import CostingTable from './Pages/Cost Table/CostingTable';
import CreditNote from './components/StockPages/Credit Note/CreditNote';
import ColkanCR from './components/StockPages/Credit Note/ColkanCR';
import HamanCR from './components/StockPages/Credit Note/HamanCR';
import TerraCR from './components/StockPages/Credit Note/Terra';
import ColkanDN from './components/DelivaryPages/ColkanDN';
import HamanDN from './components/DelivaryPages/HamanDN';
import TerraDN from './components/DelivaryPages/TerraDN'
import SelectDN from './components/DelivaryPages/SelectDN';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname.toLowerCase() === '/login';

  return (
    <div className="laptop:origin-top-left">
      <div className='Header-show'>{!isLoginPage && <Header />}</div>
      <div className="d-flex flex-grow-1">
        {!isLoginPage && <SideBar />}
        <div className="d-flex flex-column flex-grow-1" style={{ margin: '0px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/sales/*" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/rental/*" element={<ProtectedRoute><Rental /></ProtectedRoute>} />
            <Route path="/customer/*" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
            <Route path="/product/*" element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path="/grn/*" element={<ProtectedRoute><GRN /></ProtectedRoute>} />
            <Route path="/stock/*" element={<ProtectedRoute><Stock /></ProtectedRoute>} />
            <Route path="/supplier/*" element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
            <Route path="/sales-reports/*" element={<ProtectedRoute><SalesReports /></ProtectedRoute>} />
            <Route path="/stock-reports/*" element={<ProtectedRoute><StockReports /></ProtectedRoute>} />
            <Route path="/staff/*" element={<ProtectedRoute><Staff /></ProtectedRoute>} />

            <Route path="/selectInvoice" element={<ProtectedRoute><SelectInvoice /></ProtectedRoute>} />
            <Route path="/colkan" element={<ProtectedRoute><Colkan /></ProtectedRoute>} />
            <Route path="/haman" element={<ProtectedRoute><Haman /></ProtectedRoute>} />
            <Route path="/terra" element={<ProtectedRoute><Terra /></ProtectedRoute>} />

            <Route path="/selectDn" element={<ProtectedRoute><SelectDN /></ProtectedRoute>} />
            <Route path="/colkanDN" element={<ProtectedRoute><ColkanDN /></ProtectedRoute>} />
            <Route path="/hamanDN" element={<ProtectedRoute><HamanDN /></ProtectedRoute>} />
            <Route path="/terraDN" element={<ProtectedRoute><TerraDN /></ProtectedRoute>} />

            <Route path="/salesDetails/:invoiceNo" element={<ProtectedRoute><SalesDetails /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/costing-table" element={<ProtectedRoute><CostingTable /></ProtectedRoute>} />

            <Route path="/CreditNote/:id" element={<CreditNote />} />
            <Route path="/CreditNote/colkan/:id" element={<ColkanCR />} />
            <Route path="/CreditNote/haman/:id" element={<HamanCR />} />
            <Route path="/CreditNote/terra/:id" element={<TerraCR />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;