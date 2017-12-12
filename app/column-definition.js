export default [{
	headerName: 'Username',
	field: 'username',
	minWidth: 200
}, {
	headerName: 'Roles',
	field: 'roles',
	minWidth: 200,
	cellRenderer (params) {
		return params.value ? params.value.join(', ') : '';
	}
}, {
	headerName: 'First name',
	field: 'firstName',
	minWidth: 85
}, {
	headerName: 'Last name',
	field: 'lastName',
	minWidth: 85
}, {
	headerName: 'Account name',
	field: 'accountName',
	minWidth: 125
}];
