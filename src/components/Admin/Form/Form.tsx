import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsAPI, getCFPById, getCitiesAll, getFeaturesAll, postNewCFPAPI, updateCFPById } from '../../../api/fetch';

import '../../../styles/blocks/admin/Form.scss';
import { City } from '../../../types/City';
import { Product, ProductForAPI } from '../../../types/Product';
import { ErrorMessage } from '../../ErrorMessage';
import { Loader } from '../../Loader';
import { emailRegex, priceRegex } from '../../_tools/Regex';
import { convertGoogleDrive, convertGoogleMap, scrollTop} from '../../_tools/Tools';
import { AddProducts } from './AddProducts';
import { Contacts } from './Contacts';
// import { Features } from './Features';
import { InputField } from './InputField';
import { useLocation } from "react-router-dom";
import { CFPforEDIT } from '../../../types/CFP';
import { CheckBox } from './CheckBox';
import { Feature } from '../../../types/Feature';

export const Form: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [logoURL, setLogoURL] = useState('');
  const [name, setName] = useState('');
  const [googleMapsURL, setGoogleMapsURL] = useState('');
  const [timeOpen, setTimeOpen] = useState('07:00');
  const [timeClose, setTimeClose] = useState('23:00');
  const [photosURL, setPhotosURL] = useState('');
  const [cityId, setCityId] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [description, setDescription] = useState('');
  const [cities, setCities] = useState<City[]>();
  const [product, setProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [count, addCount] = useState(0);
  const [productList, setProductList] = useState<Product[]>([]);
  const [productPricesForAPI, setProductPricesForAPI] = useState<ProductForAPI[]>([]);
  const [featureList, setFeatureList] = useState<number[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('+380');
  const [apiID, setApiID] = useState('');
  const [nameForUser, setNameForUser] = useState('');
  const [notification, setNotification] = useState<null | string>('');
  const [idCFP, setIdSFP] = useState(0);
  const [productsOld, setProductsOld] = useState<{
    productPriceId: number;
    price: number;
}[]>([]);
  const [photoId, setPhotoId] = useState(0);
  const [logoId, setLogoId] = useState(0);

  const [searchParams] = useSearchParams();
  const editMode = searchParams.get('edit');
  const location = useLocation();
  const [features, setFeatures] = useState<Feature[] | null>(null);


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

    // const filteredEdit = productList.filter(productItem => {
    //   if (productItem.id !== id) {
    //     return;
    //   }

    //   return {
    //     productPriceId: productItem.id,
    //     price: productItem.price,
    //   };
    // });

    // console.log(filteredEdit);
    

    setProductList(filtered);
    // setProductsOld(filteredEdit);
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

  const handleEditSubmit = () => {
    // const cityName = cities?.find(city => city.id === +cityId)?.name;
    // const featuresForEdit = features?.filter(featuresValue => featureList.includes(featuresValue.id));

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

    console.log(newCFPForEdit.location);
    

    updateCFPById(newCFPForEdit)
      .then(() => {
        console.log('SUCCESS EDIT');
        setNotification('success');
        reset();
      })
      .catch(() => {
        console.log('FAIL');
        setNotification('error');
      })
      .finally(() => {
        // hideNotification();
        searchParams.set('edit', 'false');
        reset();
        removeLoading();
      });

    // console.log(JSON.stringify(newCFPForEdit));
  };

  const cancelSubmit = () => {
    removeLoading();
    scrollTop();
    setNotification('error');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    hideNotification();
    activateLoading();

    if (!logoURL.match(emailRegex) || !logoURL.trim()) {
      setLogoURL('');
      cancelSubmit();

      return;
    }

    if (!socialURL.match(emailRegex) || !socialURL.trim()) {
      setSocialURL('');
      cancelSubmit();

      return;
    }

    if (
      !googleMapsURL.includes('map')
      || !googleMapsURL.match(emailRegex)
      || !googleMapsURL.trim()
    ) {
      setGoogleMapsURL('');
      cancelSubmit();

      return;
    }

    if (
      !socialURL.includes('facebook') ||
      !socialURL.includes('instagram') ||
      !googleMapsURL.match(emailRegex)
    ) {
      setGoogleMapsURL('');
      cancelSubmit();

      return;
    }

    if (editMode) {
      handleEditSubmit();

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
      photo: {url: convertGoogleDrive(photosURL)},
      location: convertGoogleMap(googleMapsURL),
      features: featureList,
      productPrices: productPricesForAPI,
    };

    postNewCFPAPI(newCFP)
      .then(() => {
        setNotification('success');
        reset();
      })
      .catch(() => setNotification('error'))
      .finally(() => {
        removeLoading();
        // hideNotification();
      });
  };

  const getPromises: () => [Promise<City[]>, Promise<Product[]>] = () => {
    return [
      getCitiesAll('cities?usable=true'),
      getAllProductsAPI('products'),
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [citiesAPI, productsAPI] = result;

    setCities(citiesAPI);
    setProducts(productsAPI);
  };

  const activateLoading = () => {
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  useEffect(() => {
    scrollTop();
    activateLoading();
    getAllData();
    getAllFeatures();

    if (editMode) {
      activateEditMode();
    }
  }, []);

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

    // console.log(productPrices, 'GET DATA');
    
    const productsOldData = productPrices.map(productItem => (
      {
        productPriceId: productItem.id,
        price: productItem.price,
      }
    ));

    setProductsOld(productsOldData);
  };

  const activateEditMode = () => {
    activateLoading();
    scrollTop();

    getCFPById(location.state)
      .then((coffeShopEdit) => setUpEditInfo(coffeShopEdit))
      .finally(() => {
        removeLoading();
      });
  };

  const getAllFeatures = () => {
    getFeaturesAll('features')
      .then(featuresList => {
        setFeatures(featuresList);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const alertUser = (event: BeforeUnloadEvent) => {
  //   event.returnValue = "";
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);
  
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

      {(notification === 'success' && !editMode) && (
        <ErrorMessage
          title='Запит виконано 😎☕'
          description='Нова кавʼярня створена, вітаю!Тепер ви можете переглянути її в розділі "Кавʼярні"'
          type='success'
          link='/admin/coffeeshops'
          onExit={hideNotification}
        />
      )}

      {(notification === 'success' && editMode) && (
        <ErrorMessage
          title='Запит виконано 😎☕'
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
        <ErrorMessage
          title='Упс, щось пішло не так 😔'
          description='Перегляньте уважно заповнені поля та Спробуйте ще раз або перевірте адмінський доступ'
          type='error'
          onExit={hideNotification}
        />
      )}


      <div className="admin-form-container">
        <div className="admin-form-container2">
          <h1 className="admin-form-heading">
            {editMode
              ? (
                <>
                  Редагувати кавʼярню {' '}
                  {name && (
                    <span className="highlight-container">
                      <span className="highlight">{name}</span>
                    </span>
                  )}
                </>
              )
              : 'Створити кавʼярню'}
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

            {/* <Features
              // cfpname={name}
              // onCheck={addFeatureList}
              // featuresOnEdit={featureList}
            /> */}

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
                {(editMode && name.length > 0 )&& (
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
                className="add-cfp__button button is-black hoveredButton"
                disabled={!fieldsFilledIn}
              >
                {`${editMode ? 'Оновити' : 'Створити'} кавʼярню`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
