const sampleData = [];
let nameIndex;
for (let i = 1; i <= 2000; ++i) {
	nameIndex = Math.round(Math.random() * 2000);
	sampleData.push({
		id: i,
		username: `Username${i}`,
		roles: Math.round(Math.random() * 10) % 2 ? ['Admin', 'User', 'Reporter'] : ['User', 'Reporter'],
		firstName: `First name ${nameIndex}`,
		lastName: `Last name ${nameIndex}`,
		accountName: `Account name ${Math.round(Math.random() * 10) + 1}`
	});
}

exports.data = function(req, res) {
	let data = sampleData.slice();

	// Handle sort
	if (req.query.sort) {
		let aValue, bValue, retValue;
		data.sort((a, b) => {
			aValue = a[req.query.sort];
			bValue = b[req.query.sort];
			if (Array.isArray(aValue)) {
				aValue = aValue.join(', ');
			}
			if (Array.isArray(bValue)) {
				bValue = bValue.join(', ');
			}
			retValue = aValue === bValue ? 0 : (aValue < bValue ? -1 : 1);
			return req.query.sortDirection === 'desc' ? retValue * -1 : retValue;
		});
	}

	// Handle pagination
	if (typeof req.query.start !== 'undefined' && req.query.limit) {
		data = data.splice(req.query.start, req.query.limit);
	}

	res.json(data);
};

exports.dataSize = function(req, res) {
	res.json({
		totalCount: sampleData.length
	});
};
