import React, { PureComponent } from 'react';
import Loader from '../../../../containers/subskribble/app/loading/Loader';

export default class PanelLoader extends PureComponent {
  state = { isLoading: true };

  componentDidMount = () => {
    const { activeitemcount, inactiveitemcount, fetchItems, fetchItemCounts } = this.props;
    (!activeitemcount || !inactiveitemcount) && fetchItemCounts();
    fetchItems();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { activeitems, activeitemcount, inactiveitems, inactiveitemcount } = this.props;
    if ((activeitems && activeitemcount) || (inactiveitems && inactiveitemcount)) this.setState({ isLoading: false })
  }

  render = () => {
    const { buttonLabel, buttonPushLocation, CARDS, cardTitle, Panel, serverMessage } = this.props;
    const { isLoading } = this.state;

    return (
      isLoading
        ? <Loader
            buttonLabel={buttonLabel}
            buttonPushLocation={buttonPushLocation}
            cardTitle={cardTitle}
          />
        : <Panel CARDS={CARDS({...this.props})} serverMessage={serverMessage} />
    )
  }
}
