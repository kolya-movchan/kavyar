import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { deleteCity, getCitiesAll, postNewCity } from '../../api/fetch';
import { City } from '../../types/City';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { validateInput } from '../_tools/Regex';
import { scrollTop } from '../_tools/Tools';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Cities: React.FC = ( ) => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState(false);
  const [cities, setCities] = useState<City[] | null>(null);
  const [citiesInactive, setCitiesInactive] = useState<City[] | null>(null);
  const [loader, setLoader] = useState(false);
  // const [error, setError] = useState(false);

  const htmlElement = document.getElementById("html");

  const findDuplicate = () => {
    if (citiesInactive && cities) {
      console.log('DUPLICATE');
      
      return [...citiesInactive, ...cities].some(city => city.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addCity = () => {
    setQuery('');
    setInput(false);


    if (findDuplicate()) {
      return;
    }

    if (query) {
      const newCity = {
        id: 0,
        name: query,
      };

      activateLoading();

      postNewCity(newCity)
        .then(() => getAllData())
        .catch((e) => {
          console.log(e);
        })
        .finally(() => removeLoading());
    }
  };

  const handleCityDeletion = (id: number) => {
    activateLoading();

    deleteCity(id)
      .then(() => getAllData())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      })
      .finally(() => removeLoading());
  };

  const citiesSorted = cities?.sort((city1, city2) => {
    return city2.id - city1.id;
  });

  const citiesSortedInactive = citiesInactive?.sort((city1, city2) => {
    return city2.id - city1.id;
  });

  const citiesSearch = citiesSorted?.filter(
    city => city.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const citiesInactiveSearch = citiesSortedInactive?.filter(
    city => city.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery('');
    }

    if (event.key === 'Enter' && query) {
      addCity();
    }
  };

  const handleCityInput = (value: string) => {
    const inputText = validateInput(value);

    setQuery(inputText);
  };

  const isAnyCityFound = () => {
    if (citiesSearch && citiesInactiveSearch) {
      return [...citiesSearch, ...citiesInactiveSearch].length;
    }

    return true;
  };

  const getPromises: () => [Promise<City[]>, Promise<City[]>] = () => {
    return [
      getCitiesAll('cities?usable=true'),
      getCitiesAll('cities?usable=false')
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [citiesAPI, citiesInactiveAPI] = result;

    setCities(citiesAPI);
    setCitiesInactive(citiesInactiveAPI);
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
              type={cities ? 'bubbles' : 'spin'}
              color='#000'
            />
          </div>
        )}

        <div>
          <SearchPannel
            value={searchQuery}
            onChange={setSearchQuery}
            decoration="search-input--filters"
          />
        </div>

        <DynamicAddButton
          input={input}
          showInput={setInput}
          onQuery={handleCityInput}
          query={query}
          onAdd={addCity}
          onKey={handleKeyPress}
        />
      </div>

      <div className="filters">
        {!isAnyCityFound() && (
          <NotFound title='Міст' text='filters'/>
        )}

        <div className="filters__active filters__allLists">
          {(citiesSearch && citiesSearch.length > 0) && (
            <h2 className="filters__title">
              Активні
            </h2>
          )}

          <ul
            className="filters__active-list"
            style={ loader ? {marginTop: '20px'}: {}}
          >
            {citiesSearch && citiesSearch.map(city => (
              <DynamicField
                key={city.id}
                value={city.name}
                styling="filters__active-item"
              />
            ))}
          </ul>
        </div>

        <div className="filters__inactive filters__allLists">
          {(citiesInactiveSearch && citiesInactiveSearch.length > 0) && (
            <h2 className="filters__title">
            Неактивні
            </h2>
          )}

          <ul className="filters__inactive-list">
            {citiesInactiveSearch && citiesInactiveSearch.map(city => (
              <DynamicField
                key={city.id}
                value={city.name}
                id={city.id}
                styling="filters__inactive-item"
                stylingLink="../delete-icon.png"
                onDelete={handleCityDeletion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
