import map from 'lodash/map';
import React from 'react';

import Button from '../../app/buttons/customButton';

import SERVICESGRIDTEXT from './servicesGridText';

const InformationServices = () => {
  return (
    <div className="services-bg">
      <div className="services-container">
        {map(SERVICESGRIDTEXT, ({ title, description }) => {
            return (
              <div key={title} className="services-grid-4">
                <div className="services-block">
                  <h1>{title}</h1>
                  <p>{description}</p>
                  <div className="link">
                    {/* TODO Insert link for services */}
                    <Button
                      backgroundColor="#665c5a"
                      border="1px solid #aba4a2"
                      fontSize={14}
                      height={46}
                      label="Read More"
                      // link="/signup"
                      width={160}
                    />
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default InformationServices;
