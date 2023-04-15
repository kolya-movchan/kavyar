import React, { useEffect, useState } from 'react';
import { deleteFeatureAPI, getFeaturesAll, postNewFeature } from '../../api/fetch';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { validateInput } from '../_tools/Regex';
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

  const findDuplicate = () => {
    if (featuresInactive && features) {
      console.log('DUPLICATE');
      
      return [...featuresInactive, ...features].some(city => city.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addFeatures = () => {
    if (findDuplicate()) {
      return;
    }

    if (query) {
      const newFeature = {
        id: 0,
        name: query,
        description: query,
      };

      activateLoading();


      postNewFeature(newFeature)
        .then(() => {
          getAllData();
          setQuery('');
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => removeLoading());
    }
  };

  const handleFeatureDeletion = (id: number) => {
    setLoader(true);
    scrollTop();

    deleteFeatureAPI(id)
      .then(() => getAllData())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      })
      .finally(() => removeLoading());
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

  const handleFeatureInput = (value: string) => {
    const inputText = validateInput(value);

    setQuery(inputText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery('');
    }

    if (event.key === 'Enter' && query) {
      addFeatures();
    }
  };

  const getPromises: () => [Promise<Feature[]>, Promise<Feature[]>] = () => {
    return [
      getFeaturesAll('features?usable=true'),
      getFeaturesAll('features?usable=false'),
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [featuresAPI, featuresInactiveAPI] = result;

    setFeatures(featuresAPI);
    setFeaturesInactive(featuresInactiveAPI);
  };

  const activateLoading = () => {
    scrollTop();
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  useEffect(() => {
    activateLoading();
    getAllData();
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
          onQuery={handleFeatureInput}
          query={query}
          onAdd={addFeatures}
          onKey={handleKeyPress}
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
                stylingLink="../delete-icon.png"
                onDelete={handleFeatureDeletion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
