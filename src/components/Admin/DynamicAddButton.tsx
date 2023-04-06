import React from 'react';

type Props = {
  input: boolean,
  showInput: (value: boolean) => void,
  query: string,
  onQuery: (value: string) => void,
};

export const DynamicAddButton: React.FC<Props> = ({
  input,
  showInput,
  onQuery,
  query,
}) => {
  return (
    <div className="filters__add">
      {!input && (
        <button
          className="filters__create-button button is-link"
          onClick={() => showInput(!input)}
          style={{ backgroundColor: '#000' }}
        >
          +
        </button>
      )}

      {input && (
        <div className="filters__add-container">
          <input
            type="text"
            className="filters__input input"
            placeholder="Введіть назву"
            onChange={(event) => onQuery(event.target.value)}
            value={query}
          />
          <button
            className="filters__add-button button is-link"
            onClick={() => showInput(false)}
            style={{ backgroundColor: '#000' }}
          >
            Додати
          </button>
        </div>
      )}
    </div>
  );
};
