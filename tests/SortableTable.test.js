import React from 'react';
import SortableTable from '../app/component/SortableTable.jsx';
import {shallow} from 'enzyme';
import fetch from 'jest-fetch-mock';

describe('SortableTable', () => {
	global.fetch = fetch;

	const columnDefs = [{
		headerName: 'Name',
		field: 'name'
	}, {
		headerName: 'Gender',
		field: 'gender'
	}];

	test('should render sortable table accordingly', () => {
		fetch.mockResponses([
			JSON.stringify({
				totalCount: 2
			})
		], [
			JSON.stringify([{
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}, {
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}])
		]);

		const sortableTable = shallow(
			<SortableTable 
				url="/data"
				sizeUrl="/dataSize"
				columnDefs={columnDefs} 
				initialSort={{
					column: 'name',
					direction: 'asc'
				}}
			/>
		);

		setTimeout(() => {
			expect(sortableTable.childAt(0).props().page).toBe(0);
			expect(sortableTable.childAt(0).props().pageSize).toBe(20);
			expect(sortableTable.childAt(0).props().totalPageCount).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().columnDefs).toBe(columnDefs);
			expect(sortableTable.childAt(1).childAt(0).props().sort.column).toBe('name');
			expect(sortableTable.childAt(1).childAt(0).props().sort.direction).toBe('asc');
			expect(sortableTable.childAt(1).childAt(0).props().data.length).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].id).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].name).toBe('Hello');
			expect(sortableTable.childAt(1).childAt(0).props().data[1].id).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().data[1].name).toBe('Hey');
			expect(sortableTable.childAt(2).props().page).toBe(0);
			expect(sortableTable.childAt(2).props().pageSize).toBe(20);
			expect(sortableTable.childAt(2).props().totalPageCount).toBe(1);
		}, 1000);
	});

	test('should handle sort change', () => {
		fetch.mockResponses([
			JSON.stringify({
				totalCount: 2
			})
		], [
			JSON.stringify([{
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}, {
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}])
		], [
			JSON.stringify([{
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}, {
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}])
		]);

		const sortableTable = shallow(
			<SortableTable 
				url="/data"
				sizeUrl="/dataSize"
				columnDefs={columnDefs} 
				initialSort={{
					column: 'name',
					direction: 'asc'
				}}
			/>
		);
		sortableTable.childAt(1).childAt(0).props().onSortChanged('gender', 'desc');

		setTimeout(() => {
			expect(sortableTable.childAt(0).props().page).toBe(0);
			expect(sortableTable.childAt(0).props().pageSize).toBe(20);
			expect(sortableTable.childAt(0).props().totalPageCount).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().columnDefs).toBe(columnDefs);
			expect(sortableTable.childAt(1).childAt(0).props().sort.column).toBe('gender');
			expect(sortableTable.childAt(1).childAt(0).props().sort.direction).toBe('desc');
			expect(sortableTable.childAt(1).childAt(0).props().data.length).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].id).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].name).toBe('Hey');
			expect(sortableTable.childAt(1).childAt(0).props().data[1].id).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().data[1].name).toBe('Hello');
			expect(sortableTable.childAt(2).props().page).toBe(0);
			expect(sortableTable.childAt(2).props().pageSize).toBe(20);
			expect(sortableTable.childAt(2).props().totalPageCount).toBe(1);
		}, 1000);
	});
	
	test('should handle page size change', () => {
		fetch.mockResponses([
			JSON.stringify({
				totalCount: 2
			})
		], [
			JSON.stringify([{
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}, {
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}])
		], [
			JSON.stringify([{
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}])
		]);

		const sortableTable = shallow(
			<SortableTable 
				url="/data"
				sizeUrl="/dataSize"
				columnDefs={columnDefs} 
				initialSort={{
					column: 'name',
					direction: 'asc'
				}}
			/>
		);
		sortableTable.childAt(0).props().onPageSizeChanged(1);

		setTimeout(() => {
			expect(sortableTable.childAt(0).props().page).toBe(0);
			expect(sortableTable.childAt(0).props().pageSize).toBe(1);
			expect(sortableTable.childAt(0).props().totalPageCount).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().columnDefs).toBe(columnDefs);
			expect(sortableTable.childAt(1).childAt(0).props().sort.column).toBe('gender');
			expect(sortableTable.childAt(1).childAt(0).props().sort.direction).toBe('desc');
			expect(sortableTable.childAt(1).childAt(0).props().data.length).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].id).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].name).toBe('Hello');
			expect(sortableTable.childAt(2).props().page).toBe(0);
			expect(sortableTable.childAt(2).props().pageSize).toBe(1);
			expect(sortableTable.childAt(2).props().totalPageCount).toBe(2);
		}, 1000);
	});
	
	test('should handle page change', () => {
		fetch.mockResponses([
			JSON.stringify({
				totalCount: 2
			})
		], [
			JSON.stringify([{
				id: 1,
				name: 'Hello',
				gender: 'Female'
			}, {
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}])
		], [
			JSON.stringify([{
				id: 2,
				name: 'Hey',
				gender: 'Male'
			}])
		]);

		const sortableTable = shallow(
			<SortableTable 
				url="/data"
				sizeUrl="/dataSize"
				columnDefs={columnDefs} 
				initialSort={{
					column: 'name',
					direction: 'asc'
				}}
			/>
		);
		sortableTable.childAt(0).props().onPageSizeChanged(1);
		sortableTable.childAt(0).props().onPageChanged(1);

		setTimeout(() => {
			expect(sortableTable.childAt(0).props().page).toBe(1);
			expect(sortableTable.childAt(0).props().pageSize).toBe(1);
			expect(sortableTable.childAt(0).props().totalPageCount).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().columnDefs).toBe(columnDefs);
			expect(sortableTable.childAt(1).childAt(0).props().sort.column).toBe('gender');
			expect(sortableTable.childAt(1).childAt(0).props().sort.direction).toBe('desc');
			expect(sortableTable.childAt(1).childAt(0).props().data.length).toBe(1);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].id).toBe(2);
			expect(sortableTable.childAt(1).childAt(0).props().data[0].name).toBe('Hey');
			expect(sortableTable.childAt(2).props().page).toBe(1);
			expect(sortableTable.childAt(2).props().pageSize).toBe(1);
			expect(sortableTable.childAt(2).props().totalPageCount).toBe(2);
		}, 1000);
	});
});