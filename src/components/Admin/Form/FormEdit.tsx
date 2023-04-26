import React, { useEffect, useState } from 'react';
import { getAllProductsAPI, getCFPById, getCitiesAll, getFeaturesAll, updateCFPById } from '../../../api/fetch';

import '../../../styles/blocks/admin/Form.scss';
import { City } from '../../../types/City';
import { Product, ProductForAPI, ProductOldfromAPI } from '../../../types/Product';
import { Notification } from '../../Notification';
import { Loader } from '../../Loader';
import { emailRegex, priceRegex } from '../../_tools/Regex';
import { scrollTop } from '../../_tools/Tools';
import { convertGoogleDrive, convertGoogleMap } from '../../_tools/Tools';
import { AddProducts } from './AddProducts';
import { Contacts } from './Contacts';
import { InputField } from './InputField';
import { useLocation } from "react-router-dom";
import { CFPforEDIT } from '../../../types/CFP';
import { CheckBox } from './CheckBox';
import { Feature } from '../../../types/Feature';
import { Time } from './Time';

export const FormEdit: React.FC = () => {
  const [logoURL, setLogoURL] = useState('');
  const [name, setName] = useState('');
  const [googleMapsURL, setGoogleMapsURL] = useState('');
  const [timeOpen, setTimeOpen] = useState('07:00');
  const [timeClose, setTimeClose] = useState('23:00');
  const [photosURL, setPhotosURL] = useState('');
  const [cityId, setCityId] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+380');
  const [nameForUser, setNameForUser] = useState('');
  const [apiID, setApiID] = useState('');
  const [count, addCount] = useState(0);
  const [idCFP, setIdSFP] = useState(0);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cities, setCities] = useState<City[]>();
  const [productList, setProductList] = useState<Product[]>([]);
  const [productPricesForAPI, setProductPricesForAPI] = useState<ProductForAPI[]>([]);
  const [featureList, setFeatureList] = useState<number[]>([]);
  const [notification, setNotification] = useState<null | string>('');
  const [productsOld, setProductsOld] = useState<ProductOldfromAPI[]>([]);
  const [photoId, setPhotoId] = useState(0);
  const [logoId, setLogoId] = useState(0);
  const [features, setFeatures] = useState<Feature[] | null>(null);

  const location = useLocation();
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
    setPhoneNumber('+380');
    setCityId('');
    setTimeOpen('07:00');
    setTimeClose('23:00');
    setFeatureList([]);
    setProductList([]);
    addCount(count + 1);
  };

  const resetProductFields = () => {
    setProduct('');
    setProductPrice('');
  };

  const addFeatureList = (id: number) => {
    if (featureList.includes(id)) {
      const removedFeature = featureList.filter(idFeature => idFeature !== id);
      setFeatureList(removedFeature);

      return;
    }

    setFeatureList([...featureList, id]);
  };

  const addProductWithButton = (event: React.KeyboardEvent, productType: string) => {
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

  const handlePhoneNumber = (value: string) => {
    if (value.match(/^[0-9+]*$/))
      setPhoneNumber(value);
  };

  const createNewProduct = () => {
    if (!productPrice.match(priceRegex)) {
      return;
    }

    if (productList.some(productEl => productEl.name === nameForUser)) {
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
  };

  const handleSelect = (idForAPI: string, valueName?: string) => {
    setApiID(idForAPI);
    setNameForUser(valueName as string);
  };

  const handleCitySelect = (cityIdValue: string) => {
    setCityId(cityIdValue);
  };

  const hideNotification = () => {
    setNotification('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    hideNotification();
    activateLoading();

    if (!name.trim()) {
      removeLoading();
      setNotification('error');
      
      return;
    }

    if (!logoURL.match(emailRegex)) {
      setLogoURL('');
      removeLoading();
      scrollTop();
      return;
    }

    if (!socialURL.match(emailRegex)) {
      setSocialURL('');
      removeLoading();
      scrollTop();

      return;
    }

    const productsOldCurrent = productsOld.filter(
      productValue => productList.some(productEl => productEl.id === productValue.productPriceId)
    );

    const newCFPForEdit = {
      coffeeShopId: idCFP,
      cityId: +cityId,
      title: name,
      description,
      phone: phoneNumber,
      open: timeOpen,
      close: timeClose,
      url: socialURL,
      logo: {id: logoId, url: convertGoogleDrive(logoURL)},
      photo: {id: photoId, url: convertGoogleDrive(photosURL)},
      location: convertGoogleMap(googleMapsURL),
      features: featureList,
      productPrices: productsOldCurrent,
      newProductPrices: productPricesForAPI,
    };

    updateCFPById(newCFPForEdit)
      .then(() => {
        setNotification('success');
        reset();
      })
      .catch(() => {
        setNotification('error');
      })
      .finally(() => {
        removeLoading();
      });
  };

  const getPromises: () => [Promise<City[]>, Promise<Product[]>, Promise<Feature[]>] = () => {
    return [
      getCitiesAll('cities?usable=true'),
      getAllProductsAPI('products'),
      getFeaturesAll('features'),
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [citiesAPI, productsAPI, featuresAPI] = result;

    setCities(citiesAPI);
    setProducts(productsAPI);
    setFeatures(featuresAPI);
  };

  const activateLoading = () => {
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  const setUpEditInfo = (cfp: CFPforEDIT) => {
    const {
      id,
      city,
      title,
      logo,
      photo,
      url,
      description: descriptionEdit,
      open,
      close,
      features: featuresEdit,
      location: locationEdit,
      phone,
      productPrices,
    } = cfp;

    setIdSFP(id);
    setCityId(city.id.toString());
    setName(title);
    setLogoURL(logo.url);
    setLogoId(logo.id);
    setPhotosURL(photo.url);
    setPhotoId(photo.id);
    setSocialURL(url);
    setGoogleMapsURL(locationEdit);
    setDescription(descriptionEdit);
    setPhoneNumber(phone);
    setTimeOpen(open);
    setTimeClose(close);
    setFeatureList(featuresEdit.map(feature => feature.id));

    const productsEditForUser = productPrices.map(productItem => (
      {
        id: productItem.product.id,
        name: productItem.product.name,
        price: productItem.price,
      }
    ));

    setProductList(productsEditForUser);
    
    const productsOldData = productPrices.map(productItem => (
      {
        productPriceId: productItem.id,
        price: productItem.price,
      }
    ));

    setProductsOld(productsOldData);
  };

  useEffect(() => {
    activateLoading();
    scrollTop();
    getAllData();

    getCFPById(location.state)
      .then((coffeShopEdit) => setUpEditInfo(coffeShopEdit))
      .finally(() => {
        removeLoading();
      });
  }, []);

  return (
    <>
      {loader && <Loader type='spin' color='#000'/>}

      {(notification === 'success') && (
        <Notification
          title='Запит виконано 😎'
          description={
            `Кавʼярня успішно оновлена, вітаю!
            Тепер ви можете переглянути її в розділі "Кавʼярні"`
          }
          type='success'
          link='/admin/coffeeshops'
          onExit={hideNotification}
        />
      )}

      {notification === 'error' && (
        <Notification
          title='Упс, щось пішло не так 😔'
          description='Перегляньте уважно заповнені поля та Спробуйте ще раз або перевірте адмінський доступ'
          type='error'
          onExit={hideNotification}
        />
      )}

      <div className="admin-form-container">
        <div className="admin-form-container2">
          <h1 className="admin-form-heading">
            Редагувати кавʼярню {' '}
            {name && (
              <span className="highlight-container">
                <span className="highlight">{name}</span>
              </span>
            )}
          </h1>

          <form
            className="admin-form"
            name="admin-form"
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
                cityOnEdit={+cityId}
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
              Номер Кавʼярні

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
              <Time
                title='Час Відкриття'
                value={timeOpen}
                onChange={setTimeOpen}
              />

              <Time
                title='Час Закриття'
                value={timeClose}
                onChange={setTimeClose}
              />
            </div>

            <fieldset className="cfp-features">
              <h2 className="cfp-features__title">
                {'Особливості кав’ярні '}
                {name.length > 0 && (
                  <span className="highlight-container">
                    <span className="highlight">{name}
                    </span>
                  </span>
                )}
              </h2>

              <div className="cfp-features__wrapper">
                {features?.map(feature => (
                  <CheckBox
                    key={feature.id}
                    name={feature.name}
                    value={feature.id.toString()}
                    id={feature.id}
                    onCheck={addFeatureList}
                    featuresOnEdit={featureList}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="cfp-products">
              <h2 className="cfp-products__title">
                {'Продукти кав’ярні '}

                {name && (
                  <span className="highlight-container">
                    <span className="highlight">{name}</span>
                  </span>
                )}
              </h2>

              <AddProducts
                product={product}
                productPrice={productPrice}
                productList={productList}
                data={products}
                onAddButton={addProductWithButton}
                onAdd={createNewProduct}
                setProductPrice={setProductPrice}
                onChange={setProduct}
                onDelete={deleteProduct}
                onSelect={handleSelect}
              />
            </fieldset>

            <div className="">
              <button
                type="submit"
                className="add-cfp__button button is-black hoveredButton"
                disabled={!fieldsFilledIn}
              >
                Оновити кавʼярню
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
