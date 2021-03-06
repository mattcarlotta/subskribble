import { CHARGEHEADERS, REFUNDHEADERS } from '../Headers/headers.js';

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    refund: true,
    SELECTFIELD: true,
    TAB: 'Charges',
    TABLECONTENTS: activeitems,
    TABLEHEADERS: CHARGEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest,
  },
  {
    SELECTFIELD: true,
    TAB: 'Refunds',
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: REFUNDHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest,
  },
];
