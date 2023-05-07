import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/main.scss';
import { logout } from './_tools/Tools';

type Props = {
  navBar?: boolean,
};


export const Header: React.FC<Props> = ( {navBar = true} ) => {
  const location = useLocation();
  const adminHomePage = location.pathname.includes('/admin');

  console.log(process.env.PUBLIC_URL);
  
  return (
    <div className={classNames(
      "header",
      {'header--user': !navBar},
    )}>
      <div className="header__container">
        <NavLink
          className="header__logo-container logo"
          to={adminHomePage ? '/admin' : '/'}
          onClick={window.location.reload}
        >
          <span className="logo__title">
            Кав’яр
          </span>

          <img
            className="logo__image"
            src={process.env.PUBLIC_URL + '/coffe-grain-logo.svg'}
            alt="logo"
          />
        </NavLink>

        {navBar && (
          <div className="navBar">
            <button
              onClick={() => logout()}
              style={{
                backgroundColor: 'black',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <img
                className="navBar__link"
                src={process.env.PUBLIC_URL + '/coffe-grain-logo.svg'}
                alt="logout"
              />
            </button>
          </div>
        )}

        {(!navBar && !adminHomePage) && (
          <div className="navBar">

            <NavLink
              to='/favorites'
              style={{
                backgroundColor: 'black',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <img
                className="navBar__link"
                src={process.env.PUBLIC_URL + '/coffee-cup.svg'}
                alt="favorites-cup"
              />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
