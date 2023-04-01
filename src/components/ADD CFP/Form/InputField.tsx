/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  textarea?: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const InputField: React.FC<Props> = ({
  name,
  label = name,
  value,
  required = false,
  onChange = () => {},
  textarea = false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  // eslint-disable-next-line max-len
  // const linkError = name === 'cfp-logo-link' || name === 'cfp-photos-link' || name === 'cfp-contacts-contact';
  const hasError = touched && required && !value;
  const upperCaseLabel = label.slice(0, 1).toUpperCase() + label.slice(1);

  const firstWordLabel = label.split(' ')[0];
  const restWordsLabel = label.split(' ').slice(1);
  const labelDeclension = firstWordLabel.slice(-1) === 'а'
    ? `${firstWordLabel.slice(0, firstWordLabel.length - 1)}у ${restWordsLabel}`
    : label;

  const addStyle = () => {
    if (name.includes('product-')) {
      return { width: '210px' };
    }

    if (name.includes('price-')) {
      return { width: '133px' };
    }

    return {};
  };

  // console.log('linkError', linkError);
  // console.log('hasError', hasError);
  // console.log('name', name);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {upperCaseLabel}
      </label>

      <div>
        {!textarea ? (
          <input
            id={id}
            className={classNames('input', {
              'is-danger': hasError,
            })}
            placeholder={`Введіть ${labelDeclension}`}
            value={value}
            onChange={event => onChange(event.target.value)}
            onBlur={() => setToched(true)}
            style={addStyle()}
          />
        ) : (
          <textarea
            id={id}
            className={classNames('input', {
              'is-danger': hasError,
            })}
            placeholder={`Введіть ${labelDeclension}`}
            value={value}
            onChange={event => onChange(event.target.value)}
            onBlur={() => setToched(true)}
            style={{
              paddingTop: '15px',
              resize: 'vertical',
              minHeight: '100px',
              maxHeight: '200px',
            }}
          />
        )}
      </div>

      {hasError && (
        <p className="help is-danger">Це обовʼязкове поле!</p>
      )}

      {/* {hasError && linkError && (
        <p className="help is-danger">{`Будь ласка, введіть коректний формат ${label}`}</p>
      )} */}
    </div>
  );
};
