/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import '../../styles/blocks/admin/Form.scss';

export const Form: React.FC = () => {
  return (
    <div className="admin-form-container">
      <div className="admin-form-container2">
        <h1 className="admin-form-heading">
          Створити кавʼярню
        </h1>

        <form
          action="/"
          className="admin-form"
          method="post"
        >
          <fieldset className="cfp-contacts">
            <input
              className="cfp-contacts__logo-link cfp-contacts__input"
              type="text"
              placeholder="Посилання на логотип кав’ярні"
            />

            <input
              className="cfp-contacts__photos-link cfp-contacts__input"
              type="text"
              placeholder="Посилання на фото кав’ярні"
            />

            <input
              className="cfp-contacts__name cfp-contacts__input"
              type="text"
              placeholder="Назва кав’ярні"
            />

            <textarea
              className="cfp-contacts__description cfp-contacts__input"
              name="cfp-contacts__description"
              placeholder="Короткий опис"
            />

            <input
              className="cfp-contacts__social-link cfp-contacts__input"
              type="text"
              placeholder="Посилання на Instagram/Facebook"
            />

            <input
              className="cfp-contacts__googlemap cfp-contacts__input"
              type="text"
              placeholder="Адреса(посилання з Google Maps)"
            />
          </fieldset>

          <fieldset className="cfp-features">
            <h2 className="cfp-features__title">
              Особливості кав’ярні
            </h2>

            <div className="cfp-features__wrapper">
              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-take-away"
                  />
                  <span className="cfp-features__name">
                    Кава на виніс
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Кава всередині
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Продає зерна
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Місце для коворкінгу
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Має генератор
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Має укриття
                  </span>
                </label>
              </div>

              <div className="cfp-features__container">
                <label>
                  <input
                    className="cfp-features__filter"
                    type="checkbox"
                    name="coffee-takeaway"
                  />
                  <span className="cfp-features__name">
                    Можна з тваринами
                  </span>
                </label>
              </div>
            </div>

          </fieldset>

          <fieldset className="cfp-products">
            <h2 className="cfp-products__title">
              Продукти кав’ярні
            </h2>

            <div className="cfp-products__container">
              <input
                className="cfp-products__name cfp-products__input"
                type="text"
                placeholder="Назва продукту"
              />

              <div className="cfp-products__price-container">
                <span className="">
                  Ціна:
                </span>
                <input
                  className="cfp-products__price cfp-products__input"
                  type="number"
                  defaultValue={0}
                  min={0}
                  step={5}
                />
              </div>
            </div>

            <button className="cfp-products__add-button button" type="submit">
              Додати продукт
            </button>
          </fieldset>

          <button className="add-cfp__button button" type="submit">
            Створити кавʼярню
          </button>
        </form>
      </div>
    </div>
  );
};
