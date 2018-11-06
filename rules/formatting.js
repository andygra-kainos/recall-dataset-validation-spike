'use strict';

const moment = require('moment');

module.exports = {
  rules: [

	{
		"name": 'Formatting - launch date - 3 part composition check',
		"condition": function(R) {
			const tokens = this.LaunchDate.split('/');
			R.when(tokens.length != 3);
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Launch date should have 3 component parts (MM/DD/YYYY)'
			R.stop();
		}
	},

	{
		"name": 'Formatting - launch date - date format',
		"condition": function(R) {
			R.when( ! moment(this.LaunchDate, 'DD/MM/YYYY', true).isValid() );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Launch date format (${this.LaunchDate})is invalid`
			R.stop();
		}
	},

	// Recalls number format
	// - mandatory 3 part composition
	// 	- product group					(enumeration)
	// 	- recall year						(all digits)
	// 	- recall index for year	(all digits with leading zeros)
	{
		"name": 'Formatting - recalls number - 3 part composition check',
		"condition": function(R) {
			const tokens = this.RecallsNumber.split('/');
			R.when( tokens.length != 3);
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Recalls number should have 3 component parts'
			R.stop();
		}
	},

	// Recalls number format
	// - product group must be a member of the product group enumeration set
	{
		"name": 'Formatting - recalls number - product group enumeration check',
		"condition": function(R) {
			const product_groups = [
				'R', 'RCT', 'RM', 'RPC', 'RPT', 'RSPV',
				'RCOMP', 'RTW'
			];
			const tokens = this.RecallsNumber.split('/');
			R.when( product_groups.indexOf(tokens[0]) == -1 );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Recalls number product group enumeration is invalid`
			R.stop();
		}
	},

	// Recall number format
	// - recall year must be an integer
	// - recall year must be YYYY formatted
	// - recall year must be within constrained range
	// - recall year must not be in the future
	{
		"name": 'Formatting - recall number format check - year',
		"condition": function(R) {
			const tokens = this.RecallsNumber.split('/');
			R.when( tokens[1].length != 4 );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Recalls number year expected to be YYYY`
			R.stop();
		}
	},
  ]};
