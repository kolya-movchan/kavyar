import React from 'react';

type Props = {
  input: boolean,
  showInput: (value: boolean) => void,
  query: string,
  onQuery: (value: string) => void,
  onAdd?: () => void,
  hideMode?: boolean,
};

export const DynamicAddButton: React.FC<Props> = ({
  onQuery,
  query,
  hideMode,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAdd = () => {},
}) => {
  return (
    <div className="filters__add">
      <div className="filters__add-container">
        <input
          type="text"
          className="filters__input input"
          placeholder="Введіть назву"
          onChange={(event) => onQuery(event.target.value)}
          value={query}
          style={hideMode ? {marginBottom: '10px'} : {}}
          maxLength={20}
        />

        {!hideMode && (
          <button
            className="filters__add-button button is-link"
            onClick={() => onAdd()}
            style={{ backgroundColor: '#000' }}
            disabled={!query.length}
          >
            Додати
          </button>
        )}
      </div>
    </div>
  );
};
