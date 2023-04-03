import React, { useState } from 'react';
import { CheckBox } from './CheckBox';

type Props = {
  cfpname: string
};

export const Features: React.FC<Props> = ({ cfpname }) => {
  const [istakeAway, setIstakeAway] = useState('false');
  const [isCoffeIn, setIsCoffeIn] = useState('false');
  const [sellsGrains, setSellsGrains] = useState('false');
  const [hasCoworking, setHasCoworking] = useState('false');
  const [hasGenerator, setHasGenerator] = useState('false');
  const [hasShelter, setHasShelter] = useState('false');
  const [petsFriendly, setPetsFriendly] = useState('false');

  return (

    <fieldset className="cfp-features">
      <h2 className="cfp-features__title">
        {'Особливості кав’ярні '}
        {cfpname.length > 0 && cfpname}
      </h2>

      <div className="cfp-features__wrapper">
        <CheckBox
          name="takeAway"
          label="Кава на виніс"
          value={istakeAway}
          onChange={setIstakeAway}
        />

        <CheckBox
          name="isCoffeIn"
          label="Кава всередині"
          value={isCoffeIn}
          onChange={setIsCoffeIn}
        />

        <CheckBox
          name="sellsGrains"
          label="Продає зерна"
          value={sellsGrains}
          onChange={setSellsGrains}
        />

        <CheckBox
          name="hasCoworking"
          label="Місце для коворкінгу"
          value={hasCoworking}
          onChange={setHasCoworking}
        />

        <CheckBox
          name="hasGenerator"
          label="Має генератор"
          value={hasGenerator}
          onChange={setHasGenerator}
        />

        <CheckBox
          name="hasShelter"
          label="Має укриття"
          value={hasShelter}
          onChange={setHasShelter}
        />

        <CheckBox
          name="petsFriendly"
          label="Можна з тваринами"
          value={petsFriendly}
          onChange={setPetsFriendly}
        />
      </div>
    </fieldset>
  );
};
