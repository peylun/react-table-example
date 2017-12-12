import React from 'react';

export default class TableHeaderCell extends React.Component {
	render() {
		const styles = {};
		let sortIcon = null;
		let onHeaderCellClick = null;

		if (this.props.columnDef.minWidth) {
			styles.minWidth = `${this.props.columnDef.minWidth}px`;
		}

		if (!this.props.columnDef.suppressSorting) {
			sortIcon = this.props.columnDef.sort ?
				(this.props.columnDef.sort === 'asc' ? <i className="fa fa-sort-asc"/> : <i className="fa fa-sort-desc"/>):
				<i className="fa fa-unsorted"/>;

			if (this.props.onSortChanged) {
				onHeaderCellClick = () => {
					const nextSortState = this.props.columnDef.sort === 'asc' ? 
						'desc' : 
						(this.props.columnDef.sort === 'desc' ? '' : 'asc')

					this.props.onSortChanged(this.props.columnDef.field, nextSortState);
				};
			}
		}

		return (
			<th className="pl-table-header-cell" style={styles} onClick={onHeaderCellClick}>
				<span className="pl-table-header-name">
					{this.props.columnDef.headerName}
				</span>
				<span className="pl-table-header-icons">
					{sortIcon}
				</span>
			</th>
		);
	}
};