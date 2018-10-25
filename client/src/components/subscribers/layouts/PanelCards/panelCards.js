import ACTIVETABLEHEADERS from '../ActiveHeaders/activeHeaders';
import INACTIVETABLEHEADERS from '../InactiveHeaders/inactiveHeaders';

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    SELECTFIELD: true,
    TAB: 'Active Subscribers',
    TABLECONTENTS: activeitems,
    TABLEHEADERS: ACTIVETABLEHEADERS,
    TABLERECORDS: activeitemcount,
    tipTitle: 'Add Subscriber',
    ...rest,
  },
  {
    SELECTFIELD: true,
    TAB: 'Inactive Subscribers',
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: INACTIVETABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest,
  },
];
