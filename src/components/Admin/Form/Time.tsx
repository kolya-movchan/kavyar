import React from 'react';

type Props = {
  title: string,
  value: string,
  onChange: (value: string) => void,
};

export const Time: React.FC<Props> = ({ title, value, onChange }) => {
  return (
    <label className="cfp-time__container">
      {title}

      <input
        className="cfp-time__input input"
        type="time"
        name="appt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        step="3600"
      />
    </label>
  );
};
