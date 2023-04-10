import React, { useEffect, useState } from 'react';
import { deleteCity, getCitiesAll, postNewCity } from '../../api/fetch';
import { City } from '../../types/City';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Cities: React.FC = ( ) => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState(false);
  const [cities, setCities] = useState<City[] | null>(null);
  const [loader, setLoader] = useState(false);

  const getCities = () => {
    getCitiesAll('cities')
      .then(cityList => setCities(cityList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => setLoader(false));
  };

  const addCity = () => {
    setInput(false);

    if (query) {
      const newCity = {
        id: 0,
        name: query,
      };

      postNewCity(newCity)
        .then(() => setTimeout(() => {
          getCities();
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

    deleteCity(id)
      .then(() => getCities())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const citiesSorted = cities?.sort((city1, city2) => {
    return city2.id - city1.id;
  });

  const citiesSearch = citiesSorted?.filter(
    city => city.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const test2 = ['TestInactive1', 'TestInactive2'];
  
  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <div className="menus-top">
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
        <>
          <div className="filters__active">
            <h2 className="filters__title">
              Активні
            </h2>

            {!cities && <Loader type='spin' color='#000' />}

            {loader && <Loader type='bubbles' color='#000' />}

            {citiesSearch && citiesSearch.length < 1 && (
              <NotFound title='Міст' text='filters'/>
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
                  id={city.id}
                  onDelete={handleCityDeletion}
                />
              ))}
            </ul>
          </div>

          <div className="filters__inactive">
            <h2 className="filters__title">
              Неактивні
            </h2>

            <ul className="filters__inactive-list">
              {test2.map(city => (
                <DynamicField
                  key={city}
                  value={city}
                  styling="filters__inactive-item"
                  stylingLink="../power_cfp.svg"
                />
              ))}
            </ul>
          </div>
        </>
      </div>
    </>
  );
};
