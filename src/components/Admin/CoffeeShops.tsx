import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCFPAPI, getCitiesAll, getFeaturesAll } from '../../api/fetch';
import { CFP } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty, Activity } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { SelectFilters } from './SelectFilters';

export const CoffeeShops: React.FC = () => {
  const [cfps, setCfps] = useState<CFP[]>();
  const [features, setFeatures]= useState<Feature[]>();
  const [cities, setCities]= useState<City[]>();
  const [showEditId, setShowEditId] = useState(0);
  const [loader, setLoader] = useState(false);

  const [searchInTitle, setSearchInTitle] = useState<string>('');
  const [count, setCount] = useState('');
  const [page, setPage]= useState(1);
  const [asc, setAsc] = useState('');
  const [sort, setSort] = useState('');
  const [feature, setFeature] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [isActive, setIsActive] = useState('');
  // const [currentLink, setCurrentLink] = useState('coffee-shops?count=8');

  // const [noMoreLeft, setNoMoreLeft] = useState(false);

  const htmlElement = document.getElementById("html");

  const getAllCFP = (link: string) => {
    getAllCFPAPI(link)
      .then(cfpsList => {
        // (cfpsList.length > +count - 1) ? setAreMoreLeft(true) : setAreMoreLeft(false);
        // const newCFPs = cfpsList.length === +count ? cfpsList.slice(0, cfpsList.length - 1) : cfpsList;

        // setCfps(newCFPs);
        setCfps(cfpsList);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
      });
  };

  const getFeaturesActive = () => {
    getFeaturesAll('features?usable=true')
      .then(featuresList => {
        setFeatures(featuresList);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        // setLoader(false);
        getActiveCities();

        // htmlElement?.classList.remove('hidden');
      });
  };

  const getActiveCities = () => {
    getCitiesAll('cities?usable=true')
      .then(cityList => setCities(cityList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        getAllCFP('coffee-shops?count=8');
        // setLoader(false);
        // htmlElement?.classList.remove('hidden');
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
      setIsActive('true,false');

      break;
    }
  };

  const updateURL = (pageNumber: number | null = null) => {
    if (!pageNumber) {
      setPage(1);
    }

    const url = 'coffee-shops?';
    const countP = count ? `count=${count}` : '';
    const pageP = `page=${pageNumber ? pageNumber : 1}`;
    const searchP = searchInTitle ? `searchInTitle=${searchInTitle}` : '';
    const sortP = sort ? `sortBy=${sort}:${asc}` : '';
    const featuresP = feature ? `filter=${feature}` : '';
    const cityP = cityId ? `city=${cityId}` : '';
    const activeP = isActive ? `isActive=${isActive}` : '';
  
    const paramsURL = `${url}${countP}&${searchP}&${sortP}&${featuresP}&${cityP}&${activeP}&${pageP}`;

    console.log(paramsURL);

    // setCurrentLink(paramsURL);

    setLoader(true);
    getAllCFP(paramsURL);
  };

  const applyAllFilters = (event: React.FormEvent) => {
    event.preventDefault();

    updateURL();
  };

  const resetAllFilters = () => {
    setLoader(true);
    setSearchInTitle('');
    setCount('8');
    setPage(1);
    setAsc('ASC');
    setSort('');
    setFeature(0);
    setCityId(0);
    setIsActive('');

    getAllCFP('coffee-shops?');
    getFeaturesActive();
    getActiveCities();
  };

  const goBack = () => {
    const pageNumber = page - 1;
    
    setPage(pageNumber);
    updateURL(pageNumber);
    // setNoMoreLeft(false);
    
    // const checkIfMore = `coffee-shops?page=${page + 1}`;

    // getAllCFPAPI(checkIfMore)
    //   .then((coffeshop) => {
    //     if (coffeshop.length) {
    //       console.log(coffeshop);
    //       console.log('HASMORE');

    //       setNoMoreLeft(false);
          
    //       return;
    //     } else {
    //       console.log('NO-MORE');
    //       setNoMoreLeft(true);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const goForward = async () => {
    const pageNumber = page + 1;
    const checkIfMore = `coffee-shops?page=${page + 1}`;

    console.log(checkIfMore);
    

    setPage(pageNumber);
    updateURL(pageNumber);

    // getAllCFPAPI(checkIfMore)
    //   .then((coffeshop) => {
    //     if (coffeshop.length) {
    //       console.log(coffeshop);
    //       console.log('HASMORE');

    //       setNoMoreLeft(false);
          
    //       return;
    //     } else {
    //       console.log('NO-MORE');
    //       setNoMoreLeft(true);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');
    setLoader(true);

    getFeaturesActive();
    // getAllCFP('coffee-shops?count=8');
    // getActiveCities();
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
        <div className="cfp__filters">
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

          {/* {features?.map(featureElement => (
            <CheckBox
              key={featureElement.id}
              name={featureElement.name}
              value={featureElement.name}
            />
          ))} */}
        </div>

        <div className="cfp__Applybuttons">
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
        </div>
      </form>

      <div className="cfp__wrapper">
        <div className="cfp-card-container">
          <ul className="cfp-card__list">
            
            {(cfps && !cfps?.length) && (
              <div className="not-found--cfp">
                <NotFound title={'Кавʼярень'} />

                <button
                  className="pagination-previous cfp__buttons-pagination"
                  onClick={() => goBack()}
                >
                  Повернутися
                </button>
              </div>
            )}

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

        {cfps && (cfps?.length) > 0 && (
          <div className="cfp__buttons">
            <button
              className="pagination-previous cfp__buttons-pagination"
              onClick={() => goBack()}
              disabled={page <= 1}
            >
              Назад
            </button>

            <button
              className="pagination-next cfp__buttons-pagination"
              // disabled={noMoreLeft}
              onClick={() => goForward()}
            >
              Далі
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
