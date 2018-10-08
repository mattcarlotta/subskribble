import TABLEHEADERS from './headers';

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
