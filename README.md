blendCarousel
=============

A simple jQuery carousel plug-in that allows you to specify the HTML elements to be used in the carousel.

Usage:
```
$('#carousel-container').ballzCarousel({ // default options
	numItemShift: 3, // int
	speed: 400, // int
	easing: 'swing', // string
});
```

Markup Structure:
```
div id="carousel-container" // whatever tag that is initialized with plugin
	div class="carousel" // any tag with "carousel" class
	button class="prev" // any tag with "prev" and "next" class
	div class="item-container" // any tag with "item-container" class
		div // can be any tag
	/div
	button class="next"
	/div
/div
```