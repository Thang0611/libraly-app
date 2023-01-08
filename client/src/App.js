
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Page/Register';
import Login from './Page/Login';
import Home from './Page/Home';
import DetailBook from './Page/DetailBook';
// import AddBook from './Page/AddBook';
import Order from './Page/Order';

function App() {
  return (
    <Routes>
      <Route path='' element={<Home />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='detail' element={<DetailBook />}></Route>
      {/* <Route path='book' element={<AddBook />}></Route> */}
      <Route path='order' element={<Order />}></Route>
  </Routes>
  )
  
}

export default App;
