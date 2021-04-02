window.addEventListener('load', function(){
	new Glider(document.querySelector('.glider'), {
	  slidesToShow: 1,/* numero de diapositivas que se veran */
	  slidesToScroll: 1,/* numero de diapositivas que se desplazaran, auto toma el mismo valor que slideToShow */
	  arrows: {/* controlador de flechas, valores prev && next */
		prev: '.glider-prev',
		next: '.glider-next'
	  },
	  responsive: [/* array de objetos donde declaramos breackpoints,settings */
		{
		  // vista >= 575px
		  breakpoint: 575,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},{
		  // vista >= 775px
		  breakpoint: 775,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3
		  }
		},
		{
		  // vista >= 1024px
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 4,
			slidesToScroll: 4
		  }
		}
	  ]
	})
  })
  
  window.addEventListener('load', function(){
	new Glider(document.querySelector('.glider1'), {
	  slidesToShow: 1,/* numero de diapositivas que se veran */
	  slidesToScroll: 1,/* numero de diapositivas que se desplazaran, auto toma el mismo valor que slideToShow */
	  arrows: {/* controlador de flechas, valores prev && next */
		prev: '.prev1',
		next: '.next1'
	  },
	  responsive: [/* array de objetos donde declaramos breackpoints,settings */
		{
		  // vista >= 575px
		  breakpoint: 575,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},{
		  // vista >= 775px
		  breakpoint: 775,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3
		  }
		},
		{
		  // vista >= 1024px
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 4,
			slidesToScroll: 4
		  }
		}
	  ]
	})
  })