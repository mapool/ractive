define([
	'utils/matches'
], function (
	matches
) {

	'use strict';

	return function ( selector ) {
		var queryResult;

		if ( matches( this.node, selector ) ) {
			return this.node;
		}

		if ( this.fragment && this.fragment.find ) {
			return this.fragment.find( selector );
		}
	};

});
