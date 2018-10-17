import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import PieChart from '../../../app/charts/PieChart';
import MiniPanel from '../MiniPanel/miniPanel';
import NoData from '../NoData/noData';
import styles from './transactionsPanel.scss';

const transactionLegend = [
  {
    title: 'Charges',
    className: styles.caretUpCharges,
    type: 'caret-up',
  },
  {
    title: 'Refunds',
    className: styles.caretDownRefunds,
    type: 'caret-down',
  },
  {
    title: 'Credits',
    className: styles.minusCredits,
    type: 'minus',
  },
  {
    title: 'Dues',
    className: styles.minusDues,
    type: 'minus',
  },
];

const TransactionsPanel = ({
  charges,
  chargestotal,
  credits,
  creditstotal,
  dues,
  duestotal,
  refunds,
  refundstotal,
}) => {
  const lengendTitle = [
    chargestotal || 0,
    refundstotal || 0,
    creditstotal || 0,
    duestotal || 0,
  ];
  return (
    <MiniPanel title="Transactions" titleColor="#E06A4F" titleIcon="payment">
      <ul className={styles.transactionNumbers}>
        {map(transactionLegend, ({ className, title, type }, key) => (
          <li key={title}>
            <Tooltip
              arrowPointAtCenter
              placement="bottom"
              trigger="hover"
              title={title}
            >
              <Icon className={className} type={type} theme="outlined" />$
              {lengendTitle[key]}
            </Tooltip>
          </li>
        ))}
      </ul>
      <div className={styles.dashDetailsContainer}>
        {charges > 0 || refunds > 0 ? (
          <PieChart
            data={[
              {
                id: 'Charges',
                label: 'Charges',
                value: charges ? parseInt(charges, 10) : 0,
                color: '#3256A7',
              },
              {
                id: 'Refunds',
                label: 'Refunds',
                value: refunds ? parseInt(refunds, 10) : 0,
                color: '#BE391C',
              },
              {
                id: 'Credits',
                label: 'Credits',
                value: credits ? parseInt(credits, 10) : 0,
                color: '#31708F',
              },
              {
                id: 'Dues',
                label: 'Dues',
                value: dues ? parseInt(dues, 10) : 0,
                color: '#FFAA00',
              },
            ]}
          />
        ) : (
          <NoData />
        )}
      </div>
    </MiniPanel>
  );
};

export default TransactionsPanel;

TransactionsPanel.propTypes = {
  charges: PropTypes.string,
  chargestotal: PropTypes.string,
  credits: PropTypes.string,
  creditstotal: PropTypes.string,
  dues: PropTypes.string,
  duestotal: PropTypes.string,
  refunds: PropTypes.string,
  refundstotal: PropTypes.string,
};
