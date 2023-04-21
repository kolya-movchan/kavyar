import React from 'react';

type Props = {
  onChoose: (value: string) => void,
};

export const PopUp: React.FC<Props> = ({ onChoose }) => {
  return (
    <div className="pop-up">
      <h2 className="pop-up__title">
      Оберіть місто, де плануєте шукати кав’ярню
      </h2>

      <ul className="pop-up__cities">
        <li className="pop-up__city">
          <button
            className="pop-up__button button"
            onClick={() => onChoose('Одеса')}
          >
            Одеса
          </button>
        </li>

        <li className="pop-up__city">
          <button
            className="pop-up__button button"
            onClick={() => onChoose('Київ')}
          >
            Київ
          </button>
        </li>

        <li className="pop-up__city">
          <button
            className="pop-up__button button"
            onClick={() => onChoose('Львів')}
          >
            Львів
          </button>
        </li>

        {/* <button className="button is-link is-hovered">Hover</button> */}

      </ul>
    </div>
  );
};
