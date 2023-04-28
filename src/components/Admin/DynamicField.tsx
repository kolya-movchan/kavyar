import React from 'react';

type Props = {
  value: string,
  styling?: string,
  stylingLink?: string,
  stylingColor?: string,
  id?: number,
  onDelete?: (id: number) => void,
};

export const DynamicField: React.FC<Props> = ({
  value,
  styling,
  stylingLink,
  id = 0,
  onDelete = () => null,
}) => {
  return (
    <>
      <li className={`filters__item ${styling}`}>
        <div className="filters__item-text">
          {value}
        </div>

        {!stylingLink && (
          <div className="filters__switch-container">
            <button
              className={`filters__picture`}
            >
              <img
                className=''
                src='./checkmark.svg.png'
                alt="checkmark"
              />
            </button>
          </div>
        )}

        {stylingLink && (
          <div className="filters__switch-container">
            <button
              className='filters__picture filters__picture--black'
              onClick={() => onDelete(id)}
            >
              <img
                className={`filters__img ${styling}`}
                src={stylingLink}
                alt="switch-off-filter"
              />
            </button>
          </div>
        )}
      </li>
    </>
  );
};
