import React, { Component } from 'react';
import BasicPanel from '../BasicPanel/basicPanel.js';
import PageContainer from '../PageContainer/pageContainer.js';
import PanelLoader from '../../loading/PanelLoader/PanelLoader.js';

class BasicPanelLoader extends Component {
  state = { isLoading: true };

  componentDidMount = () => {
    const { itemcount, fetchItems, fetchItemCounts } = this.props;

    if (!itemcount) {
      fetchItemCounts();
    }
    fetchItems();
  };

  componentDidUpdate = nextProps => {
    const { items, itemcount } = this.props;

    if (items !== nextProps.items || itemcount !== nextProps.itemcount)
      this.setState({ isLoading: false });
  };

  render = () =>
    this.state.isLoading ? (
      <PanelLoader {...this.props} />
    ) : (
      <PageContainer>
        <BasicPanel
          TABLECONTENTS={this.props.items}
          TABLERECORDS={this.props.itemcount}
          {...this.props}
        />
      </PageContainer>
    );
}

export default BasicPanelLoader;
