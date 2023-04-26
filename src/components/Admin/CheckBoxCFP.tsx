import React from 'react';

type Props = {
  id: number,
  name: string,
  styling?: string,
  activeFeatures: string[],
  onCheck: (value: string) => void,
};

export const CheckBoxCFP: React.FC<Props> = ({
  name,
  id,
  styling = '',
  activeFeatures,
  onCheck,
}) => {

  const iD = id.toString();
  const handleSelect = () => onCheck(iD);

  return (
    <label
      htmlFor={iD}
      className={`cfp-features__wrapper ${styling}`}
    >
      <input
        className="cfp-features__checkBox"
        type="checkbox"
        name={name}
        id={iD}
        onChange={() => handleSelect()}
        checked={activeFeatures?.includes(iD)}
      />

      <span className="cfp-features__name">
        {name}
      </span>
    </label>
  );
};
