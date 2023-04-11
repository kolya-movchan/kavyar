import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCFPAPI, getCitiesAll, getFeaturesAll } from '../../api/fetch';
import { CFP } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty, Activity } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { SearchPannel } from '../SearchPannel';
import { SelectFilters } from './SelectFilters';

export const CoffeeShops: React.FC = () => {
  const [cfps, setCfps] = useState<CFP[]>();
  const [features, setFeatures]= useState<Feature[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cities, setCities]= useState<City[]>();
  const [showEditId, setShowEditId] = useState(0);
  const [loader, setLoader] = useState(false);

  const [searchInTitle, setSearchInTitle] = useState<string>('');
  const [count, setCount] = useState('8');
  // const [page, setPage]= useState(1);
  const [asc, setAsc] = useState('ASC');
  const [sort, setSort] = useState('title');
  const [feature, setFeature] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [isActive, setIsActive] = useState('true, false');

  const htmlElement = document.getElementById("html");
  
  const getAllCFP = (link: string) => {
    getAllCFPAPI(link)
      .then(cfpsList => {
        setCfps(cfpsList);
        getFeaturesActive();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        // setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const getFeaturesActive = () => {
    getFeaturesAll('features?usable=true')
      .then(featuresList => {
        setFeatures(featuresList);
        getActiveCities();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        // setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

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

  const sortByCount = [1, 2, 3, 4, 8];

  const sortByProperties = [
    SortByProperty.titleAsc,
    SortByProperty.openingAsc,
    SortByProperty.closingAsc,
    SortByProperty.titleDesc,
    SortByProperty.openingDesc,
    SortByProperty.closingDesc,
  ];

  const sortByActivity = [Activity.all, Activity.active, Activity.inactive];

  const handleSortByProperties = (value: string) => {
    switch (value) {
    case SortByProperty.openingAsc:
      setSort('open');
      setAsc('ASC');

      break;

    case SortByProperty.closingAsc:
      setSort('close');
      setAsc('ASC');

      break;

    case SortByProperty.titleDesc:
      setSort('title');
      setAsc('DESC');

      break;

    case SortByProperty.openingDesc:
      setSort('open');
      setAsc('DESC');

      break;

    case SortByProperty.closingDesc:
      setSort('close');
      setAsc('DESC');

      break;
  
    default:
      setSort('title');
      setAsc('ASC');

      break;
    }
  };

  const handleFeatureSort = (value: string) => {
    const featureTarget = features?.find(featureItem => featureItem.name === value);
    const featureId = featureTarget?.id || 0;

    setFeature(featureId);
  };

  const handleCitiesSort = (value: string) => {
    const cityTarget = cities?.find(cityItem => cityItem.name === value);
    const cityTargetId = cityTarget?.id || 0;

    setCityId(cityTargetId);
  };

  const handleActivitySort = (value: string) => {
    switch (value) {
    case Activity.active:
      setIsActive('true');

      break;

    case Activity.inactive:
      setIsActive('false');

      break;

    default:
      setIsActive('true, false');

      break;
    }
  };

  const applyAllFilters = (event: React.FormEvent) => {
    event.preventDefault();

    const url = 'coffee-shops?';
    const countP = count ? `count=${count}` : '';
    const pageP = `page=1`;
    const searchP = searchInTitle ? `searchInTitle=${searchInTitle}` : '';
    const sortP = `sortBy=${sort}:${asc}`;
    const featuresP = feature ? `filter=${feature}` : '';
    const cityP = cityId ? `city=${cityId}` : '';
    const activeP = isActive ? `isActive=${isActive}` : '';
  
    const paramsURL = `${url}${countP}&${pageP}&${searchP}&${sortP}&${featuresP}&${cityP}&${activeP}`;

    console.log(paramsURL);

    setLoader(true);
    getAllCFP(paramsURL);
  };

  const resetAllFilters = () => {
    setLoader(true);

    getAllCFP('coffee-shops?count=8');
    getFeaturesActive();
    getActiveCities();
  };


  useEffect(() => {
    htmlElement?.classList.add('hidden');
    setLoader(true);

    getAllCFP('coffee-shops?count=8');
    // getFeaturesActive();
    // getActiveCities();

    // Promise.all(
    //   [getAllCFP('coffee-shops?count=8'),
    //     getFeaturesActive(),
    //     getActiveCities()],
    // ).then(() => console.log('GoodTOGO')).then(() => setLoader(false));
  }, []);
  
  return (
    <div className="cfp">
      {loader && (
        <div className="loading">
          <Loader
            type='spin'
            color='#000'
          />
        </div>
      )}

      <form className="cfp__top-menu">
        <SearchPannel
          value={searchInTitle}
          onChange={setSearchInTitle}
          decoration="search-input--cfp"
        />

        <SelectFilters
          text='Показати'
          data={sortByCount}
          onSelect={setCount}
        />

        <SelectFilters
          text='Сортувати за'
          data={sortByProperties}
          onSelect={handleSortByProperties}
        />

        <SelectFilters
          text='Фільтрувати за'
          complexData={features}
          onSelect={handleFeatureSort}
        />

        <SelectFilters
          text='Місто'
          complexData={cities}
          onSelect={handleCitiesSort}
        />

        <SelectFilters
          text='Активність'
          data={sortByActivity}
          onSelect={handleActivitySort}
        />

        <button
          type='submit'
          className="button is-black"
          onClick={applyAllFilters}
        >
          Застосувати
        </button>
        
        <button
          type='reset'
          className="button is-black"
          onClick={resetAllFilters}
        >
          Скинути
        </button>
      </form>

      <div className="cfp__wrapper">
        <div className="cfp-card-container">
          <ul className="cfp-card__list">
            {cfps && cfps.map(cfpItem => {
              const {id, title, open, close, location, logo } = cfpItem;
              // const {hour: hourOpen, minute: minuteOpen } = open;
              // const {hour: hourClose, minute: minuteClose } = close;

              return (
                <li
                  className="cfp-card"
                  id={id.toString()}
                  key={id}
                  onMouseEnter={() => setShowEditId(id)}
                  onMouseLeave={() => setShowEditId(-1)}
                >
                  <div className="cfp-card__logo-container">
                    <img
                      src={logo.startsWith('http') ? logo : '../default-cfp.png'}
                      alt="coffeeshop logo"
                      className="cpf__card-logo"
                      style={{ borderRadius: '10px'}}
                    />
                  </div>

                  <div className="cfp-card__name">
                    {title}
                  </div>

                  {showEditId === id && (
                    <div hidden>
                      <Link to='/admin/form'>
                        <img
                          src="../edit.png"
                          alt="edit-coffeshop"
                          className='cfp-card__edit'
                        />
                      </Link>
                    </div>
                  )}

                  <div className="cfp-card__open">
                    {`Відкриття: ${open}`}
                  </div>

                  <div className="cfp-card__close">
                    {`Закриття: ${close}`}
                  </div>

                  <div className="cfp-card__location">
                    <a href={location} target="_blank">
                      <img
                        src="../location.png"
                        alt="location"
                        className="cfp-card__location-img"
                      />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* {!cfpFiltered.length && <NotFound title={title} />} */}

        {/* <div className="cfp__buttons">
          <button
            className="pagination-previous cfp__buttons-pagination"
            disabled
          >
            Назад
          </button>

          <button className="pagination-next cfp__buttons-pagination">
            Далі
          </button>
        </div> */}
      </div>
    </div>
  );
};
