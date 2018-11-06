'use strict';

const moment = require('moment');
const Filter = require('bad-words');
const filter = new Filter();

// Relax bad words filter to allow words in context
const allow = [
	'balls',
	'butt',			// reference to butt welded joints
	'cock',
	'fag',
	'flange',
	'knob',
	'nipple',
	'orifice',
	'prick',		// reference to pin-pricks
	'screw'
];
filter.removeWords(...allow);

module.exports = {
  rules: [

	{
		"name": 'Bad words - recall launch date check',
		"condition": function(R) {
			R.when( filter.isProfane(this.LaunchDate) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in launch date ${filter.clean(this.LaunchDate)}, was ${this.LaunchDate}`;
			R.stop();
		}
	},

	{
		"name": 'Bad words - recalls number check',
		"condition": function(R) {
			R.when( filter.isProfane(this.RecallsNumber) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in recalls number ${filter.clean(this.RecallsNumber)}, was ${this.RecallsNumber}`;
			R.stop();
		}
	},

	{
		"name": 'Bad words - vehicle make check',
		"condition": function(R) {
			R.when( filter.isProfane(this.Make) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in vehicle make ${filter.clean(this.Make)}, was ${this.Make}`;
			R.stop();
		}
	},

	{
		"name": 'Bad words - vehicle model check',
		"condition": function(R) {
			R.when( filter.isProfane(this.Model) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in vehicle model ${filter.clean(this.Model)}, was ${this.Model}`;
			R.stop();
		}
	},

	{
		"name": 'Bad words - recall concern check',
		"condition": function(R) {
			R.when( filter.isProfane(this.Concern) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in recall concern summary ${filter.clean(this.Concern)}, was ${this.Concern}`;
			R.stop();
		}
	},

	{
		"name": 'Bad words - recall defect description',
		"condition": function(R) {
			R.when( filter.isProfane(this.Defect) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in recall defect description ${filter.clean(this.Defect)}, was ${this.Defect}`
			R.stop();
		}
	},

	{
		"name": 'Bad words - recall remedy description',
		"condition": function(R) {
			R.when( filter.isProfane(this.Remedy) );
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Bad words found in recall remedy description ${filter.clean(this.Remedy)}, was ${this.Remedy}`;
			R.stop();
		}
	},

	// Specific rules
	// ------------------------------------------------------------------------

	// Vehicle make
	// - Auto-trail is known to have 2 make formats, trailing space variant is invalid
	{
		"name": 'Auto-Trail - trailing whitespace in vehicle make',
		"condition": function(R) {
			R.when(this.Make && this.Make == "AUTO-TRAIL ");
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Vehicle make (${this.Make}) has trailing white space in vehicle make attribute`;
			R.stop();
		}
	},
	
	// Vehicle model
	// - Triumph is known to have a missing model instance
	{
		"name": 'Triumph - model missing',
		"condition": function(R) {
			R.when(
				this.Make == "TRIUMPH" &&
				! this.Model
			);
		},
		"consequence": function(R) {
			this.result = false;
			this.recall = this.RecallsNumber;
			this.reason = `Vehicle make (${this.Make}) has missing model attribute value`;
			R.stop();
		}
	}]
};
