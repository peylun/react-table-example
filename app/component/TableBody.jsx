import React from 'react';
import TableRow from './TableRow.jsx';

export default class TableBody extends React.Component {
	render() {
		return (
			<tbody className="pl-table-body">
				{
					this.props.data.map((datum, index) => {
						return (
							<TableRow 
								key={datum.id}
								index={index}
								columnDefs={this.props.columnDefs}
								rowData={datum}
							/>
						);
					})
				}
			</tbody>
		);
	}
};