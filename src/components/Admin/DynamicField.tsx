import React from 'react';
// import { Category } from '../../types/Category';

type Props = {
  value: string,
  styling: string,
  stylingLink: string,
  stylingColor?: string,
  id?: number,
  onDelete?: (id: number) => void,
  // categoryName?: Category
};

export const DynamicField: React.FC<Props> = ({
  value,
  styling,
  stylingLink,
  stylingColor = '',
  id = 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDelete = () => {},
  // categoryName,
}) => {
  return (
    <>
      <li className={`filters__item ${styling}`}>
        <div className="filters__item-text">
          {value}
        </div>

        {/* {categoryName && (
          <div className="filters__category">
            {categoryName.name}
          </div>
        )} */}

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
