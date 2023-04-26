import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getCFPById } from '../../api/fetch';
import { GoBack } from '../GoBack';
import { Loader } from '../Loader';
import { scrollTop } from '../_tools/Tools';
import { NewProduct } from './NewProduct';

import { CFPforEDIT } from '../../types/CFP';

export const CFP_LangingPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [cfp, setCfp] = useState<CFPforEDIT | undefined>();

  const htmlElement = document.getElementById("html");
  const locationURL = useLocation();
  const cfpId = locationURL.state;

  const activateLoading = () => {
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  const getCFP = (id: string) => {
    getCFPById(id)
      .then((data) => setCfp(data))
      .catch((e) => console.log(e))
      .finally(() => removeLoading());
  };

  const {
    photo,
    logo,
    title,
    description,
    features,
    productPrices,
    url,
    location,
    open,
    close,
    phone,
  } = cfp ?? {};
  
  const categoriesAll: string[] = [];

  productPrices?.map(productData => {
    const categoryName = productData.product.category.name;

    if (!categoriesAll.includes(categoryName)) {
      categoriesAll.push(categoryName);
    }
  });

  useEffect(() => {
    activateLoading();
    scrollTop();
    
    if (cfpId) {
      getCFP(cfpId);
    }
  }, []);

  return (
    <div className="CFP__main">
      <GoBack title={title ? title : ''} />

      {loader && <Loader type={'spin'} color='#000'/>}

      <div className="CFP__photo-container">
        {photo && (
          <div className="CFP__image">
            <img
              src={photo?.url}
              alt={`${title}coffeeshop-photo`}
              className="CFP__main-photo"
            />
          </div>
        )}
      </div>

      <div className="CFP__about-container">
        <div className="CFP__logo-container">
          <img
            src={logo?.url}
            alt={`${title} logo`}
            className="CFP__logo-picture"
          />
        </div>
        <div className="CFP__name">
          {title}
        </div>
        <div className="CFP__description">
          {description}
        </div>
      </div>

      <div className="CFP__products-container">

        <div className="CFP__features">
          {(features && features?.length > 0) && (
            <>
              <h2 className="CFP__features-tilte">
                Особливості
              </h2>

              <ul className="CFP__features-list">
                {features?.map(feature => {
                  return (
                    <li
                      className="CFP__feature-item"
                      key={feature.id}
                    >
                      <img
                        src="../check_box-filled.svg"
                        alt="checkbox"
                        className="CFP__feature-checkbox"
                      />
                      <span className="feature-name">
                        {feature.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="CFP__menu">
          {(productPrices && productPrices?.length > 0) && (
            <>
              <h2 className="CFP__features-tilte">
                Меню
              </h2>
              <div className="CFP__menu-container">
                {categoriesAll?.map(category => {
                  return (
                    <div className="CFP__menu-item" key={category}>
                      <h3 className="CFP__features-tilte">
                        {category}
                      </h3>
                      {productPrices?.map(product => {
                        const targetCategory = product.product.category.name;
                        if (targetCategory === category) {
                          return (
                            <NewProduct
                              key={product.product.id}
                              name={product.product.name}
                              price={product.price}
                            />
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="CFP__social-container">
        <h3 className="CFP__social-header">
          Соціальні Мережі
        </h3>

        <div className="CFP__social-link">
          {url?.includes('facebook') && (
            <div className="social-container">
              <a 
                href={url} 
                style={{color: '#000'}}
                target="_blank"
              >
                <img
                  src="../Facebook-Icon.png"
                  alt="facebook"
                  style={{ width: '50px'}}
                />

                Facebook
              </a>
            </div>

          )}

          {url?.includes('instagram.com') && (
            <div className="social-container">
              <a 
                href={url}
                style={{color: '#000'}}
                target="_blank"
              >
                <img
                  src="../Instagram-Logo.png"
                  alt="instagram"
                  style={{ width: '50px', marginBottom: '10px'}}
                />
                Instagram
              </a>
            </div>

          )}

          {!url?.includes('facebook') && !url?.includes('instagram') && (
            <a 
              href={url}
              style={{color: '#000', display: 'block'}}
              target="_blank"
            >
              <img
                src="../Website-Logo.png"
                alt="website"
                style={{ width: '50px', marginBottom: '10px'}}
              />
              Вебсайт
            </a>
          )}
        </div>
      </div>

      <div className="CFP__contacts-container">
        <h3 className="CFP__header">
          Робочі години та Контакти
        </h3>

        <div className="CFP__wrapper">
          <div className="CFP__hours">
            <div className="CFP__open CFP__time">
              <img
                src="../clock.png"
                alt="clock"
                className="CFP__clock" 
              />
              {open?.slice(0, 5)}
            </div>

            <div className="CFP__close CFP__time">
              <img
                src="../clock.png"
                alt="clock"
                className="CFP__clock" 
              />
              {close?.slice(0, 5)}
            </div>
          </div>

          <div className="CFP__contacts">
            <div className="CFP__phone-wrapper">
              <a
                href={`tel:${phone}`}
                className="tel"
              >
                <img
                  src="../phone.png"
                  alt="clock"
                  className="CFP__clock"
                />

                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="CFP__GoogleMap-container">
        <iframe
          src={location}
          width="70%"
          height="600"
          loading="lazy"
          className='CFP__GoogleMap-map'
        >
        </iframe>
      </div>
    </div>
  );
};
