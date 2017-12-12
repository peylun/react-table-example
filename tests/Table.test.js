import React from 'react';
import Table from '../app/component/Table.jsx';
import {shallow} from 'enzyme';

describe('Table', () => {
	const data = [{
		id: 1,
		name: 'Hello',
		gender: 'Female'
	}, {
		id: 2,
		name: 'Hey',
		gender: 'Male'
	}];
	const columnDefs = [{
		headerName: 'Name',
		field: 'name'
	}, {
		headerName: 'Gender',
		field: 'gender'
	}];
	const sort = {
		column: 'name',
		direction: 'asc'
	};
	const onSortChanged = () => {};

	test('should render header and body based on column definition and data', () => {
		const table = shallow(
			<Table 
				columnDefs={columnDefs}
				data={data}
				sort={sort}
				onSortChanged={onSortChanged}
			/>
		);
		expect(table.childAt(0).props().columnDefs).toBe(columnDefs);
		expect(table.childAt(0).props().sort).toBe(sort);
		expect(table.childAt(0).props().onSortChanged).toBe(onSortChanged);
		expect(table.childAt(1).props().columnDefs).toBe(columnDefs);
		expect(table.childAt(1).props().data).toBe(data);
	});
});