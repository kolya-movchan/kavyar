import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';

import './index.scss';
import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
      </Routes>
    </HashRouter>,
  </AuthProvider>,
  document.getElementById('root'),
);
