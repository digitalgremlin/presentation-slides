define([
	'backbone',
	'views/slides',
	'collections/slides',
	'router',
	'slides'
	], function(Backbone, SlidesView, SlidesCollection, MainRouter, slidesContainer) {
		var AppView = Backbone.View.extend({
			el: 'body',

			initialize: function() {				
				new SlidesView({
					collection: new SlidesCollection(window.slides)
				})
				App.Router = new MainRouter();
				Backbone.history.start();
			},
			events: {
				'keyup': 'keyUp'
			},

			keyUp: function(e) {
				// 37 = left
				// 39 = right
				if (e.keyCode === 37 || e.keyCode === 39) {
					App.Vent.trigger('changeSlide', {
						direction: e.keyCode === 39 ? 'next' : 'prev'
					});
				}
			}

		});

		return AppView;
	});