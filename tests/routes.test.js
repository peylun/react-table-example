const routes = require('../routes/index');
let req = {};
let resp = {};

beforeEach(() => {
	// initialize req & resp
	req = {
		query: {}
	};
	resp = {
		data: {},
		json(data) {
			this.data = data;
		}
	};
});

describe('Data', () => {
	test('data should return all data without pagination and sort parameters', () => {
		routes.data(req, resp);
		expect(resp.data.length).toBe(2000);
		expect(resp.data[0].id).toBe(1);
		expect(resp.data[0].username).toBe('Username1');
		expect(resp.data[1].id).toBe(2);
		expect(resp.data[1].username).toBe('Username2');
		expect(resp.data[2].id).toBe(3);
		expect(resp.data[2].username).toBe('Username3');
		expect(resp.data[3].id).toBe(4);
		expect(resp.data[3].username).toBe('Username4');
	});
	test('data should return all data sorted by username in descending order', () => {
		req.query.sort = 'username';
		req.query.sortDirection = 'desc';

		routes.data(req, resp);
		expect(resp.data.length).toBe(2000);
		expect(resp.data[0].id).toBe(999);
		expect(resp.data[0].username).toBe('Username999');
		expect(resp.data[1].id).toBe(998);
		expect(resp.data[1].username).toBe('Username998');
		expect(resp.data[2].id).toBe(997);
		expect(resp.data[2].username).toBe('Username997');
		expect(resp.data[3].id).toBe(996);
		expect(resp.data[3].username).toBe('Username996');
	});
	test('data should return paginated data starting from 0 sorted by username in ascending order', () => {
		req.query.sort = 'username';
		req.query.sortDirection = 'asc';
		req.query.start = 0;
		req.query.limit = 10;

		routes.data(req, resp);
		expect(resp.data.length).toBe(10);
		expect(resp.data[0].id).toBe(1);
		expect(resp.data[0].username).toBe('Username1');
		expect(resp.data[1].id).toBe(10);
		expect(resp.data[1].username).toBe('Username10');
		expect(resp.data[2].id).toBe(100);
		expect(resp.data[2].username).toBe('Username100');
		expect(resp.data[3].id).toBe(1000);
		expect(resp.data[3].username).toBe('Username1000');
	});
	test('data should return paginated data starting from 10 sorted by id in ascending order', () => {
		req.query.sort = 'id';
		req.query.sortDirection = 'asc';
		req.query.start = 10;
		req.query.limit = 10;

		routes.data(req, resp);
		expect(resp.data.length).toBe(10);
		expect(resp.data[0].id).toBe(11);
		expect(resp.data[0].username).toBe('Username11');
		expect(resp.data[1].id).toBe(12);
		expect(resp.data[1].username).toBe('Username12');
		expect(resp.data[2].id).toBe(13);
		expect(resp.data[2].username).toBe('Username13');
		expect(resp.data[3].id).toBe(14);
		expect(resp.data[3].username).toBe('Username14');
	});
});

describe('Data Size', () => {
	test('dataSize should return totalCount of 2000', () => {
		routes.dataSize(req, resp);
		expect(resp.data.totalCount).toBe(2000);
	});
});
