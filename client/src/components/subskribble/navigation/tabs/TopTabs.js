import map from 'lodash/map';
import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';

import TABLINKS from './links/tabLinks';

class DashboardTabs extends Component {
  state = {
    activeTab: this.props.location.pathname.split('/subskribble/')[1],
    displayTabs: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        activeTab: this.props.location.pathname.split('/subskribble/')[1],
        displayTabs: false
      });
    }
  }

  handleActiveTab = (activeTab) => {
    this.setState({ activeTab, displayTabs: false }, () => browserHistory.push(`/subskribble/${activeTab}`))
  }

  handleToggleTab = () => this.setState({ displayTabs: !this.state.displayTabs })

  render() {
    const { activeTab, displayTabs } = this.state;
    const showTabs = displayTabs ? 'block' : 'none'
    return (
      <Fragment>
        <IconButton
          style={{ color: '#0585bf', display: 'block', position: 'absolute', top: '30px', right: '49%', margin: '0 auto', zIndex: 100 }}
          onClick={this.handleToggleTab}
          tooltip={ !displayTabs ? "Quick Tabs" : "Hide Tabs"}
          tooltipStyles={{ zIndex: 100, marginTop: '-10px' }}
          >
            {displayTabs
               ? <i className="material-icons">keyboard_arrow_up</i>
               : <i className="material-icons">keyboard_arrow_down</i>
            }
        </IconButton>
        <Tabs
          className="tabs-container"
          value={activeTab}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px', display: showTabs }}
          inkBarStyle={{ display:"none" }}
          >
            {map(TABLINKS, ({ icon, label }, key) => {
                return (
                  <Tab
                    key={key}
                    value={label}
                    className={ label === activeTab ? "active-tab" : null}
                    onActive={({props: {label}}) => this.handleActiveTab(label)}
                    icon={<i className="material-icons">{icon}</i>}
                    label={label}
                  />
                )
            })}
          </Tabs>
      </Fragment>
    )
  }
}

export default withRouter(DashboardTabs);
