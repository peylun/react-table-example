import React from 'react';

export default class TableCell extends React.Component {
	render() {
		return (
			<td className="pl-table-cell">
				{
					this.props.columnDef.cellRenderer
					? this.props.columnDef.cellRenderer({
						column: this.props.columnDef,
						data: this.props.rowData,
						value: this.props.rowData[this.props.columnDef.field]
					})
					: this.props.rowData[this.props.columnDef.field]
				}
			</td>
		);
	}
};