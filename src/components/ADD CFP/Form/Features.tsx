import React, { useState } from 'react';
import { CheckBox } from './CheckBox';

export const Features: React.FC = () => {
  const [istakeAway, setIstakeAway] = useState('false');
  const [isCoffeIn, setIsCoffeIn] = useState('false');
  const [sellsGrains, setSellsGrains] = useState('false');
  const [hasCoworking, setHasCoworking] = useState('false');
  const [hasGenerator, setHasGenerator] = useState('false');
  const [hasShelter, setHasShelter] = useState('false');
  const [petsFriendly, setPetsFriendly] = useState('false');

  return (
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
  );
};
