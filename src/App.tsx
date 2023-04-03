/* eslint-disable no-console */
import React from 'react';
import { Header } from './components/Header';
import { PageTitle } from './components/Admin/Menu.tsx/PageTitle';
import { MenuItem } from './components/Admin/Menu.tsx/MenuItem';

import './styles/main.scss';

export const App: React.FC = () => {

  return (
    <>
      <Header />
      <PageTitle title={'Панель адміністратора'} />

      <div className="admin-panel__menu">
        <MenuItem title={'Ваші кавʼярні'} address={'coffeeshops'} />
        <MenuItem title={'Ваші фільтри'} address={'filters'} />
        <MenuItem title={'Ваші категорії'} address={'categories'} />
        <MenuItem title={'Ваші продукти'} address={'products'} />
      </div>
    </>
  );
};
