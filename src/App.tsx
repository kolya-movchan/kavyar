/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { MenuItem } from './components/Admin/Menu.tsx/MenuItem';

import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { logout } from './components/_tools/Tools';

export const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() > exp * 1000) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const allowBounceAmount = 100;
      if (scrollTop === 0) {
        window.scrollTo({ top: -allowBounceAmount });
      }

      if (scrollTop + windowHeight === scrollHeight) {
        window.scrollTo({ top: scrollHeight + allowBounceAmount - windowHeight });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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
