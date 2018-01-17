import map from 'lodash/map';
import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Maximize from 'material-ui/svg-icons/content/add';
import Minimize from 'material-ui/svg-icons/content/remove';

// import FilterField from '../../app/formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../../app/formFields/selectField';
// import TableList from '../../app/tables/TableList';

class SliderPanel extends Component {
  state = { activeTab: 0, showSwipeView: '' };

	handleChange = (value) => this.setState({ activeTab: value});

  handleSwipeView = () => this.setState({ showSwipeView: this.state.showSwipeView === '' ? 'none' : '' })

  render() {
    const { CARDS, selectFieldClassName, TABS } = this.props;
		const { activeTab, showSwipeView } = this.state;
    return (
      <div className="dash-customers-panel">
        <div className="panel-container">
          <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}>
						<Tabs
						 onChange={this.handleChange}
						 value={activeTab}
						 tabItemContainerStyle={{ backgroundColor: 'transparent',  width: '225px', padding: '8px 0' }}
						 inkBarStyle={{ backgroundColor: '#03a9f3' }}
             style={{ margin: '0 5px', display: 'inline-block', width: '95%' }}
						 >
							{ map(TABS, (tab, key) => (
									<Tab
										key={key}
										className={key === activeTab ? "selected-tab" : null}
										label={tab}
										style={{ color: '#8f979f', fontFamily: 'Poppins Medium, sans-serif', marginRight: 32, marginLeft: 15 }}
										value={key}
									/>
								))
							}
						</Tabs>
            <div style={{ display: 'inline-block', width: '48px', height: '48px', top: 245, right: 4, position: 'absolute' }}>
              <IconButton onClick={this.handleSwipeView}>
                { showSwipeView === '' ? <Minimize color={'#8f979f'} /> : <Maximize color={'#8f979f'} /> }
              </IconButton>
            </div>
						<Divider style={{ display: showSwipeView }} />
	          <SwipeableViews
							index={activeTab}
	      			onChangeIndex={this.handleChange}
              style={{ display: showSwipeView }}
							>
                {map(CARDS, ({ CUSTOMBUTTONS, GRAPH, SELECTFIELDITEMS }, key) => {
                  return (
                    <CardText
                     index={key}
                     key={key}
                     style={{ padding: "2px 16px" }}
                     >
                       <div className="panel-body">
                         { SELECTFIELDITEMS && <SelectField className={selectFieldClassName} floatingLabelText="Sort By" MENUITEMS={SELECTFIELDITEMS} /> }
                         <div className="panel-6">
                          { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
                         </div>
                         { GRAPH && GRAPH }
                       </div>
                   </CardText>
                  )
                })}
            </SwipeableViews>
          </Card>
        </div>
      </div>
    )
  }
}

export default SliderPanel;
