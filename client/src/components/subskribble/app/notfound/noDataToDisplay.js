import React from 'react';
import { Card, Icon } from 'antd';
import PageContainer from '../panels/pageContainer';
import RenderPanelButtons from '../panels/renderPanelButtons';
import TogglePanelVisibility from '../panels/TogglePanelVisibility';
import CustomerSignupForm from '../../../../containers/subskribble/forms/CustomerSignupForm';

const forms = [CustomerSignupForm];
const formTitle = ["Customer Signup"];
const submitFormTitle = ["Subscribe"]

const noDataToDisplay = ({ buttonLabel, buttonPanel, formNum, visible }) => (
  <PageContainer>
    <div className="panel-container">
      <Card title="Subscribers" extra={buttonPanel()}>
        <div style={{ display: visible ? "block" : "none", minHeight: 400 }} className="panel-body-container">
          <div className="panel-body">
            <div className="ant-row">
              <RenderPanelButtons
                CUSTOMBUTTONS={[{ className: 'f-r', label: buttonLabel }]}
                FORM={forms[formNum]}
                FORMTITLE={formTitle[formNum]}
                SUBMITFORMTITLE={submitFormTitle[formNum]}
              />
              <div className="no-data">
                <Icon type="line-chart" />
                <h2>No data to display.</h2>
                <p>You may not have any entries or the search filter does not match any of our current records.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
)

export default TogglePanelVisibility(noDataToDisplay)
