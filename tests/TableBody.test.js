import React from 'react';
import TableBody from '../app/component/TableBody.jsx';
import {shallow} from 'enzyme';

describe('TableBody', () => {
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

	test('should render body with rows based on data', () => {
		const body = shallow(
			<TableBody 
				columnDefs={columnDefs}
				data={data}
			/>
		);
		expect(body.children().length).toBe(2);
		expect(body.childAt(0).props().index).toBe(0);
		expect(body.childAt(0).props().rowData.name).toBe('Hello');
		expect(body.childAt(0).props().rowData.gender).toBe('Female');
		expect(body.childAt(1).props().index).toBe(1);
		expect(body.childAt(1).props().rowData.name).toBe('Hey');
		expect(body.childAt(1).props().rowData.gender).toBe('Male');
	});
});