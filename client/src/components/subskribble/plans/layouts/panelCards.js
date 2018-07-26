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
		editLocation: 'plans',
		SELECTFIELD: true,
		TAB: 'Active Plans',
		TABLECONTENTS: activeitems,
		TABLEHEADERS: ACTIVETABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Plan',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Plans',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS: INACTIVETABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];
