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
    editLocation: 'promotionals',
    SELECTFIELD: true,
    TAB: 'Active Promotionals',
    TABLECONTENTS: activeitems,
    TABLEHEADERS: ACTIVETABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest,
  },
  {
    SELECTFIELD: true,
    TAB: 'Inactive Promotionals',
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: INACTIVETABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest,
  },
];
