import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import DetailBook from "./components/details_book";
import Cart from "./components/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchOrder from "./components/SearchOrder";
import SearchProduct from "./components/SearchProduct";
import Profile from "./components/Profile";
export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/test" element={<Test />}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/detailsbook" element={<DetailBook />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
				<Route path="/searchorder" element={<SearchOrder />}></Route>
				<Route path="/search" element={<SearchProduct />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/" element={<Home />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

function Test() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
