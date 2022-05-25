import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
// import Home from './components/home'
import DetailBook from './components/details_book'
import Cart from './components/cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider, useCart } from 'react-use-cart'
import Home from './pages/home'
import Book from './pages/admin/book';
import Order from './pages/admin/order';
import Layout from './components/layout';
import Admin from './pages/admin';
import Orderdetail from './pages/admin/orderdetail';
import Editbook from './pages/admin/editbook';
import Addbook from './pages/admin/addbook';
import CategoriesManagement from './pages/admin/categories'
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/admin/book' element={<Book />}></Route>
          <Route path='/admin/book/addbook' element={<Addbook />}></Route>
          <Route path='/admin/book/editbook/:id' element={<Editbook />}></Route>
          <Route path='/admin/order' element={<Order />}></Route>
          <Route path='/admin/order/orderdetail' element={<Orderdetail />}></Route>
          <Route path='/admin/categories' element={<CategoriesManagement />}></Route>
          <Route path='/test' element={<Test />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/detailsbook/:id' element={<DetailBook />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

function Test() {

  const { addItem } = useCart()
  const onClickToLogin = () => {
    document.getElementById("login-header").click();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link" onClick={() => {
            // addItem({ id: new Date(), price: 200 }, 1);
            onClickToLogin();
            console.log('add item');
          }}>
          Learn React
        </a>
      </header>
    </div>
  )
}
