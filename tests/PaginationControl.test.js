import React from 'react';
import PaginationControl from '../app/component/PaginationControl.jsx';
import {shallow} from 'enzyme';

describe('PaginationControl', () => {
	test('should render page information accordingly', () => {
		const paginationControl = shallow(
			<PaginationControl 
				page={0}
				pageSize={10}
				totalPageCount={100}
			/>
		);
		expect(paginationControl.find('.pl-page-number-info').text()).toBe('Pageof 100');
		expect(paginationControl.find('.pl-page-number-info input').props().value).toBe(1);
		expect(paginationControl.find('.pl-page-size-info select').props().value).toBe(10);
	});
	test('should disable Previous button if on first page', () => {
		const paginationControl = shallow(
			<PaginationControl 
				page={0}
				pageSize={10}
				totalPageCount={100}
			/>
		);
		expect(paginationControl.find('.pl-page-ctrl-nav-previous button').props().disabled).toBe(true);
		expect(paginationControl.find('.pl-page-ctrl-nav-next button').props().disabled).toBe(false);
	});
	test('should disable Next button if on last page', () => {
		const paginationControl = shallow(
			<PaginationControl 
				page={99}
				pageSize={10}
				totalPageCount={100}
			/>
		);
		expect(paginationControl.find('.pl-page-ctrl-nav-previous button').props().disabled).toBe(false);
		expect(paginationControl.find('.pl-page-ctrl-nav-next button').props().disabled).toBe(true);
	});
	test('should enable Previous and Next button if not on first or last page', () => {
		const paginationControl = shallow(
			<PaginationControl 
				page={50}
				pageSize={10}
				totalPageCount={100}
			/>
		);
		expect(paginationControl.find('.pl-page-ctrl-nav-previous button').props().disabled).toBe(false);
		expect(paginationControl.find('.pl-page-ctrl-nav-next button').props().disabled).toBe(false);
	});
	test('should trigger onPageChanged when clicked on Previous button', () => {
		let pageState = 0;
		const onPageChanged = (page) => {
			pageState = page
		};
		const paginationControl = shallow(
			<PaginationControl 
				page={50}
				pageSize={10}
				totalPageCount={100}
				onPageChanged={onPageChanged}
			/>
		);
		paginationControl.find('.pl-page-ctrl-nav-previous button').simulate('click');
		expect(pageState).toBe(49);
	});
	test('should trigger onPageChanged when clicked on Next button', () => {
		let pageState = 0;
		const onPageChanged = (page) => {
			pageState = page
		};
		const paginationControl = shallow(
			<PaginationControl 
				page={50}
				pageSize={10}
				totalPageCount={100}
				onPageChanged={onPageChanged}
			/>
		);
		paginationControl.find('.pl-page-ctrl-nav-next button').simulate('click');
		expect(pageState).toBe(51);
	});
	test('should trigger onPageChanged when page input is changed', () => {
		let pageState = 0;
		const onPageChanged = (page) => {
			pageState = page
		};
		const paginationControl = shallow(
			<PaginationControl 
				page={50}
				pageSize={10}
				totalPageCount={100}
				onPageChanged={onPageChanged}
			/>
		);
		paginationControl.find('.pl-page-number-info input').simulate('change', {
			target: {
				value: '20'
			}
		});
		expect(pageState).toBe(19);
	});
	test('should trigger onPageSizeChanged when page size is changed', () => {
		let pageSizeState = 0;
		const onPageSizeChanged = (pageSize) => {
			pageSizeState = pageSize
		};
		const paginationControl = shallow(
			<PaginationControl 
				page={0}
				pageSize={10}
				totalPageCount={100}
				onPageSizeChanged={onPageSizeChanged}
			/>
		);
		paginationControl.find('.pl-page-size-info select').simulate('change', {
			target: {
				value: 20
			}
		});
		expect(pageSizeState).toBe(20);
	});
});