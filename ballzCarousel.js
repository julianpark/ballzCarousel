/*
ballzCarousel
by Julian Park
A simple jQuery carousel plug-in that allows you to specify the HTML elements to be used in the carousel.

Usage:
$('#carousel-container').ballzCarousel({ // default options
	numItemShift: 3, // int
	speed: 400, // int
	easing: 'swing', // string
});

Markup Structure:
<div id="carousel-container"> // whatever tag that is initialized with plugin
	<div class="carousel"> // any tag with "carousel" class
	<button class="prev"></button> // any tag with "prev" and "next" class
	<div class="item-container"> // any tag with "item-container" class
		<div></div> // can be any tag
	</div>
	<button class="next"></button>
	</div>
</div>

UPDATES
-------
March 5, 2014:
-converted to jQuery plug-in
-switched button toggling to add "disabled" class instead of hiding/showing. the user can determine whether to hide or style the disabled buttons

February 2, 2014:
-fixed a bug where if the number of items was exactly 1 above the limit, it would shift incorrectly
*/

$.fn.ballzCarousel = function(options) {
	var defaults = {
		numItemShift: 3,
		speed: 400,
		easing: 'swing'
	};
	var settings = $.extend({}, defaults, options); // merge user specified options with defaults
	var overallContainer = $(this).find('.carousel');
	var itemContainer = $(this).find('.item-container');
	var prevButton = $(this).find('.prev');
	var nextButton = $(this).find('.next');

	prevButton.addClass('disabled');
	nextButton.addClass('disabled');
	var items = itemContainer.children();
	var itemWidth = items.outerWidth(true);
	var numItems = items.length;
	var itemsTotalWidth = 0;
	var posShift = itemWidth * settings.numItemShift;

	itemContainer.width(numItems * itemWidth); // size the itemContainer width to contain items
	var itemHeight = items.outerHeight(true);
	overallContainer.height(itemHeight);

	if(itemContainer.width() >= overallContainer.width()) { nextButton.removeClass('disabled'); } // if there are more items than are showing, show the next button
	var numItemsStart = settings.numItemShift;

	var i = numItemsStart; // item position count
	nextButton.click(function (e) {
		e.preventDefault();
		if(!itemContainer.is(':animated') && !$(this).hasClass('disabled')) {
			var currentPos = itemContainer.position().left; // 0
			i += settings.numItemShift;
			if(i >= numItems) {
				var remainder = settings.numItemShift - (i - numItems);
				if(remainder == 0) { remainder = 1; }
				var newPos = currentPos - (itemWidth * remainder); // if there are less than numItemShift on the last shift, just move over the necessary amount
			} else {
				var newPos = currentPos - posShift;
			}
			if(Math.abs(newPos) >= itemContainer.width() - posShift) { nextButton.addClass('disabled'); } // hide the next button
			if(Math.abs(newPos) >= itemWidth) { prevButton.removeClass('disabled'); } // show the previous button
			itemContainer.stop().animate({ left: newPos + 'px' }, settings.speed, settings.easing);
		}

		return false;
	});
	prevButton.click(function (e) {
		e.preventDefault();
		if(!itemContainer.is(':animated') && !$(this).hasClass('disabled')) {
			var currentPos = itemContainer.position().left;
			i -= settings.numItemShift;
			if(i < settings.numItemShift * 2) {
				var newPos = 0; // if there are less than numItemShift on the last shift, just move back to original position
			} else {
				var newPos = currentPos + posShift;
			}
			if(newPos < itemContainer.width() - posShift) { nextButton.removeClass('disabled'); }
			if(newPos >= 0) { prevButton.addClass('disabled'); }
			itemContainer.stop().animate({ left: newPos + 'px' }, settings.speed, settings.easing);
		}

		return false;
	});
}