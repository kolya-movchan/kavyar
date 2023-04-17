import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCFPAPI, getAllCFPAPI, getCitiesAll, getFeaturesAll, restoreCFPAPI } from '../../api/fetch';
import { CFP, CFPlist } from '../../types/CFP';
import { City } from '../../types/City';
import { SortByProperty } from '../../types/enums/SortByProperty';
import { Feature } from '../../types/Feature';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { scrollTop } from '../_tools/Tools';
import { CheckBoxCFP } from './CheckBoxCFP';
import { SelectFilters } from './SelectFilters';

export const convertGoogleDrive = (link: string) => {
  if (link.startsWith('https://drive') && link.includes('/d/')) {
    const startIndex = link.indexOf('/d/');
    const endIndex = link.indexOf('/view');

    return `https://drive.google.com/uc?export=view&id=${link.slice((startIndex + 3), endIndex)}`;
  }

  return link;
};

// type Props = {
//   onEdit: (data: CFPlist) => void,
// };

export const CoffeeShops: React.FC = () => {
// export const CoffeeShops: React.FC<Props> = ({onEdit}) => {
  const [features, setFeatures]= useState<Feature[]>();
  const [cities, setCities]= useState<City[]>();
  const [cfps, setCfps] = useState<CFPlist[]>();
  
  const [showEditId, setShowEditId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [searchInTitle, setSearchInTitle] = useState<string>('');
  const [count, setCount] = useState('8');
  const [page, setPage]= useState(1);
  const [asc, setAsc] = useState('ASC');
  const [sort, setSort] = useState('isDisable');
  const [featureList, setFeatureList] = useState<string[]>([]);
  const [cityId, setCityId] = useState(0);
  const [isActive, setIsActive] = useState('');

  const [noMoreLeft, setNoMoreLeft] = useState<boolean | undefined>(false);

  const htmlElement = document.getElementById("html");

  const sortByCount = [1, 2, 3, 4, 8];

  const sortByProperties = [
    SortByProperty.activeAsc,
    SortByProperty.titleAsc,
    SortByProperty.openingAsc,
    SortByProperty.closingAsc,
    SortByProperty.activeDesc,
    SortByProperty.titleDesc,
    SortByProperty.openingDesc,
    SortByProperty.closingDesc,
  ];

  const handleSortByProperties = (value: string) => {
    switch (value) {
    case SortByProperty.activeAsc:
      setSort('isDisable');
      setAsc('ASC');

      break;

    case SortByProperty.activeDesc:
      setSort('isDisable');
      setAsc('DESC');

      break;

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

  const updateURL = (pageNumber: number | null = null) => {
    if (!pageNumber) {
      setPage(1);
    }

    const url = 'coffee-shops?';
    const countP = count ? `count=${count}` : '';
    const pageP = `page=${pageNumber ? pageNumber : 1}`;
    const searchP = searchInTitle ? `searchInTitle=${searchInTitle}` : '';
    const sortP = sort ? `sortBy=${sort}:${asc}` : 'sortBy=isDisable:ASC';
    const featuresP = featureList.length > 0 ? `filter=${featureList.join(',')}` : '';
    const cityP = cityId ? `city=${cityId}` : '';
    const activeP = isActive ? `isActive=${isActive}` : '';
  
    const paramsURL = `${url}${countP}&${searchP}&${sortP}&${featuresP}&${cityP}&${activeP}&${pageP}`;

    console.log(paramsURL);

    activateLoading();
    getAllData(paramsURL);
  };

  const applyAllFilters = (event: React.FormEvent) => {
    event.preventDefault();
    activateLoading();

    updateURL();
  };

  const resetAllFilters = () => {
    activateLoading();

    setLoader(true);
    setSearchInTitle('');
    setCount('8');
    setPage(1);
    setAsc('ASC');
    setSort('');
    setFeatureList([]);
    setCityId(0);
    setIsActive('');
    getAllData('coffee-shops?count=8&sortBy=isDisable:ASC');
  };

  const goBack = () => {
    activateLoading();
    scrollTop();

    const pageNumber = page - 1;
    
    setPage(pageNumber);
    updateURL(pageNumber);
  };

  const goForward = async () => {
    activateLoading();
    scrollTop();

    const pageNumber = page + 1;

    setPage(pageNumber);
    updateURL(pageNumber);
  };

  const deactivateCFP = (id: number, status: boolean) => {
    const notificationDelete = "Підтвердіть Видалення";
    const notificationRestore = "Підтвердіть Реактивацію";

    switch (status) {
    case false: {
      if (confirm(notificationDelete) == true) {
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
      if (confirm(notificationRestore) == true) {
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

  const handleCheckboxes = (id: string, checked: boolean) => {
    if (checked) {
      setFeatureList([...featureList, id]);

      return;
    }

    setFeatureList(featureList.filter(featureId => featureId !== id));
  };

  const getPromises: (link: string) => [Promise<CFP>, Promise<Feature[]>, Promise<City[]>] = (link: string) => {
    return [
      getAllCFPAPI(link),
      getFeaturesAll('features?usable=true'),
      getCitiesAll('cities?usable=true')
    ];
  };

  const getAllData = async (link: string) => {
    const result = await Promise.all(getPromises(link))
      .finally(() => {
        setLoader(false);
        htmlElement?.classList.remove('hidden');
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
    getAllData('coffee-shops?count=8&sortBy=isDisable:ASC');
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
            text='Місто'
            complexData={cities}
            onSelect={handleCitiesSort}
          />

          {features && (
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
                    styling={'cfp-features__wrapper--cfp'}
                  />
                );
              })}
            </fieldset>
          )}
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
                  <div
                    className="cfp-card__logo-container"
                  >
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
