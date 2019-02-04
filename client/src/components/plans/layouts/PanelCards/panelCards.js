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
    editLocation: 'plans',
    SELECTFIELD: true,
    TAB: 'Active Plans',
    TABLECONTENTS: activeitems,
    TABLEHEADERS: ACTIVETABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest,
  },
  {
    SELECTFIELD: true,
    TAB: 'Inactive Plans',
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: INACTIVETABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest,
  },
];
