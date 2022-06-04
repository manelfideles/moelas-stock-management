import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from './pages/App';
import Drink from './pages/Drink';
import Cocktail from './pages/Cocktail';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles/index.css';
import { GeistProvider, CssBaseline } from '@geist-ui/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/drinks/:drinkName' element={<Drink />} />
          <Route path='/cocktails/:cocktailName' element={<Cocktail />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </GeistProvider>
  </React.StrictMode>
);
