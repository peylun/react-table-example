import React from 'react';

export default class PaginationControl extends React.Component {
	render() {
		return (
			<div className="pl-page-ctrl">
				<div className="pl-page-ctrl-nav pl-page-ctrl-nav-previous">
					<button disabled={this.props.page === 0} onClick={() => this.props.onPageChanged(this.props.page - 1)}>
						<i className="fa fa-angle-double-left"/>Previous
					</button>
				</div>
				<div className="pl-page-ctrl-info">
					<div className="pl-page-number-info">
						Page 
						<input type="number" 
							value={this.props.page + 1} 
							min="1" max={this.props.totalPageCount} 
							onChange={(ev) => this.props.onPageChanged(ev.target.value - 1)}
						/> 
						of {this.props.totalPageCount}
					</div>
					<div className="pl-page-size-info">
						<select value={this.props.pageSize} onChange={(ev) => this.props.onPageSizeChanged(ev.target.value)}>
							<option value={5}>5 Rows</option>
							<option value={10}>10 Rows</option>
							<option value={20}>20 Rows</option>
							<option value={25}>25 Rows</option>
							<option value={50}>50 Rows</option>
							<option value={100}>100 Rows</option>
						</select>
					</div>
				</div>
				<div className="pl-page-ctrl-nav pl-page-ctrl-nav-next">
					<button disabled={this.props.page === this.props.totalPageCount - 1} onClick={() => this.props.onPageChanged(this.props.page + 1)}>
						Next<i className="fa fa-angle-double-right"/>
					</button>
				</div>
			</div>
		);
	}
};