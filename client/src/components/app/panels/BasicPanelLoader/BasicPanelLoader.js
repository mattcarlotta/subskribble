import isEmpty from 'lodash';
import React, { Component } from 'react';
import BasicPanel from '../BasicPanel/basicPanel.js';
import PageContainer from '../PageContainer/pageContainer.js';
import PanelLoading from '../../loading/PanelLoading/PanelLoading.js';
import TabPanel from '../TabPanel/tabPanel.js';

class BasicPanelLoader extends Component {
  state = { isLoading: true };

  componentDidMount = () => {
    const {
      activeitemcount,
      inactiveitemcount,
      itemcount,
      fetchItems,
      fetchItemCounts,
      panelType,
    } = this.props;

    const loadBasic = panelType === 'basic' && !itemcount;
    const loadTab =
      panelType === 'tab' && (!activeitemcount || !inactiveitemcount);

    if (loadBasic || loadTab) {
      fetchItemCounts();
    }
    fetchItems();
  };

  componentDidUpdate = nextProps => {
    const {
      activeitems,
      activeitemcount,
      inactiveitems,
      inactiveitemcount,
      items,
      itemcount,
      panelType,
    } = this.props;

    const loadedBasic =
      panelType === 'basic' &&
      (!isEmpty(items) || itemcount !== nextProps.itemcount);
    const loadedTab =
      panelType === 'tab' &&
      (!isEmpty(activeitems) ||
        activeitemcount !== nextProps.activeitemcount ||
        (!isEmpty(inactiveitems) ||
          inactiveitemcount !== nextProps.inactiveitemcount));

    console.log('items', items);
    console.log('nextItems', nextProps.items);
    console.log('loadedBasic', items !== nextProps.items);
    if (loadedBasic || loadedTab) this.setState({ isLoading: false });
  };

  render = () =>
    this.state.isLoading ? (
      <PanelLoading {...this.props} />
    ) : (
      <PageContainer>
        {this.props.panelType === 'basic' ? (
          <BasicPanel
            TABLECONTENTS={this.props.items}
            TABLERECORDS={this.props.itemcount}
            {...this.props}
          />
        ) : (
          <TabPanel CARDS={this.props.CARDS({ ...this.props })} />
        )}
      </PageContainer>
    );
}

export default BasicPanelLoader;
