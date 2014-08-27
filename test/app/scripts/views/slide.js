define([
	'backbone',
	'google-code-prettify'
	], function(Backbone) {
	var Slide = Backbone.View.extend({
		className: 'slide',

		render: function() {
			var type = this.getContentType();
			
			this['render' + type]();
			return this;
		},

		getContentType: function() {
			if ( this.model.get('image')) {
				return 'Image';				
			} else if (this.model.get('snippet')){
				return 'Snippet';				
			} else if (this.model.get('quote')){
				return 'Quote';				
			} else if (this.model.get('bullets')) {
				return 'Bullets';				
			} else {
				return 'Heading';				
			}
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

		renderSnippet: function() {
			var self = this,
			 snippet = this.model.get('snippet');
			if (this.model.get('title')) {
				this.renderHeading();
			}
			if ($.isPlainObject(snippet)) {				
				return _.each(snippet, function(snippetPath, heading) {					
					self.setSnippet(snippetPath, heading);
				});
			} 
				self.setSnippet(snippet);
					
		},

		setSnippet: function(snippetPath, heading) {			
			var self = this;			
			$.get(snippetPath, function(snippet){				
				self.$el
				.addClass('snippet')
				.append('<pre class="prettyprint">' + _.escape(snippet)+ '</pre>');
				prettyPrint();

			}).done(function(snippet) {
				//console.log('callback', _.escape(snippet));
				if (heading) { 
				self.renderSnippetHeading(heading); 
			}
			});
			
		},

		renderSnippetHeading: function(heading) {
			this.$el
			.children('pre')
			.last()
			.before(
				'<h3 class="' + this.model.get('size') + '">' + heading + '</h3>'
				);
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