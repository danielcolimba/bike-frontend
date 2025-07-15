// src/components/Layout.jsx
import { useLocation, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Cart from '../pages/Cart';

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      { !hideNavbar && <Navbar /> }

      { /* Solo aplicamos pt-20 si el navbar está visible */ }
      <div className={ hideNavbar ? '' : 'pt-20' }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
