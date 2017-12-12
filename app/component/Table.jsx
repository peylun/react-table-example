import React from 'react';
import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';

export default class Table extends React.Component {
	render() {
		return (
			<table className="pl-table">
				<TableHeader 
					columnDefs={this.props.columnDefs} 
					sort={this.props.sort}
					onSortChanged={this.props.onSortChanged}
				/>
				<TableBody 
					columnDefs={this.props.columnDefs} 
					data={this.props.data} 
				/>
			</table>
		);
	}
};