import React from 'react';
import '../styles/main.scss';

type Props = {
  value: string,
  decoration: string,
  onChange: (value: string) => void,
};

export const SearchPannel: React.FC<Props> = ( { value, decoration, onChange } ) => {
  return (
    <div
      className={`search-container ${decoration}`}
      style={{display: 'flex', justifyContent: 'flex-start'}}
    >
      <input
        type="search"
        className='search-input input'
        value={value}
        placeholder="Пошук"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
