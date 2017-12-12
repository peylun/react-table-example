import React from 'react';
import SortableTable from './component/SortableTable.jsx';
import columnDefs from './column-definition.js';

export default class App extends React.Component {
	render() {
		return (
			<SortableTable 
				url="/data"
				sizeUrl="/dataSize"
				columnDefs={columnDefs} 
				initialSort={{
					column: 'username',
					direction: 'asc'
				}}
			/>
		);
	}
};