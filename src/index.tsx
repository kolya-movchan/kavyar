import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
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

const hashRouter = () => (
  <HashRouter>
    <AuthProvider>
      <Routes>
        <Route path="admin/" element={<App />}>
          <Route index element={<HomePageLogo />}/>
          <Route path="home" element={<Navigate to="/admin" replace />}/>
          <Route path="*" element={<NotFound title={'Сторінку'} styling={'page'} />}/>
          <Route path="form" element={<Form />} />
          <Route path="coffeeshops" element={<CoffeeShops title={'Ваші кав’ярні'} />} />
          <Route path="filters" element={(<></>)}/>
          <Route path="categories" element={(<></>)}/>
          <Route path="products" element={(<></>)}/>
        </Route>
      </Routes>
    </AuthProvider>
  </HashRouter>
);

ReactDOM.render(hashRouter(), document.getElementById('root'));
