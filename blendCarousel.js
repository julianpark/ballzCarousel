/*
blendCarousel
by Julian Park
A simple jQuery carousel plug-in that allows you to specify the HTML elements to be used in the carousel.
*/

$.fn.blendCarousel = function(options) {
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
	// make sure to get the largest width (if for instance the first item is a diff width than the majority)
	var itemWidth = 0;
	items.each(function(){
		w = $(this).outerWidth(true);      
		if ( w > itemWidth)
		itemWidth = w;
	});
	var numItems = items.length;
	var itemsTotalWidth = 0;
	var posShift = itemWidth * settings.numItemShift;

	itemContainer.width(numItems * itemWidth); // size the itemContainer width to contain items
	var itemHeight = items.outerHeight(true);
	overallContainer.height(itemHeight);
	// shift the itemContainer if there are fewer than the minimum number of items to shift
	if(numItems < settings.numItemShift) {
		var marginLeft = ((settings.numItemShift - numItems) * itemWidth) / 2;
		itemContainer.css('margin-left', marginLeft + 'px');
	}

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
			markIndicator(newPos);
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
			markIndicator(newPos);
			if(newPos < itemContainer.width() - posShift) { nextButton.removeClass('disabled'); }
			if(newPos >= 0) { prevButton.addClass('disabled'); }
			itemContainer.stop().animate({ left: newPos + 'px' }, settings.speed, settings.easing);
		}

		return false;
	});

	$('.carousel-indicators li').click(function(e) {
		e.preventDefault();

		var thisLi = $(this);

		if(!itemContainer.is(':animated') && !thisLi.hasClass('active')) {
			var currentPos = itemContainer.position().left;
			var thisNum = thisLi.index();
			itemContainer.stop().animate({ left: '-' + (itemWidth * thisNum) + 'px' }, settings.speed, settings.easing, function() {
					$('.carousel-indicators li').removeClass('active');
					thisLi.addClass('active');
				}
			);
		}

		return false;
	});

	function markIndicator(newPos) {
		// mark the corresponding indicator
		$('.carousel-indicators li').removeClass('active');
		var itemIndex = Math.abs(newPos / itemWidth);
		var thisLi = $('.carousel-indicators li').eq(itemIndex);
		thisLi.addClass('active');
	}
}
