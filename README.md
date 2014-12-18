# blendCarousel

A simple jQuery carousel plug-in that allows you to specify the HTML elements to be used in the carousel.

## Usage
```
$('#carousel-container').blendCarousel({ // default options
	numItemShift: 3, // int
	speed: 400, // int
	easing: 'swing', // string
});
```

## Markup Structure
```
<div id="carousel-container"> // whatever tag that is initialized with plugin
	<button class="prev"></button> // any tag with "prev" and "next" class
	<div class="carousel"> // any tag with "carousel" class
		<div class="item-container"> // any tag with "item-container" class
			<div></div> // can be any tag
		</div>
	</div>
	<button class="next"></button>
</div>
```

## Styles
```
#carousel-container {
	position: relative;
}
.carousel {
	position: relative;
	overflow: hidden;
}
.item-container {
	position: absolute;
}
```

## Updates
December 18, 2014:
* added carousel indicators

July 18, 2014:
* added the test to make sure the itemContainer shifts when there are fewer than the minimum number of items to shift
* added improvement on itemWidth calculate - now grabs the largest width (if items are not uniform size)

March 5, 2014:
* converted to jQuery plug-in
* switched button toggling to add "disabled" class instead of hiding/showing. the user can determine whether to hide or style the disabled buttons

February 2, 2014:
* fixed a bug where if the number of items was exactly 1 above the limit, it would shift incorrectly