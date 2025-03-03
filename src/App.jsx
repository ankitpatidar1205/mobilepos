import { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./assets/style.css";
import Header from "./LayOut/Header";
import Loader from "./LayOut/Loader";
import Customer from "./Components/Customer/Customer";
import AddCustomer from "./Components/Customer/AddCustomer";
import Warrients from "./Components/Warrients/Warrients";
import AddWarrient from "./Components/Warrients/AddWarrient";
import SalesByItemsType from "./Components/Report/SalesByItemsType";
import SalesByItem from "./Components/Report/SalesByItem";
import AmountByPaymentTypeReport from "./Components/Report/AmountByPaymentTypeReport ";
import CustomerSalesReport from "./Components/Report/CustomerSalesReport ";
import EmployeeReport from "./Components/Report/EmployeeReport";
import MultiStoreSaleSummaryReport from "./Components/Report/MultiStoreSaleSummaryReport ";
import RegisterSalesReport from "./Components/Report/RegisterSalesReport";
import RevenueBySalesReport from "./Components/Report/RevenueBySalesReport ";
import PointOfSale from "./Components/PointofsSale/PointOfSale";
import ManageInvoices from "./Components/Repair/ManageInvoices";
import ManageTickets from "./Components/Repair/ManageTickets";
import CreateTicket from "./Components/Repair/CreateTicket";
import ManageEstimates from "./Components/Repair/ManageEstimates";
import RepairPart from "./Components/Inventory/RepairPart";
import UpComningNetwork from "./Components/Inventory/UpComningNetwork";
import Product from "./Components/Inventory/Product";
import BasicDetail from "./Components/Inventory/BasicDetail";
import TradeIn from "./Components/Inventory/TradeIn";
import Miscellaneous from "./Components/Inventory/Miscellaneous";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadcrumbCustom from "./utils/BreadcrumbCustom";
import AddProduct from "./Components/Inventory/product/AddProduct";
import Sidebar from "./LayOut/Sidebar";
import RepairManagement from "./Components/Repair/RepairManagement";
import { BrandManagement, ModalManagement, ProductManagement } from "./Components/FormModal/ManagementPage";
import CategoryPage from "./Components/Inventory/SiteData/CategoryPage";
import BrandPage from "./Components/Inventory/SiteData/BrandPage";
import ViewProduct from "./Components/Inventory/SiteData/ViewProduct";
import TaxPage from "./Components/Inventory/TaxPage";
import ViewInvoice from "./Components/Repair/ViewInvoice";
// Lazy load components
const Login = lazy(() => import("./Auth/Login"));
const AdminDashboard = lazy(() => import("./Components/Dashboard/AdminDashboard"));


function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isAuthPage = location.pathname === "/"

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {!isAuthPage && <Header toggleSidebar={toggleSidebar} />}
      {!isAuthPage && <Sidebar />}
      <div className="app-container sidebar-home-section">
        <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
          <Suspense fallback={<div><Loader /></div>}>
            {!isAuthPage && <BreadcrumbCustom />}
            <Routes>

              <Route path="/" element={<Login />} />

              {/* AdminDashboard */}
              <Route path="/dashboard" element={<AdminDashboard />} />
              {/* Customer */}
              <Route path="/Customer" element={<Customer />} />
              <Route path="/AddCustomer" element={<AddCustomer />} />
              {/* Warrients */}
              <Route path="/Warrients" element={<Warrients />} />
              <Route path="/AddWarrient" element={<AddWarrient />} />
              {/* PointOfSale */}
              <Route path="/PointOfSale" element={<PointOfSale />} />
              {/* inventory */}
              <Route path="/RepairPart" element={<RepairPart />} />
              <Route path="/UpComningNetwork" element={<UpComningNetwork />} />

              <Route path="/products" element={<Product />} />
              <Route path="/create-product" element={<AddProduct />} />
              <Route path="/update-product/:id" element={<AddProduct />} />

              <Route path="/BasicDetail" element={<BasicDetail />} />
              <Route path="/TradeIn" element={<TradeIn />} />
              <Route path="/Miscellaneous" element={<Miscellaneous />} />
              {/* repair */}
              <Route path="/ManageInvoices" element={<ManageInvoices />} />
              <Route path="/repair-parts" element={<RepairManagement />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/modal" element={<ModalManagement />} />
              <Route path="/ManageTickets" element={<ManageTickets />} />
              <Route path="/CreateTicket" element={<CreateTicket />} />
              <Route path="/ManageEstimates" element={<ManageEstimates />} />
              {/* report */}
              <Route path="/SalesByItemsType" element={<SalesByItemsType />} />
              <Route path="/SalesByItem" element={<SalesByItem />} />
              <Route path="/AmountByPaymentTypeReport" element={<AmountByPaymentTypeReport />} />
              <Route path="/CustomerSalesReport" element={<CustomerSalesReport />} />
              <Route path="/EmployeeReport" element={<EmployeeReport />} />
              <Route path="/MultiStoreSaleSummaryReport" element={<MultiStoreSaleSummaryReport />} />
              <Route path="/RegisterSalesReport" element={<RegisterSalesReport />} />
              <Route path="/RevenueBySalesReport" element={<RevenueBySalesReport />} />
              <Route path="/view-product/:id" element={<ViewProduct />} />
              <Route path="/Tax" element={<TaxPage />} />
              <Route path="/ViewInvoice/:id" element={<ViewInvoice />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <ToastContainer />
      <AppContent />
    </Router>
  );
}

export default App;
