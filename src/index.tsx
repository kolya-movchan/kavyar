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
import { Header } from './components/Header';
import { Form } from './components/Admin/Form/Form';
import { App } from './App';
import { PageTitle } from './components/Admin/Menu.tsx/PageTitle';
import { CoffeeShops } from './components/Admin/CoffeeShops';
import { NotFound } from './components/NotFound';

const hashRouter = () => (
  <HashRouter>
    <AuthProvider>
      <Routes>
        <Route path="admin" element={<App />} />

        <Route
          path="home"
          element={<Navigate to="/admin" replace />}
        />

        <Route path="*" element={
          <NotFound title={'Сторінку'} styling={'page'} />
        }/>

        <Route path="admin/form" element={(
          <>
            <Header navBar={false} />
            <Form />
          </>
        )}>
        </Route>

        <Route path="admin/coffeeshops" element={(
          <>
            <Header />
            <PageTitle title={'Ваші кав’ярні'} />
            <CoffeeShops title={'Ваші кав’ярні'} />
          </>
        )}
        />

        <Route path="admin/filters" element={(
          <>
            <Header />
            <PageTitle title={'Ваші фільтри'} />
          </>
        )}
        />

        <Route path="admin/categories" element={(
          <>
            <Header />
            <PageTitle title={'Ваші категорії'} />
          </>
        )}
        />

        <Route path="admin/products" element={(
          <>
            <Header />
            <PageTitle title={'Ваші продукти'} />
          </>
        )}
        />
      </Routes>
    </AuthProvider>
  </HashRouter>
);

ReactDOM.render(hashRouter(), document.getElementById('root'));
