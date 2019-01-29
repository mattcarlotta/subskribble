import React from 'react';
import { Row } from 'antd';
import PageContainer from '../app/panels/PageContainer/pageContainer';
import createPlan from '../../images/createPlan.png';
import createPromo from '../../images/createPromo.png';
import createTemplate from '../../images/createTemplate.png';
import refundTrans from '../../images/refundTrans.png';
import sendMessage from '../../images/sendMessage.png';
import subRegister from '../../images/subRegister.png';
import Instruction from './Instruction/instruction.js';
import styles from './landing.scss';

export default () => (
  <PageContainer>
    <div className={styles.landingContainer}>
      <div className={styles.landingLogo}>
        <h2>Welcome to subskribble!</h2>
      </div>
      <hr />
      <div className={styles.landingGettingStarted}>
        <h2>Getting Started</h2>
        <p className={styles.landingInstructionsSubtitle}>
          Follow these simple steps to get up and running.
        </p>
        <Row className={styles.landingInstructionsList}>
          <Instruction
            description="Create a plan for subscribers to be registered to. Give it a unique name and description. Set a specified charge amount weekly, bi-weekly, monthly, bi-monthly, quaterly, twice a year, or annually. Optionally, specify a trial period before the subscriber will be charged."
            imgSrc={createPlan}
            link="subskribble/plans/create"
            title="Create a Plan"
          />
          <Instruction
            description="Create special promo codes for new subscribers. It can be a percentage or a dollar amount, and it can have a limited or unlimited amount of usages!"
            imgSrc={createPromo}
            link="subskribble/promotionals/create"
            title="Add Promotional Codes"
          />
          <Instruction
            description="Provide the necessary contact, billing, and credit card information. Select the desired plan. Review all the details, then click Subscribe to add a new subscriber."
            imgSrc={subRegister}
            link="subskribble/subscribers/register"
            title="Register a Subscriber"
          />
          <Instruction
            description="Create personalized email templates for your registered subscribers. Keep them up-to-date on up-and-coming products, news, or general information. The email templates can be applied to multiple plans or just one."
            imgSrc={createTemplate}
            link="subskribble/templates/create"
            title="Generate Personalized Email Templates"
          />
          <Instruction
            description="Ready to send out an email? Simply select an email template and click Submit to send emails to all of your subscribers! That's it. One simple click."
            imgSrc={sendMessage}
            link="subskribble/messages/create"
            title="Send Messages"
          />
          <Instruction
            description="Over charge a subscriber? Or a subscriber ended their subscription early? No worries, simply credit or refund the transaction partially or in full."
            imgSrc={refundTrans}
            link="subskribble/transactions"
            title="Refund/Credit Transactions"
          />
        </Row>
      </div>
    </div>
  </PageContainer>
);
