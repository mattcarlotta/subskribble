import React from 'react';

import rbAutomation from '../../../../images/rb-automation.png';

const InformationAutomation = () => {
  return (
    <div className="automation-bg">
      <div className="automation-container">
        <div className="automation-grid-12">
          <div className="automation-gantry-50">
            <div className="title-container">
              <div className="spacer">
                <h2 className="title">Subscription Automation</h2>
                <p className="description">
                  A powerful tool that sets up and manages a customer's intuitive and expandable features, as well as offers administration through our easy-to-use user interface.
                </p>
              </div>
            </div>
          </div>
          <div className="automation-gantry-50">
            <div className="spacer">
              <img src={rbAutomation} alt="rb-automation.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationAutomation;
