import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/CommonUiComponents/NavBar';
import TableBase from './components/CommonUiComponents/TableBase';
import Login from './components/Login/Login';
import AddProductButton from './components/Modals/AddProductModal';
import Orders from './components/Orders/Orders';
import OrderView from './components/Orders/SingleOrder/OrderView';
import Products from './components/Products/Products';
import ProductView from './components/Products/ProductView';
import UserView from './components/User/UserView';
function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          
          <Route exact path="/tabla" element={<TableBase/>}></Route>
          <Route exact path="/orders" element={<Orders/>}></Route>
          <Route exact path="/products" element={<Products/>}></Route>
          <Route exact path="/products/:id" element={<ProductView/>}></Route>
          <Route exact path="/orders/:id" element={<OrderView/>}></Route>
          <Route exact path="/user" element={<UserView/>}></Route>
        </Routes>
      </BrowserRouter>
      <AddProductButton/>
    </div>
  );
}

export default App;
