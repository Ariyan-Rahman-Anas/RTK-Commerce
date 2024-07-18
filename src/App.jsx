import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Products from './features/products/Products';
import ProductDetails from './features/products/ProductDetails';
import AddProduct from './features/products/AddProduct';
import EditProduct from './features/userProducts/EditProduct';
import UserProducts from './features/userProducts/UserProducts';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';

const App = () => {
  return (
      <div className="p-2 bg-gray-200 relative min-h-screen">
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/my-products" element={<UserProducts />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
  );
};
export default App;