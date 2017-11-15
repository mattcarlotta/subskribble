import { map } from 'lodash';
import React from 'react';

import {LEFTFEATURESTEXT, RIGHTFEATURESTEXT } from './featuresText';
import rbFeaturesPhone from '../../../images/rb-features-phone.png';

const InformationFeatures = () => {
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
                  {
                    map(LEFTFEATURESTEXT, ({ title, description}) => {
                      return (
                        <div key={title} className="item">
                          <h4>{title}</h4>
                          <p>{description}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="features-gantry-33">
                <div className="spacer">
                  <img src={rbFeaturesPhone} alt="rb-features-phone.png"/>
                </div>
              </div>
              <div className="features-gantry-33">
                <div className="spacer">
                  {
                    map(RIGHTFEATURESTEXT, ({ title, description}) => {
                      return (
                        <div key={title} className="item">
                          <h4>{title}</h4>
                          <p>{description}</p>
                        </div>
                      )
                    })
                  }
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
