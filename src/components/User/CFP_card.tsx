import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { CFPlist } from '../../types/CFP';

type Props = {
  cfpData: CFPlist,
  favoriteShops: number[],
  onAdd: (id: number) => void,
};

export const CFP_card: React.FC<Props> = ({ cfpData, favoriteShops, onAdd }) => {
  const {id, isDisable, title, open, close, logo } = cfpData;

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
              ? process.env.PUBLIC_URL + '/favorite-active.svg'
              : process.env.PUBLIC_URL + '/favorite-inactive.svg'}
          alt="favorites-icon"
          className={classNames(
            "cfp-card__fav-photo",
            {'clicked': favoriteShops.includes(id)}
          )}
          onClick={() => onAdd(id)}
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
    </li>
  );
};
