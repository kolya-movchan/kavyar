import { createRoot } from 'react-dom/client';
import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import './index.scss';

import { AuthProvider } from './components/Auth/AuthContext';
import { Form } from './components/Admin/Form/Form';
import { App } from './App';
import { CoffeeShops } from './components/Admin/CoffeeShops';
import { NotFound } from './components/NotFound';
import { HomePageLogo } from './components/Admin/HomePageLogo';
import { Features } from './components/Admin/Features';
import { Cities } from './components/Admin/Cities';
import { Categories } from './components/Admin/Categories';
import { Products } from './components/Admin/Products';


const hashRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<App />}>
          <Route index element={<HomePageLogo />}/>
          <Route path="admin/home" element={<Navigate to="/admin" replace />}/>
          <Route path="*" element={<NotFound title={'Сторінку'} styling={'page'} />}/>
          <Route path="coffeeshops" element={<CoffeeShops />} />
          <Route path="cities" element={(<Cities />)}/>
          <Route path="features" element={(<Features />)}/>
          <Route path="categories" element={(<Categories />)}/>
          <Route path="products" element={(<Products />)}/>
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="/" element={<Navigate to="/admin" replace />}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// ReactDOM.render(hashRouter(), document.getElementById('root'));

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(hashRouter());
