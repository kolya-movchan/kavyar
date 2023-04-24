import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getAllCFPAPI, getCitiesAll, getFeaturesAll } from '../../api/fetch';
import { CFP, CFPlist } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { convertGoogleDrive, scrollTop } from '../_tools/Tools';
import { CheckBoxCFP } from '../Admin/CheckBoxCFP';
import { SelectFilters } from '../Admin/SelectFilters';
import { Link, useSearchParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { PopUp } from './PopUp';

export const HomePageUser = () => {
  const [features, setFeatures]= useState<Feature[]>();
  const [cities, setCities]= useState<City[]>();
  const [cfps, setCfps] = useState<CFPlist[]>();
  const [loader, setLoader] = useState(false);
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [page, setPage]= useState(1);
  const [filter, setFilter] = useState('');
  const [cityName, setCityName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [favoriteShops, setFavoriteShops] = useState<number[]>([]);

  const baseLink = 'coffee-shops?isActive=true&';
  const cookies = new Cookies();
  const count = searchParams.get('count') || '';
  const query = searchParams.get('searchInTitle') || '';
  const [noMoreLeft, setNoMoreLeft] = useState<boolean | undefined>(false);
  const htmlElement = document.getElementById("html");
  const sortByCount = [1, 2, 3, 4, 8];

  const sortByProperties = [
    SortByProperty.titleAsc,
    SortByProperty.openingAsc,
    SortByProperty.closingAsc,
    SortByProperty.titleDesc,
    SortByProperty.openingDesc,
    SortByProperty.closingDesc,
  ];

  const handleSortByProperties = (value: string) => {
    switch (value) {
    case SortByProperty.titleAsc:
      setRightParams('title:ASC', 'sortBy');
      setFilter(SortByProperty.titleAsc);
      break;

    case SortByProperty.openingAsc:
      setRightParams('open:ASC', 'sortBy');
      setFilter(SortByProperty.openingAsc);
      break;

    case SortByProperty.closingAsc:
      setFilter(SortByProperty.closingAsc);
      setRightParams('close:ASC', 'sortBy');
      break;

    case SortByProperty.titleDesc:
      setFilter(SortByProperty.titleDesc);
      setRightParams('title:DESC', 'sortBy');
      break;

    case SortByProperty.openingDesc:
      setFilter(SortByProperty.openingDesc);
      setRightParams('open:DESC', 'sortBy');
      break;

    case SortByProperty.closingDesc:
      setFilter(SortByProperty.closingDesc);
      setRightParams('close:DESC', 'sortBy');
      break;
  
    default: setRightParams('', 'sortBy');
      break;
    }
  };

  const handleCitiesSort = (value: string) => {
    const cityTarget = cities?.find(cityItem => cityItem.name === value);
    const cityTargetId = cityTarget?.id.toString() || '';

    setCityName(value);
    setRightParams(cityTargetId, 'city');
  };

  const applyAllFilters = (event: React.FormEvent) => {
    event.preventDefault();
    activateLoading();
    getAllData(baseLink);
  };

  const resetAllFilters = () => {
    activateLoading();
    setSearchParams({});
    setCityName('');
    setFilter('');
    setFeatureList([]);
    setPage(1);
    getAllData(baseLink, true);
  };

  const goBack = () => {
    activateLoading();

    const currentPage = searchParams.get('page') || 2;
    const pageConverted = (+currentPage - 1).toString();


    setRightParams(pageConverted, 'page');
    getAllData(baseLink);
  };

  const goForward = async () => {
    activateLoading();

    const currentPage = searchParams.get('page') || 1;
    const pageConverted = (+currentPage + 1).toString();

    setRightParams(pageConverted, 'page');
    getAllData(baseLink);
  };

  const handleCheckboxes = (id: string) => {
    if (featureList.includes(id)) {
      const filtered = featureList.filter(featureId => featureId !== id);
      searchParams.set('filter', filtered.join(','));
      setFeatureList(featureList.filter(featureId => featureId !== id));

      if (!filtered.length) {
        searchParams.delete('filter');
      }

      setSearchParams(searchParams);
      return;
    }

    setFeatureList([...featureList, id]);

    if (!searchParams.get('filter')) {
      searchParams.set('filter', id);
      setSearchParams(searchParams);
    } else {
      searchParams.set('filter', ([...featureList, id].join(',')));
      setSearchParams(searchParams);
    }
  };

  const getPromises: (link: string) => [Promise<CFP>, Promise<Feature[]>, Promise<City[]>] = (link: string) => {
    return [
      getAllCFPAPI(link),
      getFeaturesAll('features?usable=true'),
      getCitiesAll('cities?usable=true')
    ];
  };

  const getAllData = async (link: string, reset = false) => {
    const searchParamsData = searchParams.toString();
    const additionalParams = searchParamsData && !reset ? `${searchParamsData}` : '';
    const savedShops = cookies.get("favoriteShops");

    let finalURL = link + additionalParams;

    if (location.pathname.includes('favorites')) {
      finalURL += `&ids=${savedShops ? savedShops.join(',') : '0'}`;
    }

    console.log('finalURL', finalURL);


    const result = await Promise.all(getPromises(finalURL))
      .finally(() => {
        htmlElement?.classList.remove('hidden');
        scrollTop();
        setLoader(false);
      });

    checkFirstLogin();

    const [cfpsAPI, featuresAPI, citiesAPI] = result;

    const cfpWithRightLogos = cfpsAPI.coffeeShops.map((cfpItem) => {
      const logoCFP = convertGoogleDrive(cfpItem.logo);

      return {
        ...cfpItem,
        logo: logoCFP,
      };
    });

    setCfps(cfpWithRightLogos);
    setNoMoreLeft(!cfpsAPI.hasNextPage);
    setFeatures(featuresAPI);
    setCities(citiesAPI);
  };

  const activateLoading = () => {
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  useEffect(() => {
    activateLoading();
    getAllData(baseLink);
  }, []);

  useEffect(() => {
    const currentSort = searchParams.get('sortBy');
    const currentCityId = searchParams.get('city');
    const currentPage = searchParams.get('page');

    if (currentPage) {
      setPage(+currentPage);
    }


    if (currentCityId) {
      const activeCity = cities?.find(cityValue => cityValue.id === +currentCityId);

      setCityName(activeCity?.name || '');
    }
    

    switch (currentSort) {
    case 'title:ASC':
      setFilter(SortByProperty.titleAsc);
      break;

    case 'open:ASC':
      setFilter(SortByProperty.openingAsc);
      break;

    case 'close:ASC':
      setFilter(SortByProperty.closingAsc);
      break;

    case 'title:DESC':
      setFilter(SortByProperty.titleDesc);
      break;

    case 'open:DESC':
      setFilter(SortByProperty.openingDesc);
      break;

    case 'close:DESC':
      setFilter(SortByProperty.closingDesc);
      break;
  
    default: break;
    }

  }, [searchParams]);
  
  const handleCountSelect = (value: string) => {
    setRightParams(value, 'count');
  };

  const handleQuery = (value: string) => {
    setRightParams(value, 'searchInTitle');
  };

  const setRightParams = (value: string, param: string) => {
    if (!value) {
      searchParams.delete(param);
    } else {
      searchParams.set(param, value);
    }
    setSearchParams(searchParams);
  };

  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();

    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query) {
      e.preventDefault();
      activateLoading();
      getAllData(baseLink);
    }

    if (e.key === 'Enter' && !query) {
      e.preventDefault();
    }
  };

  const handleAddFavorite = (id: number) => {
    if (favoriteShops.includes(id)) {
      const newShops = favoriteShops.filter((shop) => shop !== id);
      setFavoriteShops(newShops);
      cookies.set("favoriteShops", newShops, { path: "/" });

      return;
    }

    const newShops = [...favoriteShops, id];
    setFavoriteShops(newShops);
    cookies.set("favoriteShops", newShops, { path: "/" });
  };

  useEffect(() => {
    const savedShops = cookies.get("favoriteShops");
    if (savedShops) {
      setFavoriteShops(savedShops);
    }
  }, []);

  const checkFirstLogin = () => {
    const cfpContainer = document.querySelector('.cfp');

    if (!localStorage.getItem('city')) {
      cfpContainer?.classList.add('disabled');
      htmlElement?.classList.add('hidden');
      setIsLoaded(true);

      return true;
    }

    return false;
  };

  const handleCityPopUp = (city: string) => {
    const cityTarget = cities?.find(cityValue => cityValue.name === city);
    const cfpContainer = document.querySelector('.cfp');

    if (cityTarget) {
      localStorage.setItem('city', cityTarget?.id.toString());
      searchParams.set('city', cityTarget?.id.toString());
      setSearchParams(searchParams);
      activateLoading();
      getAllData(baseLink);
    } else {
      localStorage.setItem('city', 'none');
    }

    htmlElement?.classList.remove('hidden');
    cfpContainer?.classList.remove('disabled');
    setIsLoaded(false);
  };

  return (
    <div className="cfp">
      {isLoaded && <PopUp onChoose={handleCityPopUp} />}

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
            value={query}
            onChange={(value) => handleQuery(value)}
            decoration="search-input--cfp"
            onKeyDown={handleKeyDown}
          />
          <SelectFilters
            text='Показати'
            data={sortByCount}
            onSelect={(value) => handleCountSelect(value)}
            paramsValue={count}
          />
          <SelectFilters
            text='Сортувати за'
            data={sortByProperties}
            onSelect={handleSortByProperties}
            paramsValue={filter}
          />

          <SelectFilters
            text='Місто'
            complexData={cities}
            onSelect={handleCitiesSort}
            paramsValue={cityName}
          />

          <div className="select">
            <button
              onClick={toggleDropdown}
              className="button cfp__select"
              style={{ display: 'block', padding: '7px 40px 7px 11px'}}
            >
                Показати фільтри
            </button>
          </div>

          {isOpen && (
            <div className={classNames(
              "cfp-features__container",
              {'cfp-features__container--open': isOpen}
            )}>
              {features && (
                <fieldset>
                  {features?.map(featureElement => {
                    const {id, name} = featureElement;
                    return (
                      <CheckBoxCFP
                        key={id}
                        id={id}
                        name={name}
                        onCheck={handleCheckboxes}
                        styling={'cfp-features__wrapper--cfp'}
                        activeFeatures={featureList}
                      />
                    );
                  })}
                </fieldset>
              )}
            </div>
          )}
        </div>

        <div className="cfp__Applybuttons">
          <button
            type='submit'
            className="button is-black hoveredButton"
            onClick={applyAllFilters}
            disabled={!searchParams.toString()}
          >
            Застосувати
          </button>
          
          <button
            type='reset'
            className="button is-black hoveredButton"
            onClick={resetAllFilters}
            disabled={!searchParams.toString()}
          >
            Скинути
          </button>
        </div>
      </form>

      <div className={classNames(
        "cfp__wrapper ",
        {['cfp__wrapper--not-found']: cfps && !cfps?.length}
      )}>

        <div
          className={classNames(
            "cfp-card-container",
            "cfp-card-container--user",
            {['cfp-card-container--not-found']: cfps && !cfps?.length}
          )}
        >
          {(cfps && !cfps.length) && (
            <div className="not-found--cfp">
              <NotFound title={'Кавʼярень'} styling='--cfp' />
            </div>
          )}

          <ul className="cfp-card__list">
            {cfps && cfps.map(cfpItem => {
              const {id, isDisable, title, open, close, logo } = cfpItem;

              // if (favorites && !favorites.includes(id)) {
              //   return;
              // }

              return (
                <li
                  className={classNames(
                    "cfp-card",
                    {'cfp-card--deactivated': isDisable}
                  )}
                  id={id.toString()}
                  key={id}
                >

                  <div className="cfp-card__favorite">
                    <img
                      src={
                        favoriteShops.includes(id)
                          ? '../favorite-active.svg'
                          : '../favorite-inactive.svg'}
                      alt="favorites-icon"
                      className={classNames(
                        "cfp-card__fav-photo",
                        {'clicked': favoriteShops.includes(id)}
                      )}
                      onClick={() => handleAddFavorite(id)}
                    />
                  </div>

                  <Link
                    to={`/coffeeshops/${title}`}
                    className="cfp-card__logo-container"
                    state={id}
                  >
                    <img
                      src={logo}
                      alt="coffeeshop logo"
                      className="cpf-card__logo"
                      style={{
                        borderRadius: '10px',
                        height: '150px',
                        objectPosition: 'center',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>

                  <Link
                    to={`/coffeeshops/${title}`}
                    state={id}
                    className="cfp-card__name hoveredButton"
                  >
                    <span className="cfp-card__text">
                      {title}
                    </span>
                  </Link>

                  <div className="cfp-card__open">
                    {`Відкриття: ${open.toString().slice(0, 5)}`}
                  </div>

                  <div className="cfp-card__close">
                    {`Закриття: ${close.toString().slice(0, 5)}`}
                  </div>

                  {/* <div className="cfp-card__location">
                    <div className="cfp-card__location">
                      <a href={location} target="_blank">
                        <img
                          src="../location.png"
                          alt="location"
                          className="cfp-card__location-img"
                        />
                      </a>
                    </div>
                  </div> */}
                </li>
              );
            })}
          </ul>
        </div>

        {(cfps && cfps?.length > 0) && (
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
              onClick={() => goForward()}
              disabled={noMoreLeft}
            >
              Далі
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

