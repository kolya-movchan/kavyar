import React, { useEffect, useState } from 'react';
import { getFeaturesAll } from '../../../api/fetch';
import { Feature } from '../../../types/Feature';
import { CheckBox } from './CheckBox';

type Props = {
  cfpname: string
  onCheck: (value: number) => void,
  featuresOnEdit: number[],
  // onFeatureGet: (value: Feature[]) => void,
};

export const Features: React.FC<Props> = ({ cfpname, onCheck, featuresOnEdit }) => {
  const [features, setFeatures] = useState<Feature[] | null>(null);

  const getAllFeatures = () => {
    getFeaturesAll('features')
      .then(featuresList => {
        setFeatures(featuresList);
        // onFeatureGet(featuresList);
      })
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
        {cfpname.length > 0 && (
          <span className="highlight-container">
            <span className="highlight">{cfpname}
            </span>
          </span>
        )}
      </h2>

      <div className="cfp-features__wrapper">
        {features?.map(feature => (
          <CheckBox
            key={feature.id}
            name={feature.name}
            value={feature.id.toString()}
            id={feature.id}
            onCheck={onCheck}
            featuresOnEdit={featuresOnEdit}
          />
        ))}

      </div>
    </fieldset>
  );
};
