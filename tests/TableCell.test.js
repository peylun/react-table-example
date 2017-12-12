import React from 'react';
import TableCell from '../app/component/TableCell.jsx';
import {shallow} from 'enzyme';

describe('TableCell', () => {
	const rowData = {
		name: 'Hello'
	};

	test('should render cell content based on rowData', () => {
		const columnDef = {
			headerName: 'Name',
			field: 'name'
		};
		const cell = shallow(
			<TableCell 
				columnDef={columnDef}
				rowData={rowData}
			/>
		);
		expect(cell.text()).toBe('Hello');
	});

	test('should render cell content using cellRenderer if provided', () => {
		const columnDef = {
			headerName: 'Name',
			field: 'name',
			cellRenderer(params) {
				return `Lala ${params.value}`
			}
		};
		const cell = shallow(
			<TableCell 
				columnDef={columnDef}
				rowData={rowData}
			/>
		);
		expect(cell.text()).toBe('Lala Hello');
	});
});