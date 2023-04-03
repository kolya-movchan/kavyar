// import classNames from 'classnames';
import React from 'react';

type Props = {
  title: string,
};

export const PageTitle: React.FC<Props> = ( { title } ) => {
  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">
        {title}
      </h1>
    </div>
  );
};
