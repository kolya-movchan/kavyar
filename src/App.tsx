/* eslint-disable no-console */
import React from 'react';
import { Header } from './components/Header';
import { MenuItem } from './components/Admin/Menu.tsx/MenuItem';

import './styles/main.scss';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="tabs is-medium is-centered admin-panel__tabs">
        <ul>
          <li><MenuItem title={'Кавʼярні'} address={'coffeeshops'} /></li>
          <li><MenuItem title={'Фільтри'} address={'filters'} /></li>
          <li><MenuItem title={'Категорії'} address={'categories'} /></li>
          <li><MenuItem title={'Продукти'} address={'products'} /></li>
          <li><MenuItem title={'+'} address={'form'} /></li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};
