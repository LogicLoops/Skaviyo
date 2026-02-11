import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LoginPage,
  AdminLayout,
  Dashboard,
  Users,
  Vendors,
  Products,
  Categories,
  Orders,
  Reports,
  LimitedEdition,
  Settings,
  VendorDashboard
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

        {/* Vendor dashboard route */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

