import React from 'react';
import TableHeader from '../app/component/TableHeader.jsx';
import {shallow} from 'enzyme';

describe('TableHeader', () => {
	test('should render header with header cells', () => {
		let notifyField = '';
		let notifySort = '';
		const onSortChanged = (field, sort) => {
			notifyField = field;
			notifySort = sort;
		};
		const columnDefs = [{
			headerName: 'Name',
			field: 'name'
		}, {
			headerName: 'Gender',
			field: 'gender'
		}];
		const sortParams = {
			column: 'name',
			direction: 'asc'
		}
		const header = shallow(
			<TableHeader 
				columnDefs={columnDefs}
				sort={sortParams}
				onSortChanged={onSortChanged}
			/>
		);
		expect(header.find('.pl-table-header-row').children().length).toBe(2);
		expect(header.find('.pl-table-header-row').childAt(0).props().columnDef.field).toBe('name');
		expect(header.find('.pl-table-header-row').childAt(0).props().columnDef.sort).toBe('asc');
		expect(header.find('.pl-table-header-row').childAt(1).props().columnDef.field).toBe('gender');
		expect(header.find('.pl-table-header-row').childAt(1).props().columnDef.sort).toBe(undefined);
	});
});