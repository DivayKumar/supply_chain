import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './pages/addproduct';
import AllProduct from './pages/allproduct';
import SearchProduct from './pages/searchproduct';
import TransferProduct from './pages/transferproduct';
import History from './pages/history';

function App() {
return (
	<BrowserRouter>
  
	<Navbar />
    {/* <Home />
	<Blogs />
	<About />
	<Events />
	<SignUp />
	<Teams />
	<AnnualReport /> */}
	<Routes>
		<Route path='/' exact element={<AddProduct />} />
		<Route path='/allproduct' element={<AllProduct />} />
		<Route path='/searchproduct' element={<SearchProduct />} />
		<Route path='/transferproduct' element={<TransferProduct />}  />
		<Route path='/history' element={<History />} />
    </Routes>
	</BrowserRouter>
);
}

export default App;
