import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';

import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFoundBlock = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))

function App() {
  return (
        <Routes>
          <Route path="/" element={<MainLayout/>} >
            <Route path="" element={<Home />} />
            <Route path="cart" element={
                <Suspense fallback={<div>Завантаження корзини...</div>}>
                    <Cart />
                </Suspense>
            } />
            <Route path="pizza/:id" element={
                <Suspense fallback={<div>Завантаження піци...</div>}>
                    <FullPizza />
                </Suspense>
            } />
            <Route path="*" element={
                <Suspense fallback={<div>Завантаження</div>}>
                    <NotFoundBlock />
                </Suspense>
            } />
          </Route>
        </Routes>
  );
}

// 38:26

export default App;
