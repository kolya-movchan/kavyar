/* eslint-disable no-console */
import React from 'react';

type Props = {
  name: string,
  value: string,
  onChange?: (newValue: string) => void,
  onCheck: (value: number) => void,
  id: number,
};

// function getRandomDigits() {
//   return Math.random().toString().slice(2);
// }

export const CheckBox: React.FC<Props> = ({
  name,
  value,
  // onChange = () => null,
  onCheck = () => null,
  id,
}) => {
  // const [id] = useState(() => `${name}-${getRandomDigits()}`);

  return (
    <div className="cfp-features__container">
      <label htmlFor={id.toString()}>
        <input
          type="checkbox"
          name={name}
          id={id.toString()}
          className="cfp-features__filter"
          value={value}
          onChange={() => onCheck(id)}
        />

        <span className="cfp-features__name">
          {name}
        </span>
      </label>
    </div>
  );
};
