import map from 'lodash/map';
import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';

import FilterField from '../../app/formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';


import { CUSTOMERBUTTONS, PLANBUTTONS } from '../../dashboard/fields/dashboardFieldsData';
import { customerData, customerOptions } from '../../dashboard/fields/customerChartFields';
import { planData, planOptions } from '../../dashboard/fields/planChartFields';
import OverviewLayout from '../../dashboard/layouts/overviewLayout';
import LineChart from '../../app/charts/lineChart';

const TABS=['Customers', 'Plans'];

class SliderPanel extends Component {
  state = { activeTab: 0 };

	handleChange = (value) => this.setState({ activeTab: value});

  render() {
    // const {
    //   containerClassName,
    //   initiallyExpanded,
    //   CUSTOMBUTTONS,
    //   selectFieldClassName,
    //   SELECTFIELDITEMS,
    //   FORM,
    //   CARDBODY,
    //   GRAPH,
    //   filterFieldLabel,
    //   FILTERFORM,
    //   TABLECONTENTS,
    //   TABLEHEADERS
    // } = this.props;
		const { activeTab } = this.state;
    return (
      <div className="dash-customers-panel">
        <div className="panel-container">
          <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}>
						<Tabs
						 onChange={this.handleChange}
						 value={activeTab}
						 tabItemContainerStyle={{ backgroundColor: 'transparent',  width: '300px' }}
						 inkBarStyle={{ backgroundColor: '#03a9f3' }}
						 >
							{ map(TABS, (tab, key) => (
									<Tab
										key={key}
										className={key === activeTab ? "selected-tab" : null}
										label={tab}
										style={{ color: '#8f979f', fontFamily: 'Poppins Medium, sans-serif' }}
										value={key}
									/>
								))
							}
						</Tabs>
						<Divider />
	          <SwipeableViews
							index={activeTab}
	      			onChangeIndex={this.handleChange}
							>
	              <CardText
	                index={0}
	                expandable={false}
	                style={{ padding: "2px 16px" }}
	                >
	                  <div className="panel-body">
	                    <SelectField className="panel-6" floatingLabelText="Sort By" MENUITEMS={['Current Month', 'Monthly', 'Yearly']} />
	                    <div className="panel-6">
	                      <RenderPanelButtons CUSTOMBUTTONS={CUSTOMERBUTTONS}/>
	                    </div>
                      <LineChart data={customerData} options={customerOptions} />
	                  </div>
	              </CardText>
	              <CardText
	                index={1}
	                expandable={false}
	                style={{ padding: "2px 16px" }}
	                >
	                  <div className="panel-body">
	                    <SelectField className="panel-6" floatingLabelText="Sort By" MENUITEMS={['Carlotta Prime']} />
	                    <div className="panel-6">
	                      <RenderPanelButtons CUSTOMBUTTONS={PLANBUTTONS}/>
	                    </div>
                      <LineChart data={planData} options={planOptions} />
	                  </div>
	              </CardText>
            </SwipeableViews>
          </Card>
        </div>
      </div>
    )
  }
}

export default SliderPanel;
