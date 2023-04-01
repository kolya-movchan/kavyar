/* eslint-disable no-console */
import React, { useState } from 'react';

type Props = {
  name: string,
  label: string,
  value: string,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const CheckBox: React.FC<Props> = ({
  name,
  label,
  value,
  onChange
  = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  return (
    <div className="cfp-features__container">
      <label htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          className="cfp-features__filter"
          value={value}
          onChange={() => (value === 'false'
            ? onChange('true')
            : onChange('false'))}
        />

        <span className="cfp-features__name">
          {label}
        </span>
      </label>
    </div>
  );
};
