import React, { useEffect, useState } from 'react';
import { deleteCity, getCitiesAll, postNewCity } from '../../api/fetch';
import { City } from '../../types/City';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
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

  const getActiveCities = () => {
    getCitiesAll('cities?usable=true')
      .then(cityList => setCities(cityList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const getInactiveCities = () => {
    getCitiesAll('cities?usable=false')
      .then(cityList => setCitiesInactive(cityList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const findDuplicate = () => {
    if (citiesInactive && cities) {
      console.log('DUPLICATE');
      
      return [...citiesInactive, ...cities].some(city => city.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addCity = () => {
    setInput(false);
    scrollTop();

    if (findDuplicate()) {
      return;
    }

    if (query) {
      const newCity = {
        id: 0,
        name: query,
      };

      postNewCity(newCity)
        .then(() => setTimeout(() => {
          getActiveCities();
          getInactiveCities();
        }, 100))
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
    }
  };

  const handleCityDeletion = (id: number) => {
    setLoader(true);
    scrollTop();

    deleteCity(id)
      .then(() => getInactiveCities())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      })
      .finally(() => console.log(2)
      );
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

  const isAnyCityFound = () => {
    if (citiesSearch && citiesInactiveSearch) {
      return [...citiesSearch, ...citiesInactiveSearch].length;
    }

    return true;
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');
    setLoader(true);

    getActiveCities();
    getInactiveCities();
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
          onQuery={setQuery}
          query={query}
          onAdd={addCity}
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
                stylingLink="../power_cfp.svg"
                onDelete={handleCityDeletion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
