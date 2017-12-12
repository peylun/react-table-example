import React from 'react';
import TableRow from '../app/component/TableRow.jsx';
import {shallow} from 'enzyme';

describe('TableRow', () => {
	const rowData = {
		name: 'Hello',
		gender: 'Female'
	};
	const columnDefs = [{
		headerName: 'Name',
		field: 'name'
	}, {
		headerName: 'Gender',
		field: 'gender'
	}];

	test('should render row with cells based on column definition and row data', () => {
		const row = shallow(
			<TableRow 
				index={1}
				columnDefs={columnDefs}
				rowData={rowData}
			/>
		);
		expect(row.children().length).toBe(2);
		expect(row.childAt(0).props().index).toBe(1);
		expect(row.childAt(0).props().columnDef.field).toBe('name');
		expect(row.childAt(0).props().rowData.name).toBe('Hello');
		expect(row.childAt(1).props().index).toBe(1);
		expect(row.childAt(1).props().columnDef.field).toBe('gender');
		expect(row.childAt(1).props().rowData.gender).toBe('Female');
	});
});