/* eslint-disable no-useless-escape */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { deleteCFPAPI, getAllCFPAPI, getCitiesAll, getFeaturesAll, restoreCFPAPI } from '../../api/fetch';
import { CFP, CFPlist } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { convertGoogleDrive, scrollTop } from '../_tools/Tools';
import { CheckBoxCFP } from './CheckBoxCFP';
import { SelectFilters } from './SelectFilters';


export const CoffeeShops: React.FC = () => {
  const [features, setFeatures]= useState<Feature[]>();
  const [cities, setCities]= useState<City[]>();
  const [cfps, setCfps] = useState<CFPlist[]>();
  const [showEditId, setShowEditId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [page, setPage]= useState(1);
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const [cityName, setCityName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});

  // const [asc, setAsc] = useState('ASC');
  // const [sort, setSort] = useState('isDisable');
  // const [cityId, setCityId] = useState(0);
  // const [isActive, setIsActive] = useState('');

  const baseLink = 'coffee-shops?';
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

  const deactivateCFP = (id: number, status: boolean) => {
    const notificationDelete = "Підтвердіть Деактивацію";
    const notificationRestore = "Підтвердіть Реактивацію";

    switch (status) {
    case false: {
      if (confirm(notificationDelete) === true) {
        htmlElement?.classList.add('hidden');
        activateLoading();

        deleteCFPAPI(id)
          .then(() => {
            cfps?.map(cfpEntry => {
              if (cfpEntry.id === id) {
                cfpEntry.isDisable = true;
              }
            });
          })
          .catch((e) => console.log(e))
          .finally(() => {
            setLoader(false);
            htmlElement?.classList.remove('hidden');
          });

      } else {
        return;
      }
    }
      break;

    case true: {
      if (confirm(notificationRestore) === true) {
        htmlElement?.classList.add('hidden');
        setLoader(true);
        
        restoreCFPAPI(id)
          .then(() => {
            cfps?.map(cfpEntry => {
              if (cfpEntry.id === id) {
                cfpEntry.isDisable = false;
              }
            });
          })
          .catch((e) => console.log(e))
          .finally(() => {
            setLoader(false);
            htmlElement?.classList.remove('hidden');
          });
      } else {
        return;
      }

      break;
    }

    default: break;
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
    
    const finalURL = link + additionalParams;

    console.log('finalURL', finalURL);


    const result = await Promise.all(getPromises(finalURL))
      .finally(() => {
        htmlElement?.classList.remove('hidden');
        scrollTop();
        setLoader(false);
      });

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

  return (
    <div className="cfp">
      {loader && (
        <Loader
          type='spin'
          color='#000'
        />
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
          {(cfps && !cfps?.length) && (
            <div className="not-found--cfp">
              <NotFound title={'Кавʼярень'} styling='--cfp' />
            </div>
          )}

          <ul className="cfp-card__list">
            {cfps && cfps.map(cfpItem => {
              const {id, isDisable, title, open, close, logo } = cfpItem;

              return (
                <li
                  className={classNames(
                    "cfp-card",
                    "cfp-card--admin",
                    {'cfp-card--deactivated': isDisable}
                  )}
                  id={id.toString()}
                  key={id}
                  onMouseEnter={() => setShowEditId(id)}
                  onMouseLeave={() => setShowEditId(0)}
                >
                  <div
                    className="cfp-card__logo-container"
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
                  </div>
                  <div className="cfp-card__name">
                    {title}
                  </div>

                  {showEditId === id && (
                    <div>
                      <Link
                        to={{
                          pathname: '/admin/form/edit',
                        }}
                        state = {cfps.find(cfpStore => cfpStore.id === id)?.id || 0}
                      >
                        <img
                          src="../edit.png"
                          alt="edit-coffeshop"
                          className='cfp-card__edit'
                        />
                      </Link>

                      <button
                        className="cfp-card__delete"
                        onClick={() => deactivateCFP(id, isDisable)}
                      >
                        <img
                          src="../power.svg"
                          alt="delete-coffeeshop"
                          className="cfp-card__delete-img"
                        />
                      </button>
                    </div>
                  )}

                  <div className="cfp-card__open">
                    {`Відкриття: ${open}`}
                  </div>

                  <div className="cfp-card__close">
                    {`Закриття: ${close}`}
                  </div>

                  {/* <div className="cfp-card__location">
                    <a href={location} target="_blank">
                      <img
                        src="../location.png"
                        alt="location"
                        className="cfp-card__location-img"
                      />
                    </a>
                  </div> */}
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
