import React, { PureComponent } from 'react';
// import Loader from '../../../../containers/app/loading/Loader';
import PanelLoading from '../../loading/PanelLoading/PanelLoading.js';
import PageContainer from '../PageContainer/pageContainer.js';
import TabPanel from '../TabPanel/tabPanel.js';

export default class PanelLoader extends PureComponent {
  state = { isLoading: true };

  componentDidMount = () => {
    const {
      activeitemcount,
      inactiveitemcount,
      fetchItems,
      fetchItemCounts,
    } = this.props;

    if (!activeitemcount || !inactiveitemcount) {
      fetchItemCounts();
    }

    fetchItems();
  };

  componentDidUpdate = () => {
    const {
      activeitems,
      activeitemcount,
      inactiveitems,
      inactiveitemcount,
    } = this.props;
    if (
      (activeitems && activeitemcount) ||
      (inactiveitems && inactiveitemcount)
    )
      this.setState({ isLoading: false });
  };

  render = () =>
    this.state.isLoading ? (
      <PanelLoading {...this.props} />
    ) : (
      <PageContainer>
        <TabPanel CARDS={this.props.CARDS({ ...this.props })} />
      </PageContainer>
    );
}
