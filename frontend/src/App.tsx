import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import Products from "./pages/Products";
import AppLayout from "./Layout/AppLayout";
import Product from "./components/Product";
import LoginPage from "./pages/Login";
import CookieService from "./services/CookieService";
import CartDrawer from "./components/cartDrawer";

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
      </Routes>
    </>
  );
}

export default App;
