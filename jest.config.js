module.exports = {
	"automock": false,
	"collectCoverageFrom": [
		"app/component/*.{js,jsx}"
	],
	"coverageDirectory": "coverage",
	"setupFiles": ["./jest.setup.js"],
	"snapshotSerializers": ["enzyme-to-json/serializer"]
}