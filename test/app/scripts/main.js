/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash'
    }
});

require([
	'backbone',
	'views/app'	
	], function (Backbone, AppView) {
		'use strict';

		window.App = {
			Vent: _.extend({}, Backbone.Events)
		};



		new AppView();
	});