import React from 'react';
import '../styles/main.scss';

export const Header: React.FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__container">
          <a className="header__logo-container logo" href="/">
            <span className="logo__title">
              Кав’яр
            </span>

            <img className="logo__image" src="/coffe-grain-logo.svg" alt="logo" />
          </a>

          <div className="header__language-section">
            <a href="/" className="header__language header__language-eng">
              eng
            </a>

            <span className="header__language">|</span>
            <a href="/" className="header__language header__language-ua">
              ua
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
