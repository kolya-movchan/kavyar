import React from 'react';
import '../styles/main.scss';

type Props = {
  value: string,
  decoration: string,
  onChange: (value: string) => void,
};


export const SearchPannel: React.FC<Props> = ( { decoration, onChange, value } ) => {
  return (
    <div
      className={`search-container ${decoration}`}
      style={{display: 'flex', justifyContent: 'flex-start'}}
    >
      <input
        type="search"
        className='search-input input'
        value={value ? value : ''}
        placeholder="Пошук"
        onChange={(event) => onChange(event.target.value)}
        maxLength={10}
      />
    </div>
  );
};
