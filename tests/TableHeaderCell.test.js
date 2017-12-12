import React from 'react';
import TableHeaderCell from '../app/component/TableHeaderCell.jsx';
import {shallow} from 'enzyme';

describe('TableHeaderCell', () => {
	test('should render header name', () => {
		const columnDef = {
			headerName: 'Name'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
			/>
		);

		expect(headerCell.find('.pl-table-header-name').text()).toBe('Name');
	});
	test('should render sort icon based on sort state: unsorted', () => {
		const columnDef = {
			headerName: 'Name'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
			/>
		);

		expect(headerCell.find('.pl-table-header-icons').contains(<i className="fa fa-unsorted"/>)).toBe(true);
	});
	test('should render sort icon based on sort state: asc', () => {
		const columnDef = {
			headerName: 'Name',
			sort: 'asc'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
			/>
		);

		expect(headerCell.find('.pl-table-header-icons').contains(<i className="fa fa-sort-asc"/>)).toBe(true);
	});
	test('should render sort icon based on sort state: desc', () => {
		const columnDef = {
			headerName: 'Name',
			sort: 'desc'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
			/>
		);

		expect(headerCell.find('.pl-table-header-icons').contains(<i className="fa fa-sort-desc"/>)).toBe(true);
	});
	test('should not render sort icon when suppressed', () => {
		const columnDef = {
			headerName: 'Name',
			suppressSorting: true
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
			/>
		);

		expect(headerCell.find('.pl-table-header-icons .fa').length).toBe(0);
	});
	test('should trigger onSortChanged callback when clicked and return the field name and next sort state: unsorted -> asc', () => {
		let notifyField = '';
		let notifySort = '';
		const onSortChanged = (field, sort) => {
			notifyField = field;
			notifySort = sort;
		};
		const columnDef = {
			headerName: 'Name',
			field: 'name'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
				onSortChanged={onSortChanged}
			/>
		);
		headerCell.simulate('click');
		expect(notifyField).toBe('name');
		expect(notifySort).toBe('asc');
	});
	test('should trigger onSortChanged callback when clicked and return the field name and next sort state: asc -> desc', () => {
		let notifyField = '';
		let notifySort = '';
		const onSortChanged = (field, sort) => {
			notifyField = field;
			notifySort = sort;
		};
		const columnDef = {
			headerName: 'Name',
			field: 'name',
			sort: 'asc'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
				onSortChanged={onSortChanged}
			/>
		);
		headerCell.simulate('click');
		expect(notifyField).toBe('name');
		expect(notifySort).toBe('desc');
	});
	test('should trigger onSortChanged callback when clicked and return the field name and next sort state: desc -> unsorted', () => {
		let notifyField = '';
		let notifySort = '';
		const onSortChanged = (field, sort) => {
			notifyField = field;
			notifySort = sort;
		};
		const columnDef = {
			headerName: 'Name',
			field: 'name',
			sort: 'desc'
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
				onSortChanged={onSortChanged}
			/>
		);
		headerCell.simulate('click');
		expect(notifyField).toBe('name');
		expect(notifySort).toBe('');
	});
	test('should not trigger onSortChanged callback when clicked when sort is suppressed', () => {
		let notifyField = '';
		let notifySort = '';
		const onSortChanged = (field, sort) => {
			notifyField = field;
			notifySort = sort;
		};
		const columnDef = {
			headerName: 'Name',
			field: 'name',
			suppressSorting: true
		};
		const headerCell = shallow(
			<TableHeaderCell 
				columnDef={columnDef}
				onSortChanged={onSortChanged}
			/>
		);
		headerCell.simulate('click');
		expect(notifyField).toBe('');
		expect(notifySort).toBe('');
	});
});