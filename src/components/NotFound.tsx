import React from 'react';

type Props = {
  title: string,
  styling?: string,
};

export const NotFound: React.FC<Props> = ( { title, styling } ) => {
  return (
    <div className={`not-found not-found--${styling}`}>
      <img
        className="not-found__photo"
        src="../sad-coffee.png"
        alt="sad-coffee"
      />

      <span className="not-found__text">
        {`${title} Не Знайдено`}
      </span>
    </div>
  );
};
