import React from 'react';
import { Link } from 'react-router';
import PageContainer from '../app/panels/pageContainer';

export default () => (
  <PageContainer>
    <div className="landing-container">
      <div className="logo">
        <i className="material-icons icon">wifi_tethering</i>
        <span className="text">subskribble</span>
      </div>
      <hr />
      <h2 className="instructions">Getting Started</h2>
      <p className="instructions-subtitle">
        Follow these simple steps to get up and running.
      </p>
      <ul className="instructions-list">
        <li>
          Create a plan for your subscribers to register to by clicking{' '}
          <Link to="/subskribble/plans/create">here</Link>.
        </li>
        <li>
          Register subscribers to your newly created plan by clicking{' '}
          <Link to="/subskribble/subscribers/register">here</Link>.
        </li>
        <li>
          Add special promotional codes to your plans by clicking{' '}
          <Link to="/subskribble/promotionals/create">here</Link>.
        </li>
        <li>
          Generate personalized email templates for your plans by clicking{' '}
          <Link to="/subskribble/templates/create">here</Link>.
        </li>
        <li>
          Send messages to your plan's subscribers by utilizing your
          personalized templates by clicking{' '}
          <Link to="/subskribble/messages/create">here</Link>.
        </li>
        <li>
          View, refund, or credit transactions generated by your plans by
          clicking <Link to="/subskribble/transactions">here</Link>.
        </li>
      </ul>
    </div>
  </PageContainer>
);
