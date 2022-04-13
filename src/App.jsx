import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TableBase from './components/CommonUiComponents/TableBase';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="tabla" component={<TableBase/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
