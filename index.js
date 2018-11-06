'use strict';

const RuleEngine = require("./lib/node-rules");
const R = new RuleEngine();

// Register rules
// TODO
// - ensure all files in rules forlder return valid objects
var requireDir = require('require-dir');
var dir = requireDir('./rules');
Object.keys(dir).forEach((key) => {
		dir[key].rules.map((rule) => {
			console.log(`registering rule ${rule.name}`);
			R.register(rule);
		});
});

// TODO - can introduce transformation errors here
// TODO - try direct CSV import
const csvToJson = require('convert-csv-to-json');
const facts = [];
csvToJson
	.fieldDelimiter(',')
	.getJsonFromCsv('./data/RecallsFile.csv')
	.map((row) => {
		facts.push(row);
	});
// console.log(`Facts map built: ${facts.length} facts on radar`);

facts.map((fact) => {
	R.execute(fact, (data) => {
		if (!data.result) {
			console.log(`FAIL: ${data.recall} - ${data.reason}`);
		}
	});
});
