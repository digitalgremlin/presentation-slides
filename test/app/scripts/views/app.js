define([
	'backbone',
	'views/slides',
	'collections/slides',
	'router'
	], function(Backbone, SlidesView, SlidesCollection, MainRouter) {
		var AppView = Backbone.View.extend({
			el: 'body',

			initialize: function() {
				var testCollection = [
					{ title: 'My First Slide' },
					{ title: 'My Second Slide' },
					{ title: 'My Third Slide' }
				];
				new SlidesView({
					collection: new SlidesCollection(testCollection)
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