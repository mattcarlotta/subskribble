import React, { PureComponent } from 'react';
import Loader from '../../../containers/app/loading/Loader';

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
      <Loader {...this.props} />
    ) : (
      <this.props.Panel CARDS={this.props.CARDS({ ...this.props })} />
    );
}
