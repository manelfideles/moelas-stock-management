import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './pages/App';

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
      <App />
      <Footer />
    </GeistProvider>
  </React.StrictMode>
);
