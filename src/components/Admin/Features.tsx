import React, { useEffect, useState } from 'react';
import { deleteFeatureAPI, getFeaturesAll, postNewFeature } from '../../api/fetch';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Features: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [loader, setLoader] = useState(false);

  const getFeatures = () => {
    getFeaturesAll('features')
      .then(featuresList => setFeatures(featuresList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => setLoader(false));
  };

  const addFeatures = () => {
    setInput(false);

    if (query) {
      const newFeature = {
        id: 0,
        name: query,
        description: query,
      };

      postNewFeature(newFeature)
        .then(() => setTimeout(() => {
          getFeatures();
        }, 100))
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
    }
  };

  const deleteFeature = (id: number) => {
    console.log(id);
    
    setLoader(true);

    deleteFeatureAPI(id)
      .then(() => getFeatures())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const featuresSorted = features?.sort((feature1, feature2) => {
    return feature2.id - feature1.id;
  });

  useEffect(() => {
    getFeatures();
  }, []);


  return (
    <>
      <div className="menus-top">
        <SearchPannel
          value={searchQuery}
          onChange={setSearchQuery}
          decoration="search-input--filters"
        />

        <DynamicAddButton
          input={input}
          showInput={setInput}
          onQuery={setQuery}
          query={query}
          onAdd={addFeatures}
        />
      </div>

      <div className="filters">
        <div className="filters__active">
          <h2 className="filters__title">
            Активні
          </h2>

          {!features && <Loader type='spin' color='#000' />}

          {loader && <Loader type='bubbles' color='#000' />}

          <ul
            className="filters__active-list"
            style={ loader ? {marginTop: '20px'}: {}}
          >
            {featuresSorted && (featuresSorted.map(feature => (
              <DynamicField
                key={feature.id}
                value={feature.name}
                styling="filters__active-item"
                stylingLink="../power_cfp.svg"
                id={feature.id}
                onDelete={deleteFeature}
              />
            )))}
          </ul>
        </div>

        {/* <div className="filters__inactive">
          <h2 className="filters__title">
            Неактивні
          </h2>

          <ul className="filters__inactive-list">
            {test2.map(city => (
              <DynamicField
                key={city}
                value={city}
                styling="filters__inactive-item"
                stylingLink="../power_cfp-white.svg"
                stylingColor="filters__toggle--black"
              />
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};
