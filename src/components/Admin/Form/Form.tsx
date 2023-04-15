import React, { useEffect, useState } from 'react';
import { getAllProductsAPI, getCitiesAll, postNewCFPAPI } from '../../../api/fetch';

import '../../../styles/blocks/admin/Form.scss';
import { City } from '../../../types/City';
import { Product } from '../../../types/Product';
import { Loader } from '../../Loader';
import { emailRegex, priceRegex } from '../../_tools/Regex';
import { scrollTop } from '../../_tools/Tools';
import { convertGoogleDrive } from '../CoffeeShops';
import { AddProducts } from './AddProducts';
import { Contacts } from './Contacts';
import { Features } from './Features';
import { InputField } from './InputField';


export const Form: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  interface ProductForAPI {
    productId: number;
    price: number;
  }

  const [logoURL, setLogoURL] = useState('');
  const [photosURL, setPhotosURL] = useState('');
  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>();
  const [cityId, setCityId] = useState('');
  const [description, setDescription] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [googleMapsURL, setGoogleMapsURL] = useState('');
  const [product, setProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [count, addCount] = useState(0);
  const [timeOpen, setTimeOpen] = useState('07:00');
  const [timeClose, setTimeClose] = useState('23:00');
  const [productList, setProductList] = useState<Product[]>([]);
  const [productPricesForAPI, setProductPricesForAPI] = useState<ProductForAPI[]>([]);
  const [featureList, setFeatureList] = useState<number[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('+380');
  const [apiID, setApiID] = useState('');
  const [nameForUser, setNameForUser] = useState('');


  const unique_id = Date.now();
  
  const fieldsFilledIn = logoURL && name && description && socialURL;

  const htmlElement = document.getElementById("html");

  // console.log(products);

  // console.log(productPrice);
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const addFeatureList = (id: number) => {
    setFeatureList([...featureList, id]);
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

  const handlePhoneNumber = (value: string) => {
    if (value.match(/^[0-9+]*$/))
      setPhoneNumber(value);
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');

    setLoader(true);
    getData();

  }, []);

  // const alertUser = (event: BeforeUnloadEvent) => {
  //   event.returnValue = "";
  // };

  useEffect(() => {
    window.addEventListener("unload", scrollTop);
    return () => {
      window.removeEventListener("unload", scrollTop);
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  const createNewProduct = () => {
    if (!productPrice.match(priceRegex)) {
      return;
    }

    const productListItem = {
      id: unique_id,
      name: nameForUser,
      price: productPrice,
    };

    const productListForAPI = {
      productId: +apiID,
      price: +productPrice,
    };

    setProductList([...productList, productListItem]);
    setProductPricesForAPI([...productPricesForAPI, productListForAPI]);
    resetProductFields();

    console.log(productList, 'productList');
    console.log(productPricesForAPI, 'productListAPI');
  };

  const handleSelect = (idForAPI: string, valueName?: string) => {
    setApiID(idForAPI);
    setNameForUser(valueName as string);
  };

  const handleCitySelect = (cityIdValue: string) => {
    setCityId(cityIdValue);
  };
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!logoURL.match(emailRegex)) {
      setLogoURL('');

      return;
    }

    if (!socialURL.match(emailRegex)) {
      setSocialURL('');

      return;
    }
   
    const newCFP = {
      cityId: +cityId,
      title: name,
      description: description,
      phone: phoneNumber,
      open: timeOpen,
      close: timeClose,
      url: socialURL,
      logo: {url: convertGoogleDrive(logoURL)},
      photo: {url: photosURL},
      location: googleMapsURL,
      features: featureList,
      productPrices: productPricesForAPI,
    };

    console.log(newCFP);
    

    // setLoader(true);
    // scrollTop();
    // reset();

    postNewCFPAPI(newCFP)
      .catch((e) => console.log(e))
      .finally(() => {
        setLoader(false);
      });
  };
  
  return (
    <>
      {loader && (
        <div className="loading">
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
            {cities && (
              <InputField
                name="cityId"
                label="Назва Міста"
                value={cityId}
                dataAPI={cities}
                onChange={setCityId}
                onSelect={handleCitySelect}
                selecting
                required
              />
            )}

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

            <label className='cfp-phone'>
              <div>
              Номер Кавʼярні
              </div>

              <input
                className="input admin-form__phone-input"
                type="tel"
                placeholder='Введіть Номер Телефону'
                value={phoneNumber}
                maxLength={13}
                onChange={event => handlePhoneNumber(event.target.value)}
              />
            </label>

            <div className='cfp-time'>
              <label className="cfp-time__container">
                Час Відкриття
                <input
                  className="cfp-time__input input"
                  type="time"
                  name="appt"
                  value={timeOpen}
                  onChange={(event) => setTimeOpen(event.target.value)}
                  step="3600"
                />
              </label>

              <label className="cfp-time__container">
                Час Закриття
                <input
                  className="cfp-time__input input"
                  type="time"
                  name="appt"
                  value={timeClose}
                  onChange={(event) => setTimeClose(event.target.value)}
                  step="3600"
                />
              </label>
            </div>

            <Features
              cfpname={name}
              onCheck={addFeatureList}
            />

            <fieldset className="cfp-products">
              <h2 className="cfp-products__title">
                {'Продукти кав’ярні '}
                {name.length > 0 && name}
              </h2>

              <AddProducts
                product={product}
                productPrice={productPrice}
                productList={productList}
                data={products}
                onAddButton={addProductWithButton}
                onAdd={addProduct}
                setProductPrice={setProductPrice}
                onChange={setProduct}
                onDelete={deleteProduct}
                onSelect={handleSelect}
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
