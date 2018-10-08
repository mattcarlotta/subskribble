import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Col, Tooltip } from 'antd';
import PieChart from '../../app/charts/PieChart';
import NoData from './noData';

const transactionLegend = [
  {
    title: 'Charges',
    className: 'caret-up-charges',
    type: 'caret-up',
  },
  {
    title: 'Refunds',
    className: 'caret-down-refunds',
    type: 'caret-down',
  },
  {
    title: 'Credits',
    className: 'minus-credits',
    type: 'minus',
  },
  {
    title: 'Dues',
    className: 'minus-dues',
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
    <Col span={8}>
      <div className="mini-panel-container">
        <div className="tab-container">
          <h5 style={{ color: '#3256A7' }} className="tab">
            <i className="material-icons">payment</i>
            <span className="title">Transactions</span>
          </h5>
        </div>
        <hr />
        <ul className="transaction-numbers">
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
        <div style={{ paddingTop: 0 }} className="details-container">
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
      </div>
    </Col>
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
