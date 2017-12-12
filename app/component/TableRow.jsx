import React from 'react';
import TableCell from './TableCell.jsx';

export default class TableRow extends React.Component {
	render() {
		return (
			<tr className="pl-table-row">
				{
					this.props.columnDefs.map((column) => {
						return (
							<TableCell key={column.field}
								index={this.props.index}
								columnDef={column}
								rowData={this.props.rowData}
							/>
						);
					})
				}
			</tr>
		);
	}
};