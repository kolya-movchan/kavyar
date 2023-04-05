import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string,
  address: string,
};

export const MenuItem: React.FC<Props> = ( { title, address } ) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) => classNames(
        'navbar-item admin-panel__menu-item',
        { 'is-active': isActive },
      )}
    >
      {title}
    </NavLink>
  );
};
