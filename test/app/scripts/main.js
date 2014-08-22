/*global require*/
'use strict';

require.config({
    shim: {

    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        'requirejs-text': '../bower_components/requirejs-text/text',
        requirejs: '../bower_components/requirejs/require',
        modernizr: '../bower_components/modernizr/modernizr',
        lodash: '../bower_components/lodash/dist/lodash.compat',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
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