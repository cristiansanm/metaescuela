import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Missing from './components/CommonUiComponents/Missing';
import NavBar from './components/CommonUiComponents/NavBar';
import Unauthorized from './components/CommonUiComponents/Unauthorized';
import Layout from './components/Layout';
import Login from './components/Login/Login';
import AddProductButton from './components/Modals/AddProductModal';
import Orders from './components/Orders/Orders';
import OrderView from './components/Orders/SingleOrder/OrderView';
import Products from './components/Products/Products';
import ProductView from './components/Products/ProductView';
import SellerView from './components/Seller/SellerView';
import UserView from './components/User/UserView';
import RequireAuth from './RequireAuth';
import PersistLogin from './components/PersistLogin';
function App() {
  return (
    <div>


      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes*/}
          <Route path="login" element={<Login />} />
          {/* Private Routes*/}
          <Route element={<PersistLogin />}>
            {/* Private Routes for seller and buyer */}
            <Route element={<RequireAuth allowedRoles={["BUYER", "SELLER"]} />}>
              <Route element={<NavBar />}>
                <Route element={<AddProductButton />}>
                  <Route path="/" element={<Navigate to="/products" />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<ProductView />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:id" element={<OrderView />} />
                  <Route path="user" element={<UserView />} />
                </Route>
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={["SELLER"]} />}>
              <Route element={<NavBar />}>
                <Route element={<AddProductButton />}>
                  <Route path="seller" element={<SellerView />} />
                </Route>
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={["BUYER"]} />}>
              <Route element={<NavBar />}>
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Everything else*/}
        <Route path="*" element={<Missing />} />

      </Routes>

      {/* <AddProductButton /> */}
    </div>
  );
}

export default App;
