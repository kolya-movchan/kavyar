import React from 'react';

type Props = {
  value: string,
  styling: string,
  stylingLink: string,
  stylingColor?: string,
};

export const DynamicField: React.FC<Props> = ({ value, styling, stylingLink, stylingColor }) => {
  return (
    <>
      <li className={`filters__item ${styling}`}>
        {value}

        <button className={`filters__toggle ${stylingColor}`}>
          <img
            className={`filters__img ${styling}`}
            src={stylingLink}
            alt="switch-off-filter"
          />
        </button>
      </li>
    </>
  );
};
