import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/main.scss';

type Props = {
  navBar?: boolean,
};

export const Header: React.FC<Props> = ( {navBar = true} ) => {
  return (
    <>
      <div className="header">
        <div className="header__container">
            <NavLink className="header__logo-container logo" to="/admin">
              <span className="logo__title">
                Кав’яр
              </span>

              <img className="logo__image" src="/coffe-grain-logo.svg" alt="logo" />
          </NavLink>

          {navBar && (
            <div className="navBar">
              <NavLink
                to="/admin/form"
                className=""
              >
                <img
                  className="navBar__link"
                  src="/form-access.svg"
                  alt="form-link"
                />
              </NavLink>

              <NavLink
                to="/admin"
                className=""
              >
                <img
                  className="navBar__link"
                  src="/logout.svg"
                  alt=""
                />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
