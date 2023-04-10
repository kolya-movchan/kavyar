import React, { useEffect, useState } from 'react';
import { getAllProductsAPI, getCitiesAll } from '../../../api/fetch';

import '../../../styles/blocks/admin/Form.scss';
import { City } from '../../../types/City';
import { Product } from '../../../types/Product';
import { Loader } from '../../Loader';
import { emailRegex, priceRegex } from '../../_tools/Regex';
import { AddProducts } from './AddProducts';
import { Contacts } from './Contacts';
import { Features } from './Features';
import { InputField } from './InputField';

export const Form: React.FC = () => {
  const [logoURL, setLogoURL] = useState('');
  const [photosURL, setPhotosURL] = useState('');
  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>();
  const [city, setCity] = useState('');
  const [products, setProducts] = useState<Product[] | null>(null);
  const [description, setDescription] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [googleMapsURL, setGoogleMapsURL] = useState('');
  const [product, setProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [count, addCount] = useState(0);
  const [productList, setProductList] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);

  const unique_id = Date.now();
  
  const fieldsFilledIn = logoURL && name && description && socialURL;

  const htmlElement = document.getElementById("html");

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
    createNewProduct();
  };

  const addProductWithButton = (event: React.KeyboardEvent, productType: string) => {
    // GET -> add new product with productList
    const sumbit = event.key === 'Enter';
    const allowedToSubmit = sumbit && product && productPrice;
    const resetInput = event.key === 'Escape';

    if (resetInput && productType === 'price') {
      setProductPrice('');
    }

    if (allowedToSubmit) {
      createNewProduct();
    }
  };

  const deleteProduct = (id: number) => {
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

  const getAllCities = () => {
    getCitiesAll('cities')
      .then(cityList => setCities(cityList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const getAllProducts = () => {
    getAllProductsAPI('products')
      .then(categoriesList => setProducts(categoriesList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        setTimeout(() => {
          htmlElement?.classList.remove('hidden');
        }, 300);
      });
  };

  const getData = () => {
    getAllCities();
    getAllProducts();
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');

    setLoader(true);
    getData();

  }, []);

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const alertUser = (event: BeforeUnloadEvent) => {
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("unload", scrollTop);
    return () => {
      window.removeEventListener("unload", scrollTop);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  
  return (
    <>
      {loader && (
        <div className="admin-form__loader">
          <Loader
            type='spin'
            color='#000'
          />
        </div>
      )}

      <div className="admin-form-container">
        <div className="admin-form-container2">
          <h1 className="admin-form-heading">
            Створити кавʼярню
          </h1>

          <form
            className="admin-form"
            name="admin-form"
            action="/"
            method="get"
            key={count}
            onSubmit={handleSubmit}
          >
            <InputField
              name="city"
              label="Назва Міста"
              value={city}
              dataAPI={cities}
              onChange={setCity}
              selecting
              required
            />

            <Contacts
              logoURL={logoURL}
              photosURL={photosURL}
              name={name}
              description={description}
              socialURL={socialURL}
              googleMapsURL={googleMapsURL}
              setName={setName}
              setLogoURL={setLogoURL}
              setPhotosURL={setPhotosURL}
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
                data={products}
              />

              <input
                type="hidden"
                name="product-list"
                value={JSON.stringify(productList)}
              />
            </fieldset>

            <div className="">
              <button
                type="submit"
                className="add-cfp__button button is-link"
                disabled={!fieldsFilledIn}
                style={{ backgroundColor: '#000' }}
              >
                Створити кавʼярню
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
