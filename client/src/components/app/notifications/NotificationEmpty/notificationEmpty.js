import React from 'react';
import styles from './notificationEmpty.scss';

export default () => (
  <div className={styles.notificationEmpty}>
    <div className={styles.emptyTitle}>
      <i className={`${styles.materialIcons} ${styles.iconLogo}`}>
        wifi_tethering
      </i>
      <span className={styles.textLogo}>subskribble</span>
      {/* eslint-disable-next-line */}
      <p className={styles.message}>No notifications. You're all caught up!</p>
    </div>
  </div>
);
