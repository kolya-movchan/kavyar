// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

type Props = {
  id: number,
  name: string,
  onCheck: (value: string) => void,
  styling?: string,
};

export const CheckBoxCFP: React.FC<Props> = ({
  name,
  onCheck,
  id,
  styling = '',
}) => {

  // const [isChecked, setIsChecked] = useState(false);

  const handleSelect = () => {
    // setIsChecked(!isChecked);
    onCheck(id.toString());
  };

  return (
    <label
      htmlFor={id.toString()}
      className={`cfp-features__wrapper ${styling}`}
    >
      <input
        className="cfp-features__checkBox"
        type="checkbox"
        name={name}
        id={id.toString()}
        onChange={() => handleSelect()}
        // checked={isChecked}
      />

      <span className="cfp-features__name">
        {name}
      </span>
    </label>
  );
};
