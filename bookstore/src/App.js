import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider, useCart } from 'react-use-cart'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/test' element={<Test />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

function Test() {

  const { addItem } = useCart()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link" onClick={() => {
            addItem({ id: new Date(), price: 200 }, 1);
            console.log('add item');
          }}>
          Learn React
        </a>
      </header>
    </div>
  )
}
