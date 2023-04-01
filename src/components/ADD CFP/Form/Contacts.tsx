import React from 'react';
import { InputField } from './InputField';

type Props = {
  logoURL: string,
  photosURL: string,
  name: string,
  description: string,
  socialURL: string,
  googleMapsURL: string,
  setName: (newValue: string) => void,
  setLogoURL: (newValue: string) => void,
  setPhotosURL: (newValue: string) => void,
  setDescription: (newValue: string) => void,
  setSocialURL: (newValue: string) => void,
  setGoogleMapsURL: (newValue: string) => void,
};

export const Contacts: React.FC<Props> = ({
  logoURL,
  photosURL,
  name,
  description,
  socialURL,
  googleMapsURL,
  setName,
  setLogoURL,
  setPhotosURL,
  setDescription,
  setSocialURL,
  setGoogleMapsURL,
}) => {
  return (
    <fieldset className="cfp-contacts">
      <InputField
        name="cfp-contacts-name"
        label="назва кав’ярні"
        data-declension="назву кавʼярні"
        value={name}
        onChange={setName}
        required
      />
      <InputField
        name="cfp-logo-link"
        label="посилання на логотип кавʼярні"
        value={logoURL}
        onChange={setLogoURL}
        required
      />
      <InputField
        name="cfp-photos-link"
        label="посилання на фото кавʼярні"
        value={photosURL}
        onChange={setPhotosURL}
        required
      />
      <InputField
        name="cfp-contacts-social-link"
        label="посилання на Instagram/Facebook"
        data-declension="Посилання на Instagram/Facebook"
        value={socialURL}
        onChange={setSocialURL}
        required
      />
      <InputField
        name="cfp-contacts-googlemap-link"
        label="посилання на адресу з Google Maps"
        data-declension="Посилання на Instagram/Facebook"
        value={googleMapsURL}
        onChange={setGoogleMapsURL}
        required
      />
      <InputField
        name="cfp-contacts-description"
        label="короткий опис"
        data-declension="назву кавʼярні"
        value={description}
        onChange={setDescription}
        required
        textarea
      />
    </fieldset>
  );
};
