import map from 'lodash/map';
import React from 'react';

import {LEFTFEATURESTEXT, RIGHTFEATURESTEXT } from './featuresText';
import rbFeaturesPhone from '../../../../images/rb-features-phone.png';

const InformationFeatures = () => {
  const mapStaticText = (feature, position) => {
    return map(feature, ({ title, description}) => {
      return (
        <div key={title} className="item">
          <div className={`tooltip-${position}`}>&nbsp;</div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      );
    });
  }
  return (
    <div className="features-bg">
      <div className="features-bg-filter">
        <div className="features-container">
          <div className="features-grid-12">
            <div className="features-block">
              <div className="title-container">
                <h2 className="title">
                  Rocketbiller Features
                  <br />
                  <span className="subtitle">rocketbiller is the easiest way to create and manage subscriptions and plans.</span>
                </h2>
              </div>
              <div className="features-gantry-33">
                <div className="spacer">
                  { mapStaticText(LEFTFEATURESTEXT, 'right') }
                </div>
              </div>
              <div className="features-gantry-33">
                <img src={rbFeaturesPhone} alt="rb-features-phone.png"/>
              </div>
              <div className="features-gantry-33">
                <div className="spacer">
                  { mapStaticText(RIGHTFEATURESTEXT, 'left') }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationFeatures;
