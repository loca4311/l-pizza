import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
        <Routes>
          <Route path="/" element={<MainLayout/>} >
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Route>
        </Routes>
  );
}

export default App;
