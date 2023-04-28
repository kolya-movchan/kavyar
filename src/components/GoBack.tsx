import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string
};

export const GoBack: React.FC<Props> = ({ title }) => {
  return (
    <div
      className="tabs is-medium menuTop"
      style={{ border: 'solid 1px #000'}}
    >
      <NavLink
        to={''}
        className='menuTop__back-container'
      >
        <img
          src={location.pathname.includes('favorites') ? "./arrow-left.png" : '../arrow-left.png'}
          // src='./arrow-left.png'
          alt="arrow-go-back"
          className="menuTop__back"
          onClick={() => history.back()}
        />
      </NavLink>

      <div className="menuTop__title-container">
        <h1 className="menuTop__title">
          {title}
        </h1>
      </div>
    </div>
  );
};
