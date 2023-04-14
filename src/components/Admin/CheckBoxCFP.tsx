// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

type Props = {
  id: number,
  name: string,
  onCheck: (value: string, status: boolean) => void,
};

export const CheckBoxCFP: React.FC<Props> = ({
  name,
  onCheck,
  id,
}) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = () => {
    setIsChecked(!isChecked);
    onCheck(id.toString(), !isChecked);
  };

  return (
    <label
      htmlFor={id.toString()}
      className="cfp-features__wrapper"
    >
      <input
        className="cfp-features__checkBox"
        type="checkbox"
        name={name}
        id={id.toString()}
        onChange={() => handleSelect()}
        checked={isChecked}
      />

      <span className="cfp-features__name">
        {name}
      </span>
    </label>
  );
};
