/* eslint-disable no-console */
import React from 'react';

type Props = {
  name: string,
  value: string,
  onCheck?: (value: number) => void,
  id: number,
  featuresOnEdit: number[],
};

export const CheckBox: React.FC<Props> = ({
  name,
  value,
  onCheck = () => null,
  id,
  featuresOnEdit,
}) => {

  const activeFeatures = featuresOnEdit.includes(id);

  return (
    <div className="">
      <label>
        <input
          type="checkbox"
          name={name}
          className="cfp-features__filter"
          value={value}
          onChange={() => {
            onCheck(id);
          }}
          checked={activeFeatures}
        />

        <span className="cfp-features__name">
          {name}
        </span>
      </label>
    </div>
  );
};
