import React from 'react';
import '../styles/main.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__logo-container">
        <a className="header__title" href="/">
          Кав’яр
        </a>

        <div className="header__logo-container logo">
          <a href="/" className="logo__link">
            <img className="logo__image" src="/coffe-grain-logo.svg" alt="logo" />
          </a>
        </div>
      </div>
    </div>
  );
};
