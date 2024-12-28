import './App.css';
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
import Upload from './Pages/Upload/Upload';
import SalesDetails from './components/SalesPages/SalesDetails';
import CostingTable from './Pages/Cost Table/CostingTable';
import CreditNote from './components/StockPages/Credit Note/CreditNote';
import DeliveryNote from './components/DelivaryPages/DeliveryNote';
import SelectDN from './components/DelivaryPages/SelectDN';
import ProformaInvoice from './components/PerformaInvoice/ProformaInvoice';
import InvoiceNote from './components/invoicePages/InvoiceNote';
import DraftSales from './components/SalesPages/DraftSales';
import Qutation from './Pages/Cost Table/Qutation';
import QuotationInvoice from './Pages/Cost Table/QuotationInvoice';
import InternetModal from './components/NoConnection/InternetModal';

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
      <InternetModal />
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

            <Route path="/proformaInvoice/:store/:invoiceNo" element={<ProtectedRoute><ProformaInvoice /></ProtectedRoute>} />
            <Route path="/invoice/:store/:invoiceNo" element={<ProtectedRoute><InvoiceNote /></ProtectedRoute>} />
            <Route path="/createDelivery/:store/:invoiceNo" element={<ProtectedRoute><SelectDN /></ProtectedRoute>} />
            <Route path="/delivery/:store/:invoiceNo" element={<ProtectedRoute><DeliveryNote /></ProtectedRoute>} />
            <Route path="/creditNote/:store/:invoiceNo" element={<ProtectedRoute><CreditNote /></ProtectedRoute>} />
            <Route path="/salesDetails/:store/:invoiceNo" element={<ProtectedRoute><SalesDetails /></ProtectedRoute>} />

            <Route path="/DraftSales/:invoiceId/:invoiceNo" element={<ProtectedRoute><DraftSales /></ProtectedRoute>} />

            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/costing-table" element={<ProtectedRoute><CostingTable /></ProtectedRoute>} />
            <Route path="/qutation" element={<ProtectedRoute><Qutation /></ProtectedRoute>} />
            <Route path="/qutation-invoice" element={<ProtectedRoute><QuotationInvoice /></ProtectedRoute>} />


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