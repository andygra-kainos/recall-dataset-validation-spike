'use strict';

module.exports = {
  rules: [

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
