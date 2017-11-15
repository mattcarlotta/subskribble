import { map } from 'lodash';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SERVICESGRIDTEXT from './servicesGridText';

const InformationServices = () => {
  return (
    <div className="information-services-container">
      <div className="info-grid-container">
        {
          map(SERVICESGRIDTEXT, ({ title, description }) => {
            return (
              <div key={title} className="info-grid-4">
                <div className="info-block">
                  <h1>{title}</h1>
                  <p>{description}</p>
                  <div className="link">
                    {/* TODO Insert link for services */}
                    <RaisedButton label="Read More" className="btn services-btn" />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default InformationServices;
