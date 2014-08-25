define([
	'backbone'
	], function(Backbone) {
	var Slide = Backbone.View.extend({
		className: 'slide',

		render: function() {
			if ( this.model.get('image')) {
				this.renderImage();
			} else if (this.model.get('quote')){
				this.renderQuote();
			} else if (this.model.get('bullets')) {
				this.renderBullets();
			} else {
				this.renderHeading();
			}
			
			return this;
		},

		renderImage: function() {
			if (this.model.get('title')) {
				this.renderHeading();
			}

			this.$el
			.addClass('image')
			.append('<img src="' +  this.model.get('image') + '">');

			return this;
		},
		renderBullets: function() {
			if (this.model.get('title')) {
				this.renderHeading();
			}

			this.$el
			.addClass('bullets')
			.append([
				'<ul>',
				'<li>' + this.model.get('bullets').join('</li><li>'),
				'</ul>'

				].join(''));

			return this;
		},
		renderQuote: function() {
			if (this.model.get('title')) {
				this.renderHeading();
			}

			this.$el
			.addClass('quote')
			.append([
				'<figure>', 
				'<blockquote>', 
				this.model.get('quote'),
				'</blockquote>',
				'<figcaption>',
				'<cite>',
				this.model.get('cite'),
				'</cite>',
				'</figcaption>',
				'</figure>'
				].join(''));

			return this;
		},
		renderHeading: function() {
			this.$el.append(
				'<h1 class="' + this.model.get('size') + '">' + this.model.get('title') + '</h1>'
				);
			return this;
		}

	});

	return Slide;

});