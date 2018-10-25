import TABLEHEADERS from '../Headers/headers';

export default ({ items, itemcount, ...rest }) => [
  {
    SELECTFIELD: true,
    TAB: 'Messages',
    TABLECONTENTS: items,
    TABLEHEADERS,
    TABLERECORDS: itemcount,
    ...rest,
  },
];
