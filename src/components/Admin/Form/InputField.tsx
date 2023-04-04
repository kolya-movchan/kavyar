/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';
import { getRandomDigits } from '../../_tools/Tools';
import { priceRegex } from '../../_tools/Regex';
import { Product } from '../../../types/Product';

type Props = {
  name: string,
  value?: string,
  label: string,
  required?: boolean,
  textarea?: boolean,
  maxLength?: number,
  onAddButton?: (event: React.KeyboardEvent, productPress: string) => void,
  onChange: (newValue: string) => void
  selecting?: boolean,
  productsAPI?: Product[],
};

export const InputField: React.FC<Props> = ({
  name,
  label = name,
  value,
  required = false,
  textarea = false,
  maxLength,
  onAddButton = null,
  onChange,
  selecting,
  productsAPI,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTuched] = useState(false);
  const links = ['cfp-logo-link', 'cfp-contacts-social-link'];

  const linkError = links.some(link => link === name);
  const hasError = touched && !value;
  const priceError = name === 'price' && !value?.match(priceRegex);
  const productNameError = name === 'product' && value?.length === 30;
  const descriptionError = name === 'cfp-contacts-description' && value?.length === 400;

  const upperCaseLabel = label.slice(0, 1).toUpperCase() + label.slice(1);
  const firstWordLabel = label.split(' ')[0];
  const restWordsLabel = label.split(' ').slice(1);
  const labelDeclension = firstWordLabel.slice(-1) === 'а'
    ? `${firstWordLabel.slice(0, firstWordLabel.length - 1)}у ${restWordsLabel}`
    : label;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {upperCaseLabel}
        {required && <span className="required-field">*</span>}
      </label>

      <div style={name === 'price' ? {width: '190px'} : {}}>
        {(!textarea && !selecting) && (
          <input
            id={id}
            className={classNames('input', {
              'is-danger': hasError && required,
              'admin-form__price': name === 'price',
            })}
            placeholder={`Введіть ${labelDeclension}`}
            value={value}
            maxLength={maxLength}
            onChange={event => onChange(event.target.value)}
            onBlur={() => setTuched(true)}
            onKeyDown={(event) => {
              if (onAddButton) {
                onAddButton(event, name);
              }
            }}
          />)}
        
        {(!selecting && textarea) && (
          <textarea
            id={id}
            className={classNames('input', {
              'is-danger': hasError,
            })}
            placeholder={`Введіть ${labelDeclension}`}
            value={value}
            maxLength={400}
            onChange={event => onChange(event.target.value)}
            onBlur={() => setTuched(true)}
            style={{
              paddingTop: '15px',
              resize: 'vertical',
              minHeight: '100px',
              maxHeight: '200px',
            }}
          />)}

        {(selecting && productsAPI) && (
          <div className="select is-info">
            <select
              onChange={event => onChange(event.target.value)}
              defaultValue={'DEFAULT'}
            >
              <option
                disabled
                value="DEFAULT"
              >
                  Оберіть:
              </option>

              {productsAPI.map((product) =>
                <option
                  value={product.value}
                  key={product.value}
                >
                  {product.name}
                </option>
              )}
            </select>
          </div>
        )}
      </div>

      {descriptionError && (
        <p className="help is-danger">Максимум - 400 символів </p>
      )}

      {productNameError && (
        <p className="help is-danger">Максимум - 30 символів </p>
      )}

      {priceError && (
        <p className="help is-danger">Невірний Формат (пр. 22.50)</p>
      )}

      {(!linkError && hasError && required) && (
        <p className="help is-danger">Це обовʼязкове поле!</p>
      )}

      {(linkError && hasError) && (
        <p className="help is-danger">{`Будь ласка, введіть коректний формат ${label}`}</p>
      )}
    </div>
  );
};
