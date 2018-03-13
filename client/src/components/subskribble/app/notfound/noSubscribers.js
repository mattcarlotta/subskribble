import React from 'react';
import { Card, Icon } from 'antd';
import PageContainer from '../panels/pageContainer';
import RenderPanelButtons from '../panels/renderPanelButtons';
import TogglePanelVisibility from '../panels/TogglePanelVisibility';
import CustomerSignupForm from '../../../../containers/subskribble/forms/CustomerSignupForm';

const NoSubscribers = ({ buttonPanel, visible }) => (
  <PageContainer>
    <div className="panel-container">
      <Card title="Subscribers" extra={buttonPanel()}>
        <div style={{ display: visible ? "block" : "none", minHeight: 400 }} className="panel-body-container">
          <div className="panel-body">
            <div className="ant-row">
              <RenderPanelButtons
                CUSTOMBUTTONS={[{ className: 'f-r', label: "Add Subscriber" }]}
                FORM={CustomerSignupForm}
                FORMTITLE="Customer Signup"
                SUBMITFORMTITLE="Subscribe"
              />
              <div className="no-data">
                <Icon type="line-chart" style={{ fontSize: 48 }} />
                <p>No data Available</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
)

export default TogglePanelVisibility(NoSubscribers)
