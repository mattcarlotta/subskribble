import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, Tooltip } from 'antd';
import styles from './leftNav.scss';

class LeftNav extends PureComponent {
  handleClick = () => browserHistory.push(`/subskribble/${this.props.link}`);

  handlePreventButtonFocus = e => e.target.blur();

  render = () => (
    <div className={styles.leftNav}>
      <Tooltip
        arrowPointAtCenter
        placement="bottom"
        title={this.props.collapseSideNav ? 'Open Menu' : 'Close Menu'}
        overlayClassName={styles.tooltipPlacement}
      >
        <Button
          className={styles.menuButtonCollapse}
          onClick={
            this.props.handleMenuToggle
              ? this.props.handleMenuToggle
              : this.handleClick
          }
          onFocus={this.handlePreventButtonFocus}
        >
          <i className={`${styles.materialIcons} ${styles.navButtonIcon}`}>
            {this.props.collapseSideNav ? 'menu' : 'format_indent_decrease'}
          </i>
        </Button>
      </Tooltip>
    </div>
  );
}

export default LeftNav;

LeftNav.propTypes = {
  link: PropTypes.string,
  collapseSideNav: PropTypes.bool.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
};
