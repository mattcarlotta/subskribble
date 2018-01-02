import { browserHistory } from 'react-router';

export const  ACTIVECAMPAIGNS = [
  {
    status: 'active',
    name: '20PERCENTOFF',
    amount: '%20.00',
    maxUsage: 100,
    totalUsage: 0,
  }
];

export const  INACTIVECAMPAIGNS = [
  {
    status: 'inactive',
    name: '40PERCENTOFF',
    amount: '%40.00',
    maxUsage: 50,
    totalUsage: 50,
  }
]

export const ACTIVECAMPAIGNSBUTTONS = [
  {
    className: 'btn-reposition f-l',
    label: "Add Promo Code",
    onClickAction: () => browserHistory.push('/rocketboard/campaigns/add-promo-code')
  },
  {
    className: 'btn-reposition f-l',
    label: "Edit Promo Code",
    onClickAction: () => browserHistory.push('/rocketboard/campaigns/edit-promo-code')
  },
  {
    className: 'btn-reposition f-l',
    label: "Disable Promo Code",
    onClickAction: () => browserHistory.push('/rocketboard/campaigns/disable-promo-code')
  }
]

export const INACTIVECAMPAIGNSBUTTONS = [
  {
    className: 'btn-reposition f-l',
    label: "Enable Promo Code",
    onClickAction: () => browserHistory.push('/rocketboard/campaigns/enable-promo-code')
  },
  {
    className: 'btn-reposition f-l',
    label: "Delete Promo Code",
    onClickAction: () => browserHistory.push('/rocketboard/campaigns/delete-promo-code')
  }
]

export const TABLEHEADERS = ['Status', 'Name', 'Amount', 'Max Usage', 'Total Usage' ];
