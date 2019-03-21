import isEmpty from 'lodash';
import React, { Component } from 'react';
import BasicPanel from 'components/app/panels/BasicPanel/basicPanel.js';
import PageContainer from 'components/app/panels/PageContainer/pageContainer.js';
import PanelLoading from 'components/app/loading/PanelLoading/PanelLoading.js';
import TabPanel from 'components/app/panels/TabPanel/tabPanel.js';

class PanelLoader extends Component {
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
      (!isEmpty(items) ||
        (items.length !== 0 && items !== nextProps.items) ||
        itemcount !== nextProps.itemcount);
    const loadedTab =
      panelType === 'tab' &&
      (!isEmpty(activeitems) ||
        (activeitems.length !== 0 && activeitems !== nextProps.activeitems) ||
        activeitemcount !== nextProps.activeitemcount ||
        (!isEmpty(inactiveitems) ||
          (inactiveitems.length !== 0 &&
            inactiveitems !== nextProps.inactiveitems) ||
          inactiveitemcount !== nextProps.inactiveitemcount));

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

export default PanelLoader;
