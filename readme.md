# React Table Example

## Implementation

The reusable table component (`app/component/SortableTable.jsx`) is built using React.

UI:
* table is sortable by clicking on the header cell, in the order 'asc' -> 'desc' -> 'unsorted' (this cancels any existing sorting).
* page and page size can be changed by updating the page input / page size dropdown, or by clicking on the previous / next buttons in the pagination control above or below the table.
* added `abortcontroller-polyfill` dependency to allow aborting of fetch call for browsers that have yet to added the support.
* built using Webpack.
* to build: `npm run build`.
* to run dev (watches and rebuilds code): `npm run dev`.

Server:
* route `/data?start=0&limit=10&sort=username&sortDirection=asc` will return an array of object in JSON format, paginated and sorted accordingly to the query parameters (optional).
* added route `/dataSize` that returns total data count for the purpose of pagination.
* data is stored in `routes/index.js` with 2k rows.

For both:
* *jslint* errors are checked using eslint.
* to run eslint: `npm run eslint`.
* unit test is written and run using Jest library in `tests` folder.
* to run test: `npm test`.
* to run coverage: `npm run coverage`.

### Possible future improvements
* More options to make the table more configurable
* Infinite scrolling