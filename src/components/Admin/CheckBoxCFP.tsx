import React from 'react';

type Props = {
  id: number,
  name: string,
  onCheck: (value: string) => void,
  styling?: string,
  activeFeatures: string[],
};

export const CheckBoxCFP: React.FC<Props> = ({
  name,
  onCheck,
  id,
  styling = '',
  activeFeatures,
}) => {

  const handleSelect = () => {
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
        checked={activeFeatures?.includes(id.toString())}
      />

      <span className="cfp-features__name">
        {name}
      </span>
    </label>
  );
};
