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
function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          
          <Route exact path="/tabla" element={<TableBase/>}></Route>
          <Route exact path="/orders" element={<Orders/>}></Route>
          <Route exact path="/products" element={<Products/>}></Route>
          <Route exact path="/products/:id" element={<ProductView/>}></Route>
          <Route exact path="/orders/:id" element={<OrderView/>}></Route>
        </Routes>
      </BrowserRouter>
      <AddProductButton/>
    </div>
  );
}

export default App;
