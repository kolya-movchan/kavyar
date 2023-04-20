import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getCFPById } from '../../api/fetch';
import { CFPforEDIT } from '../../types/CFP';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { scrollTop } from '../_tools/Tools';
import { NewProduct } from './NewProduct';


export const CFP_LangingPage: React.FC = () => {
  const htmlElement = document.getElementById("html");

  const locationURL = useLocation();
  const cfpId = locationURL.state;

  const [loader, setLoader] = useState(false);
  const [cfp, setCfp] = useState<CFPforEDIT | undefined>();

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

  useEffect(() => {
    activateLoading();
    scrollTop();
    
    if (cfpId) {
      getCFP(cfpId);
    }
  }, []);

  const {
    photo,
    logo,
    title,
    description,
    features,
    productPrices,
    url,
    location,
    // id,
    // city,
    // isDisable,
    // open,
    // close,
    // phone,
  } = cfp ?? {};

  console.log('BREWERS', photo?.url);
  
  

  const categoriesAll: string[] = [];
  productPrices?.map(productData => {
    const categoryName = productData.product.category.name;

    if (!categoriesAll.includes(categoryName)) {
      categoriesAll.push(categoryName);
    }
  });

  const featuresUnique: Feature[] = [];

  features?.map(feature => {
    const featureName = feature.name;

    if (!featuresUnique.some(f => f.name === featureName)) {
      featuresUnique.push(feature);
    }
  });

  console.log(location);


  return (
    <div className="CFP__main">
      {loader && (
        <div className="loading">
          <Loader
            type={'spin'}
            color='#000'
          />
        // </div>
      )}
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
          <h2 className="CFP__features-tilte">
            Особливості
          </h2>
          <ul className="CFP__features-list">
            {featuresUnique?.map(feature => {
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
        </div>
        <div className="CFP__menu">
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
                  style={{ width: '50%'}}
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
                  style={{ width: '50%', marginBottom: '10px'}}
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
                style={{ width: '50%', marginBottom: '10px'}}
              />
              Вебсайт
            </a>
          )}
        </div>
      </div>

      <div className="CFP__GoogleMap-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2539.0990352206873!2d30.487000000000002!3d50.476499999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDI4JzM1LjQiTiAzMMKwMjknMTMuMiJF!5e0!3m2!1sen!2sua!4v1682009423997!5m2!1sen!2sua"
          width="90%"
          height="600"
          loading="lazy"
          className='CFP__GoogleMap-map'
        >
        </iframe>
      </div>
    </div>
  );
};
