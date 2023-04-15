import React, { useEffect, useState } from 'react';
import { getFeaturesAll } from '../../../api/fetch';
import { Feature } from '../../../types/Feature';
import { CheckBox } from './CheckBox';

type Props = {
  cfpname: string
  onCheck: (value: number) => void,
};

export const Features: React.FC<Props> = ({ cfpname, onCheck }) => {
  const [features, setFeatures] = useState<Feature[] | null>(null);

  const getAllFeatures = () => {
    getFeaturesAll('features')
      .then(featuresList => setFeatures(featuresList))
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllFeatures();
  }, []);


  return (
    <fieldset className="cfp-features">
      <h2 className="cfp-features__title">
        {'Особливості кав’ярні '}
        {cfpname.length > 0 && cfpname}
      </h2>

      <div className="cfp-features__wrapper">
        {features?.map(feature => (
          <CheckBox
            key={feature.id}
            name={feature.name}
            value={feature.id.toString()}
            id={feature.id}
            onCheck={onCheck}
          />
        ))}

      </div>
    </fieldset>
  );
};
