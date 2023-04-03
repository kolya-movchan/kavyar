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
          {!navBar && (
            <a className="header__logo-container logo" href="/">
              <span className="logo__title">
                Кав’яр
              </span>

              <img className="logo__image" src="/coffe-grain-logo.svg" alt="logo" />
            </a>
          )}

          {navBar && (
            <>
              <NavLink className="header__logo-container logo" to="/">
                <span className="logo__title">
                  Кав’яр
                </span>

                <img className="logo__image" src="/coffe-grain-logo.svg" alt="logo" />
              </NavLink>

              <div className="navBar">
                <NavLink
                  to="/form"
                  className=""
                >
                  <img
                    className="navBar__link"
                    src="/form-access.svg"
                    alt="form-link"
                  />
                </NavLink>

                <NavLink
                  to="/"
                  className=""
                >
                  <img
                    className="navBar__link"
                    src="/logout.svg"
                    alt=""
                  />
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
