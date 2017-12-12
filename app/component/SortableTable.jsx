import React from 'react';
import 'abortcontroller-polyfill';
import Table from './Table.jsx';
import PaginationControl from './PaginationControl.jsx';

export default class SortableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sort: this.props.initialSort || {
				column: this.props.columnDefs && this.props.columnDefs.length ? this.props.columnDefs[0].field : '',
				direction: 'asc'
			},
			page: 0,
			pageSize: this.props.pageSize || 20,
			totalDataCount: null,
			data: []
		};
		this.onSortChanged = this.onSortChanged.bind(this);
		this.onPageChanged = this.onPageChanged.bind(this);
		this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
	}

	onSortChanged(column, direction) {
		this.setState((prevState, props) => {
			this.fetchData(column, direction, 0, prevState.pageSize);
			return {
				sort: {
					column: direction ? column : '',
					direction: direction
				},
				page: 0
			};
		});
	}

	onPageChanged(page) {
		this.setState((prevState, props) => {
			const maxPage = Math.ceil(prevState.totalDataCount / prevState.pageSize);
			if (page < 0) {
				page = 0;
			} else if (page >= maxPage) {
				page = maxPage - 1;
			}
			if (prevState.page !== page) {
				this.fetchData(prevState.sort.column, prevState.sort.direction, page, prevState.pageSize);
			}
			return {
				page: page
			};
		});
	}

	onPageSizeChanged(pageSize) {
		this.setState((prevState, props) => {
			this.fetchData(prevState.sort.column, prevState.sort.direction, 0, pageSize);
			return {
				page: 0,
				pageSize: pageSize
			};
		});
	}

	fetchData(column = this.state.sort.column, direction = this.state.sort.direction, page = this.state.page, pageSize = this.state.pageSize) {
		if (this.abortController) {
			this.abortController.abort();
		}
		this.abortController = new AbortController();
		const signal = this.abortController.signal;

		return fetch(`${this.props.url}?sort=${column}&sortDirection=${direction}&start=${page * pageSize}&limit=${pageSize}`, {signal})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					data: data
				});
			})
			.catch((err) => {
				if (err.name == 'AbortError') {
					return;
				}
			});
	}

	componentWillMount() {
		fetch(this.props.sizeUrl)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					totalDataCount: data.totalCount
				});
			});

		this.fetchData();
	}

	render() {
		return (
			<div className="pl-table-sortable">
				<PaginationControl
					page={this.state.page}
					pageSize={this.state.pageSize}
					totalPageCount={Math.ceil(this.state.totalDataCount / this.state.pageSize)}
					onPageChanged={this.onPageChanged}
					onPageSizeChanged={this.onPageSizeChanged}
				/>
				<div className="pl-table-wrapper">
					<Table 
						columnDefs={this.props.columnDefs} 
						sort={this.state.sort}
						data={this.state.data} 
						onSortChanged={this.onSortChanged}
					/>
				</div>
				<PaginationControl
					page={this.state.page}
					pageSize={this.state.pageSize}
					totalPageCount={Math.ceil(this.state.totalDataCount / this.state.pageSize)}
					onPageChanged={this.onPageChanged}
					onPageSizeChanged={this.onPageSizeChanged}
				/>
			</div>
		);
	}
};