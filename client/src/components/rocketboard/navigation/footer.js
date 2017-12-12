import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

export default class Footer extends Component {
  // state = { selectedIndex: null };
  //
  // select = (index) => this.setState({selectedIndex: index});

  handleClick = (requestedPage) => browserHistory.push(`${requestedPage}`)

  render() {
    return (
      <div className="dash-footer-container">
        <Paper zDepth={1}>
          <BottomNavigation
            // selectedIndex={this.state.selectedIndex}
            >
              <BottomNavigationItem
                label="FAQs"
                icon={<FontIcon className="material-icons">room_service</FontIcon>}
                onClick={() => {
                  // this.select(0)
                  this.handleClick('/rocketboard/faqs')
                }}
              />
              <BottomNavigationItem
                label="Tutorials"
                icon={<FontIcon className="material-icons">import_contacts</FontIcon>}
                onClick={() => {
                  // this.select(1)
                  this.handleClick('/rocketboard/tutorials')
                }}
              />
              <BottomNavigationItem
                label="Contact Us"
                icon={<FontIcon className="material-icons">question_answer</FontIcon>}
                onClick={() => {
                  // this.select(2)
                  this.handleClick('/rocketboard/contact-us')
                }}
              />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}
