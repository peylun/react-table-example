import React from 'react';
import TableHeaderCell from './TableHeaderCell.jsx';

export default class TableHeader extends React.Component {
	render() {
		let sortParams;
		return (
			<thead className="pl-table-header">
				<tr className="pl-table-header-row">
				{
					this.props.columnDefs.map((column) => {
						sortParams = !column.suppressSorting && this.props.sort && this.props.sort.column === column.field ? {
							sort: this.props.sort.direction
						} : {};

						return (
							<TableHeaderCell 
								key={column.field} 
								columnDef={Object.assign(sortParams, column)}
								onSortChanged={this.props.onSortChanged}
							/>
						);
					})
				}
				</tr>
			</thead>
		);
	}
};