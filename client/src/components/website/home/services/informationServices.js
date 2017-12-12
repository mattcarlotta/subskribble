import map from 'lodash/map';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SERVICESGRIDTEXT from './servicesGridText';

const InformationServices = () => {
  return (
    <div className="services-bg">
      <div className="services-container">
        {
          map(SERVICESGRIDTEXT, ({ title, description }) => {
            return (
              <div key={title} className="services-grid-4">
                <div className="services-block">
                  <h1>{title}</h1>
                  <p>{description}</p>
                  <div className="link">
                    {/* TODO Insert link for services */}
                    <RaisedButton
                      label="Read More"
                      backgroundColor={'#665c5a'}
                      buttonStyle={{ border: '1px solid #ABA4A2', borderRadius: 5 }}
                      labelStyle={{ color: '#eee', fontSize: 14, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
                      style={{ height: 45, width: 160, marginTop: 15, borderRadius: 6 }}
                    />
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
