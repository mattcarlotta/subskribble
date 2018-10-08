import ACTIVETABLEHEADERS from './activeHeaders';
import INACTIVETABLEHEADERS from './inactiveHeaders';

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
    tipTitle: 'Create New Promotional',
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
