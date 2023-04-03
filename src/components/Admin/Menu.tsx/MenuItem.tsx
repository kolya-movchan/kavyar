// import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string,
  address: string,
};

export const MenuItem: React.FC<Props> = ( { title, address } ) => {
  return (
    <Link
      to={address}
      className="admin-panel__menu-item"
    >
      {title}
    </Link>
  );
};
