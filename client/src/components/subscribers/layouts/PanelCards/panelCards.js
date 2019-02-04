import ACTIVETABLEHEADERS from '../ActiveHeaders/activeHeaders.js';
import INACTIVETABLEHEADERS from '../InactiveHeaders/inactiveHeaders.js';

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
