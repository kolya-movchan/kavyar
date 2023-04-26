import React from 'react';

type Props = {
  input: boolean,
  query: string,
  hideMode?: boolean,
  showInput: (value: boolean) => void,
  onKey?: (event: React.KeyboardEvent) => void,
  onQuery: (value: string) => void,
  onAdd?: () => void,
};

export const DynamicAddButton: React.FC<Props> = ({
  query,
  hideMode,
  onQuery,
  onAdd = () => null,
  onKey = () => null,
}) => {
  return (
    <div className="filters__add">
      <div className="filters__add-container">
        <input
          type="text"
          className="filters__input input"
          placeholder="Введіть назву"
          onChange={(event) => onQuery(event.target.value)}
          onKeyDown={(event) => onKey(event)}
          value={query}
          style={hideMode ? {marginBottom: '10px'} : {}}
          maxLength={30}
        />

        {!hideMode && (
          <button
            className="button is-black hoveredButton"
            onClick={() => onAdd()}
            disabled={!query.length}
          >
            Додати
          </button>
        )}
      </div>
    </div>
  );
};
