'use strict';

const moment = require('moment');

module.exports = {
  rules: [

	// Launch date
	// - mandatory
	{
		"name": 'Generic - check for missing launch date',
		"condition": function(R) {
			R.when( ! this.RecallsNumber );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Launch date attribute missing`
			R.stop();
		}
	},

	// Recalls number
	// -mandatory
	{
		"name": 'Generic - check for missing recall number',
		"condition": function(R) {
			R.when( ! this.RecallsNumber );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Recalls number attribute missing'
			R.stop();
		}
	},

	// Make
	// - mandatory
	{
		"name": 'Generic - check for missinng vehicle make',
		"condition": function(R) {
			R.when( ! this.Make );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Vehicle make attribute missing'
			R.stop();
		}
	},

	// Model
	// - appears sparse
	// TODO
	// - understand the rules governing omission else dirty data
	{
		"name": 'Generic - check for missinng vehicle model',
		"condition": function(R) {
			R.when( ! this.Model );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Vehicle model attribute missing for ${this.Make}`
			R.stop();
		}
	},

	// Recall concern summary
	// - mandatory
	{
		"name": 'Generic - check for missing recall concern summary',
		"condition": function(R) {
			R.when( ! this.Concern );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Recall concern summary missing'
			R.stop();
		}
	},
	
	// Recall defect description
	// - mandatory
	{
		"name": 'Generic - check for missing recall defect description',
		"condition": function(R) {
			R.when( ! this.Defect );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Recall defect description missing'
			R.stop();
		}
	},
	
	// Recall remedy
	// - mandatory
	{
		"name": 'Generic - check for missing recall remedy description',
		"condition": function(R) {
			R.when( ! this.Remedy );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = 'Recall remedy description missing'
			R.stop();
		}
	}	
]};
