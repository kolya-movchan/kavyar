/* eslint-disable no-console */
import React from 'react';

type Props = {
  name: string,
  value: string,
  // onChange?: (newValue: string) => void,
  onCheck?: (value: number) => void,
  id: number,
};

export const CheckBox: React.FC<Props> = ({
  name,
  value,
  // onChange = () => null,
  onCheck = () => null,
  id,
}) => {

  return (
    <div className="">
      <label>
        <input
          type="checkbox"
          name={name}
          // id={id.toString()}
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
