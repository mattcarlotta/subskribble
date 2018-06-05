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
    const { buttonIcon, buttonPushLocation, CARDS, cardTitle, Panel, serverMessage, tipTitle } = this.props;
    const { isLoading } = this.state;

    return (
      isLoading
        ? <Loader
            buttonIcon={buttonIcon}
            buttonPushLocation={buttonPushLocation}
            cardTitle={cardTitle}
            tipTitle={tipTitle}
          />
        : <Panel CARDS={CARDS({...this.props})} serverMessage={serverMessage} />
    )
  }
}
