const formatCreditCard = (value, previousValue) => {
	if (!value) { return value }

	const onlyNums = value.replace(/[^\d]/g, '')

	if (!previousValue || value.length > previousValue.length) {
		if (onlyNums.length === 4 ) { return onlyNums + '-' }
		if (onlyNums.length === 8) { return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4) + '-' }
		if (onlyNums.length === 12) { return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8) + '-' }
		if (onlyNums.length === 16) { return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12) + '-' + onlyNums.slice(12, 16) }
	}
	if (onlyNums.length <= 4) { return onlyNums }
	if (onlyNums.length <= 8) { return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4,8) }
	if (onlyNums.length <= 12) { return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12) }
	return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12) + '-' + onlyNums.slice(12, 16);
}
const formatCVV = value => (!value ? value: returnMaxValue(value, 3))
const formatMonth = value => (!value ? value: returnMaxValue(value, 2))
const formatPhone = (value, previousValue) => {
	if (!value) { return value }

	const onlyNums = value.replace(/[^\d]/g, '')

	if (!previousValue || value.length > previousValue.length) {
		if (onlyNums.length === 3 ) { return '(' + onlyNums + ') ' }
		if (onlyNums.length === 6) { return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3) + '-' }
	}
	if (onlyNums.length <= 3) { return onlyNums }
	if (onlyNums.length <= 6) { return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3) }
	return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}
const formatState = value => (!value ? value : value.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>(^\s+|\s+$)]/gi, '').trim().slice(0,2).toUpperCase())
const formatYear = value => (!value ? value: returnMaxValue(value, 4))
const formatZip = value => (!value ? value : returnMaxValue(value, 5))
const returnMaxValue = (value, max) => (value.replace(/[^\d]/g, '').slice(0,max))

export {
	formatCreditCard,
	formatCVV,
	formatMonth,
	formatPhone,
	formatState,
	formatYear,
	formatZip
}
