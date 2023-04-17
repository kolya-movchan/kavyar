/* eslint-disable no-console */
import React from 'react';
import { Header } from './components/Header';
import { MenuItem } from './components/Admin/Menu.tsx/MenuItem';

import './styles/main.scss';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  // const [cfpOnEdit, setCfpOnEdit] = useState<null | CFPlist>(null);

  // const handleEditMode = (data: CFPlist) => {
  //   setCfpOnEdit(data);
  //   // console.log(data);
  // };

  return (
    <>
      <Header />
      <div
        className="tabs is-medium is-centered" 
        style={{ border: 'solid 1px #000'}}
      >
        <ul>
          <li><MenuItem title={'Міста'} address={'cities'}/></li>
          <li><MenuItem title={'Особливості'} address={'features'}/></li>
          <li><MenuItem title={'Категорії'} address={'categories'}/></li>
          <li><MenuItem title={'Продукти'} address={'products'}/></li>
          <li><MenuItem title={'Кавʼярні'} address={'coffeeshops'}/></li>
          <li><MenuItem title={'Створити Кавʼярню'} address={'form'}/></li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};
