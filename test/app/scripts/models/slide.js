define(['backbone'], function(Backbone){
	var Slide = Backbone.Model.extend({
		default: {
			type: 'note',
			title: ''
		}

	});

	return Slide;
});

