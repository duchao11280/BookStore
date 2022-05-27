import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import DetailBook from './components/details_book'
import Cart from './components/cart';
import { CartProvider, useCart } from 'react-use-cart'
import BookAdmin from './pages/admin/book';
import OrderAdmin from './pages/admin/order';
import Orderdetail from './pages/admin/orderdetail';
import Editbook from './pages/admin/editbook';
import Addbook from './pages/admin/addbook';
import CategoriesManagement from './pages/admin/categories'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/notfound';
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/admin' element={<BookAdmin />}></Route>
          <Route path='/admin/book' element={<BookAdmin />}></Route>
          <Route path='/admin/book/addbook' element={<Addbook />}></Route>
          <Route path='/admin/book/editbook/:id' element={<Editbook />}></Route>
          <Route path='/admin/order' element={<OrderAdmin />}></Route>
          <Route path='/admin/order/orderdetail' element={<Orderdetail />}></Route>
          <Route path='/admin/categories' element={<CategoriesManagement />}></Route>
          <Route path='/admin/order/orderdetail/:id' element={<Orderdetail />}></Route>
          <Route path='/test' element={<Test />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/detailsbook/:id' element={<DetailBook />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/*' element={<NotFound/>}></Route>
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
