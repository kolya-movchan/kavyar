import React from 'react';

export const HomePageLogo: React.FC = ( ) => {
  return (
    <div className="admin-panel__body">
      <img
        src={process.env.PUBLIC_URL + '/cup-of-motivation-coffee-sign-logo.png'}
        alt="cup-of-motivation-coffee"
        className="admin-panel__image"
      />
    </div>
  );
};
