import map from 'lodash/map';
import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';

import FilterField from '../../app/formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

class SliderPanel extends Component {
  state = { activeTab: 0 };

	handleChange = value => this.setState({ activeTab: value});

  render() {
    const { CARDS, selectFieldClassName, TABS } = this.props;
		const { activeTab } = this.state;
    return (
      <div className="panel-container">
        <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}>
					<Tabs
					 onChange={this.handleChange}
					 value={activeTab}
					 tabItemContainerStyle={{ backgroundColor: 'transparent',  width: '400px', padding: '8px 0' }}
					 inkBarStyle={{ backgroundColor: '#03a9f3' }}
           style={{ margin: '0 5px' }}
					 >
						{ map(TABS, (tab, key) => (
								<Tab
									key={key}
									className={key === activeTab ? "selected-tab" : null}
									label={tab}
									style={{ color: '#8f979f', fontFamily: 'Poppins Medium, sans-serif'}}
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
              {map(CARDS, ({ CARDBODY, CUSTOMBUTTONS, FILTERFORM, FILTERFIELDLABEL, GRAPH, SELECTFIELDITEMS, TABLECONTENTS, TABLEHEADERS }, key) => {
                return (
                  <CardText
                   index={key}
                   key={key}
                   style={{ padding: "2px 16px" }}
                   >
                     { CARDBODY && <CARDBODY /> }
                     <div className="panel-body">
                       { SELECTFIELDITEMS && <SelectField className={selectFieldClassName} floatingLabelText="Sort By" MENUITEMS={SELECTFIELDITEMS} /> }
                       <div className="panel-6">
                        { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
                       </div>
                       { GRAPH && GRAPH }
                       { FILTERFORM && <FilterField className="panel-4" floatingLabelText={FILTERFIELDLABEL} form={FILTERFORM} /> }
                       { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> }
                     </div>
                 </CardText>
                )
              })}
          </SwipeableViews>
        </Card>
      </div>
    )
  }
}

export default SliderPanel;
