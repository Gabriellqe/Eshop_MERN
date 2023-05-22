import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ActivationPage,
  ProductsPage,
  ProductDetailsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProfilePage,
  CheckoutPage,
  OrderSuccessPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/User.Routes.js";
import { ShopHomePage } from "./routes/Shop.Routes.js";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />

        {/* --SHOP ROUTES-- */}
        <Route
          path="/shop/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
