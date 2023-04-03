import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
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

const hashRouter = () => (
  <AuthProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={(
          <>
            <Header navBar={false} />
            <Form />
          </>
          )}
        />
        <Route path="/coffeeshops" element={(
          <>
            <Header />
            <PageTitle title={'Ваші кав’ярні'} />
          </>
          )}
        />
        <Route path="/filters" element={(
          <>
            <Header />
            <PageTitle title={'Ваші фільтри'} />
          </>
          )}
        />
        <Route path="/categories" element={(
          <>
            <Header />
            <PageTitle title={'Ваші категорії'} />
          </>
          )}
        />
        <Route path="/products" element={(
          <>
            <Header />
            <PageTitle title={'Ваші продукти'} />
          </>
          )}
        />
      </Routes>
    </HashRouter>
  </AuthProvider>
);

ReactDOM.render(hashRouter(), document.getElementById('root'));
