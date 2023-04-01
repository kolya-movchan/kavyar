/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import '../../../styles/blocks/admin/Form.scss';
import { AddProducts } from './AddProducts';
import { Contacts } from './Contacts';
import { Features } from './Features';

export const Form: React.FC = () => {
  const [logoURL, setLogoURL] = useState('');
  const [photosURL, setPhotosURL] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [googleMapsURL, setGoogleMapsURL] = useState('');

  const fieldsFilledIn = logoURL && photosURL && name && description;

  const reset = () => {
    setLogoURL('');
    setPhotosURL('');
    setName('');
    setDescription('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!logoURL.match(pattern)) {
      setLogoURL('');

      return;
    }

    reset();
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form-container2">
        <h1 className="admin-form-heading">
          Створити кавʼярню
        </h1>

        <form
          className="admin-form"
          name="admin-form"
          action="/"
          method="post"
          onSubmit={handleSubmit}
        >
          <fieldset className="cfp-contacts">
            <Contacts
              logoURL={logoURL}
              photosURL={photosURL}
              name={name}
              description={description}
              socialURL={socialURL}
              googleMapsURL={googleMapsURL}
              setLogoURL={setLogoURL}
              setPhotosURL={setPhotosURL}
              setName={setName}
              setDescription={setDescription}
              setSocialURL={setSocialURL}
              setGoogleMapsURL={setGoogleMapsURL}
            />
          </fieldset>

          <fieldset className="cfp-features">
            <h2 className="cfp-features__title">
              Особливості кав’ярні
            </h2>

            <Features />
          </fieldset>

          <AddProducts />

          <div className="">
            <button
              type="submit"
              className="add-cfp__button button is-link"
              disabled={!fieldsFilledIn}
            >
              Створити кавʼярню
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
