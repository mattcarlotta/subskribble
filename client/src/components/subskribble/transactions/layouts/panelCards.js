import TABLEHEADERS from './headers';

export default ({
	activeitems,
	activeitemcount,
	inactiveitems,
	inactiveitemcount,
	...rest
}) => [
	{
		SELECTFIELD: true,
		TAB: 'Charges',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Refunds',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];
