import React from 'react';
import ReactDOM from 'react-dom';
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
import { Filters } from './components/Admin/Filters';

const hashRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<App />}>
          <Route index element={<HomePageLogo />}/>
          <Route path="admin/home" element={<Navigate to="/admin" replace />}/>
          <Route path="*" element={<NotFound title={'Сторінку'} styling={'page'} />}/>
          <Route path="coffeeshops" element={<CoffeeShops title={'Ваші кав’ярні'} />} />
          {/* <Route path="cities" element={(<Cities />)}/> */}
          <Route path="filters" element={(<Filters />)}/>
          <Route path="categories" element={(<></>)}/>
          <Route path="products" element={(<></>)}/>
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="/" element={<Navigate to="/admin" replace />}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(hashRouter(), document.getElementById('root'));
