/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import '../../../styles/blocks/admin/Form.scss';
import { Product } from '../../../types/Product';
import { emailRegex, priceRegex } from '../../_tools/Regex';
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
  const [product, setProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [count, addCount] = useState(0);
  const [productList, setProductList] = useState<Product[]>([]);

  const unique_id = uuid();

  const fieldsFilledIn = logoURL && name && description && socialURL;

  const reset = () => {
    setLogoURL('');
    setPhotosURL('');
    setName('');
    setDescription('');
    setSocialURL('');
    setGoogleMapsURL('');
    setProduct('');
    setProductPrice('');

    addCount(count + 1);
  };

  const resetProductFields = () => {
    setProduct('');
    setProductPrice('');
  };

  const createNewProduct = () => {
    if (!productPrice.match(priceRegex)) {
      return;
    }

    const productListItem = {
      name: product,
      price: productPrice,
      id: unique_id,
    };

    setProductList([...productList, productListItem]);
    resetProductFields();
  };

  const addProduct = () => {
    // GET -> add new product with productList

    createNewProduct();
  };

  const addProductWithButton = (event: React.KeyboardEvent, productType: string) => {
    // GET -> add new product with productList
    const sumbit = event.key === 'Enter';
    const allowedToSubmit = sumbit && product && productPrice;
    const resetInput = event.key === 'Escape';

    if (resetInput && productType === 'product') {
      setProduct('');
    }

    if (resetInput && productType === 'price') {
      setProductPrice('');
    }

    if (allowedToSubmit) {
      createNewProduct();
    }
  };

  const deleteProduct = (id: string) => {
    const filtered = productList.filter(productItem => productItem.id !== id);

    setProductList(filtered);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!logoURL.match(emailRegex)) {
      setLogoURL('');

      return;
    }

    // if (!photosURL.match(emailRegex) && photosURL) {
    //   setPhotosURL('');

    //   return;
    // }

    if (!socialURL.match(emailRegex)) {
      setSocialURL('');

      return;
    }

    // if (!googleMapsURL.match(emailRegex) && googleMapsURL) {
    //   setGoogleMapsURL('');

    //   return;
    // }

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
          key={count}
          onSubmit={handleSubmit}
        >
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

          <Features cfpname={name} />

          <fieldset className="cfp-products">
            <h2 className="cfp-products__title">
              {'Продукти кав’ярні '}
              {name.length > 0 && name}
            </h2>

            <AddProducts
              product={product}
              productPrice={productPrice}
              onAdd={addProduct}
              onAddButton={addProductWithButton}
              setProduct={setProduct}
              setProductPrice={setProductPrice}
              productList={productList}
              onDelete={deleteProduct}
            />
          </fieldset>

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
