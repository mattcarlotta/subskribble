import React from 'react';
import PricingHeader from './header/pricingHeader';
// import PricingTitle from './title/pricingTitle';
import PricingTable from './table/pricingTable';
import PricingFAQs from './faqs/pricingFAQs';
import PricingContact from './contact/pricingContact';

export default function() {
  return (
    <span>
      <PricingHeader />
      {/* <PricingTitle /> */}
      <PricingTable />
      <PricingFAQs />
      <PricingContact />
    </span>
  )
}
