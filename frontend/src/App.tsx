import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import Products from "./pages/Products";
import AppLayout from "./Layout/AppLayout";
import Product from "./components/Product";
import LoginPage from "./pages/Login";
import CookieService from "./services/CookieService";
import CartDrawer from "./components/CartDrawer";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./Layout/DashboardLayout";
import DashboardProductsPage from "./pages/dashboard/DashboardProducts";
import DashboardCategoriesPage from "./pages/dashboard/DashboardCategoriesPage";
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";

function App() {
  const token = CookieService.get("jwt");
  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
        </Route>

        <Route path="/login" element={<LoginPage isAuthenticated={token} />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout isAuthenticated={token} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="/dashboard/products"
            element={<DashboardProductsPage />}
          />
          <Route
            path="/dashboard/categories"
            element={<DashboardCategoriesPage />}
          />
          <Route
            path="/dashboard/settings"
            element={<DashboardSettingsPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
