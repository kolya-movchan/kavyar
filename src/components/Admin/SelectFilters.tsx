import React from 'react';
import { SortByProperty } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';

type Props = {
  text: string,
  data?: number[] | string[] | SortByProperty[],
  complexData?: Feature[],
  paramsValue?: string | null;
  onSelect: (value: string) => void,
};

export const SelectFilters: React.FC<Props> = ({
  text,
  data = null,
  complexData = null,
  paramsValue,
  onSelect,
}) => {
  return (
    <div className="select">
      <select
        className='cfp__select'
        onChange={event => onSelect(event.target.value)}
        value={paramsValue ? paramsValue : 'DEFAULT'}
      >
        <option disabled value="DEFAULT">
          {text}
        </option>

        {(!data && complexData) && (
          complexData.map(item =>
            <option
              value={item.name}
              key={item.id}
            >
              {item.name}
            </option>
          )
        )}

        {(!complexData && data) && (data.map(item =>
          <option
            value={item}
            key={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
