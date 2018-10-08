import TABLEHEADERS from './headers';

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    editLocation: 'templates',
    SELECTFIELD: true,
    TAB: 'Active Templates',
    TABLECONTENTS: activeitems,
    TABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest,
  },
  {
    SELECTFIELD: true,
    TAB: 'Inactive Templates',
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest,
  },
];
