import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TableBase from './components/CommonUiComponents/TableBase';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/tabla" element={<TableBase/>}></Route>
          <Route path="/pedidos" element={<Orders/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
