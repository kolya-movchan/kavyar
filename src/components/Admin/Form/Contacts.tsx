import React from 'react';
import { InputField } from './InputField';

type Props = {
  name: string,
  // city: string,
  logoURL: string,
  photosURL: string,
  description: string,
  socialURL: string,
  googleMapsURL: string,
  setName: (newValue: string) => void,
  // setCity: (newValue: string) => void,
  setLogoURL: (newValue: string) => void,
  setPhotosURL: (newValue: string) => void,
  setDescription: (newValue: string) => void,
  setSocialURL: (newValue: string) => void,
  setGoogleMapsURL: (newValue: string) => void,
};

export const Contacts: React.FC<Props> = ({
  name,
  // city,
  logoURL,
  photosURL,
  description,
  socialURL,
  googleMapsURL,
  setName,
  // setCity,
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
        placeHolderName="назву кавʼярні (макс. 30 симв.)"
        value={name}
        onChange={setName}
        maxLength={30}
        required
      />

      <InputField
        name="cfp-logo-link"
        label="посилання на логотип кавʼярні"
        placeHolderName="посилання на логотип кавʼярні"
        value={logoURL}
        onChange={setLogoURL}
        required
      />

      <InputField
        name="cfp-photos-link"
        label="посилання на фото кавʼярні"
        placeHolderName="посилання на фото кавʼярні"
        value={photosURL}
        onChange={setPhotosURL}
        required
      />

      <InputField
        name="cfp-contacts-social-link"
        label="посилання на Instagram/Facebook"
        placeHolderName="посилання на Instagram/Facebook"
        value={socialURL}
        onChange={setSocialURL}
        required
      />

      <InputField
        name="cfp-contacts-googlemap-link"
        label="посилання на адресу з Google Maps"
        placeHolderName="посилання на адресу з Google Maps"
        value={googleMapsURL}
        onChange={setGoogleMapsURL}
        required
      />

      <InputField
        name="cfp-contacts-description"
        label="короткий опис"
        placeHolderName="короткий опис (макс. 400 симв.)"
        value={description}
        onChange={setDescription}
        textarea
        required
      />
    </fieldset>
  );
};
