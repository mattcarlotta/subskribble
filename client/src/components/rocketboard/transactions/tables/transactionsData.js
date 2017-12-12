export const CHARGES = [
  {
    status: 'paid',
    invoice: '#5892214',
    customer: 'Sherry Waters',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 2, 2017',
  },
  {
    status: 'late',
    invoice: '#5892216',
    customer: 'Bob Aronssen',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 9, 2017',
  },
  {
    status: 'late',
    invoice: '#5892221',
    customer: 'Shaniqua Smith',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 10, 2017',
  },
  {
    status: 'paid',
    invoice: '#5892230',
    customer: 'Tanya Ballschin',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 11, 2017',
  },
  {
    status: 'paid',
    invoice: '#5892242',
    customer: 'Siemen Walker',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 16, 2017',
  },
  {
    status: 'paid',
    invoice: '#5892256',
    customer: 'Jerry Lamar',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 22, 2017',
  }
];

export const REFUNDS = [
  {
    type: 'refund',
    id: 're_1BJvYiIOTIzpR6RKunhzsbWZ',
    customer: 'Mark Canelo',
    processor: 'stripe',
    amount: '$29.99',
    refundDate: 'Dec 12, 2017',
  },
  {
    type: 'credit',
    id: 're_2CJcHca64yvnmD1YHpvxsdkLT',
    customer: 'Axle Root',
    processor: 'stripe',
    amount: '$29.99',
    refundDate: 'Dec 17, 2017',
  }
]

export const CHARGESTABLEHEADERS = ['Status', 'Invoice#', 'Customer', 'Processor', 'Amount', 'Charge Date'];
export const REFUNDSTABLEHEADERS = ['Type', 'ID#', 'Customer', 'Processor', 'Amount', 'Refund Date'];
