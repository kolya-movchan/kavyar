import React, { useEffect, useState } from 'react';
import { deleteFeatureAPI, getFeaturesAll, postNewFeature } from '../../api/fetch';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { scrollTop } from '../_tools/Tools';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Features: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [featuresInactive, setFeaturesInactive] = useState<Feature[] | null>(null);
  const [loader, setLoader] = useState(false);

  const htmlElement = document.getElementById("html");

  const getFeaturesActive = () => {
    getFeaturesAll('features?usable=true')
      .then(featuresList => setFeatures(featuresList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const getInactiveFeatures = () => {
    getFeaturesAll('features?usable=false')
      .then(featuresList => setFeaturesInactive(featuresList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const findDuplicate = () => {
    if (featuresInactive && features) {
      console.log('DUPLICATE');
      
      return [...featuresInactive, ...features].some(city => city.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addFeatures = () => {
    setInput(false);
    scrollTop();

    if (findDuplicate()) {
      return;
    }

    if (query) {
      const newFeature = {
        id: 0,
        name: query,
        description: query,
      };

      postNewFeature(newFeature)
        .then(() => setTimeout(() => {
          getFeaturesActive();
          getInactiveFeatures();
        }, 100))
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
    }
  };

  const handleFeatureDeletion = (id: number) => {
    setLoader(true);
    scrollTop();

    deleteFeatureAPI(id)
      .then(() => {
        getFeaturesActive();
        getInactiveFeatures();
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const featuresSorted = features?.sort((feature1, feature2) => {
    return feature2.id - feature1.id;
  });

  const featuresSortedInactive = featuresInactive?.sort((feature1, feature2) => {
    return feature2.id - feature1.id;
  });

  const featuresSearch = featuresSorted?.filter(
    feature => feature.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const featuresInactiveSearch = featuresSortedInactive?.filter(
    feature => feature.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const isAnyFeatureFound = () => {
    if (featuresSearch && featuresInactiveSearch) {
      return [...featuresSearch, ...featuresInactiveSearch].length;
    }

    return true;
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');
    setLoader(true);

    getFeaturesActive();
    getInactiveFeatures();
  }, []);

  useEffect(() => {
    window.addEventListener("unload", scrollTop);
    return () => {
      window.removeEventListener("unload", scrollTop);
    };
  }, []);

  return (
    <>
      <div className="menus-top">
        {loader && (
          <div className="loading">
            <Loader
              type={features ? 'bubbles' : 'spin'}
              color='#000'
            />
          </div>
        )}

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
        {!isAnyFeatureFound() && (
          <NotFound title='Особливостей' text='filters'/>
        )}

        <div className="filters__active filters__allLists">
          {(featuresSearch && featuresSearch.length > 0) && (
            <h2 className="filters__title">
              Активні
            </h2>
          )}

          <ul
            className="filters__active-list"
            style={ loader ? {marginTop: '20px'}: {}}
          >
            {featuresSearch && (featuresSearch.map(feature => (
              <DynamicField
                key={feature.id}
                value={feature.name}
                styling="filters__active-item"
              />
            )))}
          </ul>
        </div>

        <div className="filters__inactive filters__allLists">
          {(featuresInactiveSearch && featuresInactiveSearch.length > 0) && (
            <h2 className="filters__title">
            Неактивні
            </h2>
          )}

          <ul className="filters__inactive-list">
            {featuresInactiveSearch && featuresInactiveSearch.map(feature => (
              <DynamicField
                key={feature.id}
                value={feature.name}
                id={feature.id}
                styling="filters__inactive-item"
                stylingLink="../power_cfp.svg"
                onDelete={handleFeatureDeletion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
