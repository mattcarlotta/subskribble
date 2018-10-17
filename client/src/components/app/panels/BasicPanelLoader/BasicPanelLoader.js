import React, { PureComponent } from 'react';
import Loader from '../../../../containers/app/loading/Loader';

export default class BasicPanelLoader extends PureComponent {
  state = { isLoading: true };

  componentDidMount = () => {
    const { itemcount, fetchItems, fetchItemCounts } = this.props;

    if (!itemcount) {
      fetchItemCounts();
    }
    fetchItems();
  };

  componentDidUpdate = () => {
    const { items, itemcount } = this.props;

    if (items && itemcount) this.setState({ isLoading: false });
  };

  render = () =>
    this.state.isLoading ? (
      <Loader {...this.props} />
    ) : (
      <this.props.Panel
        {...this.props}
        CARDS={this.props.CARDS({ ...this.props })}
      />
    );
}
