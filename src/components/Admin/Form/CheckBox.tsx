import React from 'react';

type Props = {
  name: string,
  value: string,
  id: number,
  featuresOnEdit: number[],
  onCheck?: (value: number) => void,
};

export const CheckBox: React.FC<Props> = ({
  name,
  value,
  id,
  featuresOnEdit,
  onCheck = () => null,
}) => {

  const activeFeatures = featuresOnEdit.includes(id);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          className="cfp-features__filter"
          value={value}
          onChange={() => onCheck(id)}
          checked={activeFeatures}
        />

        <span className="cfp-features__name">
          {name}
        </span>
      </label>
    </div>
  );
};
