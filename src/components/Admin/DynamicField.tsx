import React from 'react';

type Props = {
  value: string,
  styling: string,
  stylingLink: string,
  stylingColor?: string,
  id?: number,
  onDelete?: (id: number) => void,
};

export const DynamicField: React.FC<Props> = ({
  value,
  styling,
  stylingLink,
  stylingColor = '',
  id = 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDelete = () => {},
}) => {
  return (
    <>
      <li className={`filters__item ${styling}`}>
        <div className="filters__item-text">
          {value}
        </div>

        <div className="filters__switch-container">
          <button
            className={`filters__toggle ${stylingColor}`}
            onClick={() => onDelete(id)}
          >
            <img
              className={`filters__img ${styling}`}
              src={stylingLink}
              alt="switch-off-filter"
            />
          </button>
        </div>
      </li>
    </>
  );
};
