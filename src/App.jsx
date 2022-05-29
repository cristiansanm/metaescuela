import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TableBase from './components/CommonUiComponents/TableBase';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          
          <Route path="/tabla" element={<TableBase/>}></Route>
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
