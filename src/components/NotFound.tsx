import React from 'react';

type Props = {
  title: string,
  styling?: string,
  text?: string,
};

export const NotFound: React.FC<Props> = ( { title, styling, text } ) => {
  return (
    <div className={`not-found not-found--${styling}`}>
      <img
        className="not-found__photo"
        src="../sad-coffee.png"
        alt="sad-coffee"
      />

      <span className={`not-found__text not-found--${text}`}>
        {`${title} Не Знайдено`}
      </span>
    </div>
  );
};
