import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LoginPage,
  AdminLayout,
  VendorLayout,
  Dashboard,
  Users,
  Vendors,
  Products,
  Categories,
  Orders,
  Reports,
  LimitedEdition,
  Settings,
  VendorDashboard,
  VendorProducts,
  VendorOrders,
  VendorCategories,
  VendorReports,
  VendorSettings
} from './routes/routes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route - no sidebar */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin routes with persistent sidebar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/vendors" element={<Vendors />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/limited-edition" element={<LimitedEdition />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* Vendor routes with persistent sidebar */}
        <Route element={<VendorLayout />}>
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/vendor-dashboard/products" element={<VendorProducts />} />
          <Route path="/vendor-dashboard/orders" element={<VendorOrders />} />
          <Route path="/vendor-dashboard/categories" element={<VendorCategories />} />
          <Route path="/vendor-dashboard/reports" element={<VendorReports />} />
          <Route path="/vendor-dashboard/settings" element={<VendorSettings />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

