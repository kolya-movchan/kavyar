import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCFPAPI, getAllCFPAPI, getCitiesAll, getFeaturesAll, restoreCFPAPI } from '../../api/fetch';
import { CFPlist } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty, Activity } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { scrollTop } from '../_tools/Tools';
import { CheckBoxCFP } from './CheckBoxCFP';
import { SelectFilters } from './SelectFilters';

export const convertGoogleDrive = (link: string) => {
  if (link.startsWith('https://drive')) {
    const startIndex = link.indexOf('/d/');
    const endIndex = link.indexOf('/view');

    return `https://drive.google.com/uc?export=view&id=${link.slice((startIndex + 3), endIndex)}`;
  }

  return link;
};

export const CoffeeShops: React.FC = () => {
  const [showEditId, setShowEditId] = useState(0);
  const [cfps, setCfps] = useState<CFPlist[]>();
  const [features, setFeatures]= useState<Feature[]>();
  const [cities, setCities]= useState<City[]>();
  const [loader, setLoader] = useState(false);

  const [searchInTitle, setSearchInTitle] = useState<string>('');
  const [count, setCount] = useState('');
  const [page, setPage]= useState(1);
  const [asc, setAsc] = useState('');
  const [sort, setSort] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [cityId, setCityId] = useState(0);
  const [isActive, setIsActive] = useState('');

  const [noMoreLeft, setNoMoreLeft] = useState<boolean | undefined>(false);

  const htmlElement = document.getElementById("html");

  const getAllCFP = (link: string) => {
    getAllCFPAPI(link)
      .then(cfpsList => {
        console.log(cfpsList.coffeeShops);
        
        const cfpWithRightLogos = cfpsList.coffeeShops.map(cfpItem => {
          const logoCFP = convertGoogleDrive(cfpItem.logo);

          return {
            ...cfpItem,
            logo: logoCFP,
          };
        });
        
        setCfps(cfpWithRightLogos);
        setNoMoreLeft(!cfpsList.hasNextPage);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
        // htmlElement?.classList.remove('hidden');
        getFeaturesActive();
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
        // getAllCFP('coffee-shops?count=4');
        // getAllCFP('coffee-shops?count=8');
        // deleteCFPAPI(6);
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
    const featuresP = featureList.length > 0 ? `filter=${featureList.join(',')}` : '';
    const cityP = cityId ? `city=${cityId}` : '';
    const activeP = isActive ? `isActive=${isActive}` : '';
  
    const paramsURL = `${url}${countP}&${searchP}&${sortP}&${featuresP}&${cityP}&${activeP}&${pageP}`;

    console.log(paramsURL);

    setLoader(true);
    getAllCFP(paramsURL);
  };

  const applyAllFilters = (event: React.FormEvent) => {
    event.preventDefault();
    scrollTop();

    updateURL();
  };

  const resetAllFilters = () => {
    setLoader(true);
    setSearchInTitle('');
    setCount('8');
    setPage(1);
    setAsc('ASC');
    setSort('');
    setFeatureList([]);
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
  };

  const goForward = async () => {
    const pageNumber = page + 1;
    const checkIfMore = `coffee-shops?page=${page + 1}`;

    console.log(checkIfMore);
    

    setPage(pageNumber);
    updateURL(pageNumber);
  };

  cfps?.sort((cfp1, cfp2) => {
    if (cfp1.isDisable) {
      return 1;
    }

    if (cfp2.isDisable) {
      return -1;
    }

    return 0;
  });

  const deactivateCFP = (id: number, status: boolean) => {
    const notificationDelete = "Підтвердіть Видалення";
    const notificationRestore = "Підтвердіть Реактивацію";

    switch (status) {
    case false: {
      if (confirm(notificationDelete) == true) {
        htmlElement?.classList.add('hidden');
        setLoader(true);
        scrollTop();

        deleteCFPAPI(id)
          .then(() => {
            getAllCFP('coffee-shops?count=8');
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
      if (confirm(notificationRestore) == true) {
        htmlElement?.classList.add('hidden');
        setLoader(true);
        scrollTop();
        
        restoreCFPAPI(id)
          .then(() => {
            getAllCFP('coffee-shops?count=8');
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

  const handleCheckboxes = (id: string, checked: boolean) => {
    if (checked) {
      setFeatureList([...featureList, id]);

      return;
    }

    setFeatureList(featureList.filter(featureId => featureId !== id));
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden');
    setLoader(true);

    getAllCFP('coffee-shops?count=8');
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
          {/* <SelectFilters
            text='Фільтрувати за'
            complexData={features}
            onSelect={handleFeatureSort}
          /> */}

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

          <fieldset className="cfp-features__container">
            <legend className="cfp-features__legend">
              Фільтрувати
            </legend>

            {features?.map(featureElement => {
              const {id, name} = featureElement;
              return (
                <CheckBoxCFP
                  key={id}
                  id={id}
                  name={name}
                  onCheck={handleCheckboxes}
                />
              );
            })}
          </fieldset>
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

      <div className={classNames(
        "cfp__wrapper ",
        {['cfp__wrapper--not-found']: cfps && !cfps?.length}
      )}>

        <div
          className={classNames(
            "cfp-card-container",
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
              const {id, isDisable, title, open, close, location, logo } = cfpItem;

              return (
                <li
                  className={classNames(
                    "cfp-card",
                    {'cfp-card--deactivated': isDisable}
                  )}
                  id={id.toString()}
                  key={id}
                  onMouseEnter={() => setShowEditId(id)}
                  onMouseLeave={() => setShowEditId(0)}
                >
                  <div className="cfp-card__logo-container">
                    <img
                      src={logo}
                      alt="coffeeshop logo"
                      className="cpf__card-logo"
                      style={{ borderRadius: '10px'}}
                    />
                  </div>

                  <div className="cfp-card__name">
                    {title}
                  </div>

                  {showEditId === id && (
                    <div>
                      <Link to='/admin/form'>
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
                          // onClick={() => deactivateCFP(id)}
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
