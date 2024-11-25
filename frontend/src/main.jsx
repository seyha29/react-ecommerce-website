import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext';

ReactDOM.render(
  <BrowserRouter>
    <ShopContextProvider>
      <App /> {/* App includes ProductList */}
    </ShopContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
