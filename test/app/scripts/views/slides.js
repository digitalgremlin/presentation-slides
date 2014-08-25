define([
	'backbone',
	'views/slide'
	], function(Backbone, SlideView) {
	var Slides = Backbone.View.extend({
		el: $('.slides'),

		initialize: function() {
			this.currentSlideIndex = 1;
			this.numSlides = this.collection.length;
			this.transitionSpeed = 800;
			this.renderAll();

			App.Vent.on('init', this.hideAllButFirst, this);
			App.Vent.on('changeSlide', this.changeSlide, this);
		},
		hideAllButFirst: function() {
			this.$el.children(':nth-child(n+2)').hide();			
		},
		changeSlide: function(options) {
			var newSlide,
			self = this,
			slides = this.$el.children();

			this.setCurrentSlideIndex(options);

			newSlide = this.getNextSlide(slides);
			//newSlide = slides.eq(this.currentSlideIndex - 1);
			this.animateToNewSlide(newSlide, slides, self);

			App.Router.navigate( '/slides/' + this.currentSlideIndex)
		},

		setCurrentSlideIndex: function(options) {			
			//if requesting a special slide
			//then set current index
			if ( options.slideIndex ) {
				return this.currentSlideIndex = ~~options.slideIndex
			} 
				//Otherwise, just grab the next or prev slide			
			this.currentSlideIndex += options.direction === 'next' ? 1 : -1;

			if ( this.currentSlideIndex > this.numSlides) {
				// Go back to slide number 1
				this.currentSlideIndex = 1;
			}

			if ( this.currentSlideIndex <= 0 ) {
				this.currentSlideIndex = this.numSlides;
			}
			
		},

		getNextSlide: function(slides) {
			return slides.eq(this.currentSlideIndex - 1);
		},
		animateToNewSlide: function(newSlide, slides, self) {
			// transition to the slide spcified
			slides.filter(':visible')			
			.animate({
				top: '100%',
				opacity: 'hide'
			}, self.transitionSpeed, function() {
				//slide is gone...next
				$(this).css('top', 0);
				// bring new slide into view
				newSlide
				.css({				
				top: '-100%'
				}) //Temporary
				.animate({
					top: 0,
					opacity: 'show'
				}, self.transitionSpeed);
			});
		},

		renderAll: function() {
			this.$el.empty();
			this.collection.each(this.render, this);
			return this;
		},
		render: function(slide) {
			var slideView = new SlideView({ model: slide });
			this.$el.append(slideView.render().el );
			return this;
		}

	});

	return Slides;

});