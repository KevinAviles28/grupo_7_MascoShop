window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,/* cuantos slide a mostrar en el carrousel */
		slidesToScroll: 1,/* cantidad de slides que se desplazan */
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 575,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // nuevo point
			  breakpoint: 775,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
				// screens greater than >= 1024px
				breakpoint: 1024,
				settings: {
				  slidesToShow: 4,
				  slidesToScroll: 4
				}
			  }
		]
	});
});

window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista1'), {
		slidesToShow: 1,/* cuantos slide a mostrar en el carrousel */
		slidesToScroll: 1,/* cantidad de slides que se desplazan */
		arrows: {
			prev: '.anterior1',
			next: '.siguiente1'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 575,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // nuevo point
			  breakpoint: 775,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
				// screens greater than >= 1024px
				breakpoint: 1024,
				settings: {
				  slidesToShow: 4,
				  slidesToScroll: 4
				}
			  }
		]
	});
});