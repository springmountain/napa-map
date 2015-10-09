/*
*	Navbar specific javascript
*/

$('.ajax-nav ul li a').click(function(e) {
	if (!$(this).hasClass('disabled')) {
		e.preventDefault();

		//Start loading screen
		$(".preloader-wrapper-wrap").removeClass("hide");

		var url = $(this).attr('href');

		$.ajax({
			method: 'GET',
			url: url,
			data: { ajax: true }
		}).done(function(msg) {
			$("#view").html(msg);
			$(".preloader-wrapper-wrap").addClass("hide");
		});

		window.history.pushState({
			method: 'GET',
			url: url,
			data: {
				ajax: 'true'
			}
		}, null, url);

		$(this).siblings().each(function(el) {
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	}
});

$('.button-collapse').sideNav({
	closeOnClick: true
});

/*
*	History Forward/Backward controller
*/

window.onpopstate = function(evt) {
	console.log('fired onpopstate');
	if (evt.state) {
		if (evt.state.url) {
			$.ajax({
				method: evt.state.method,
				url: evt.state.url,
				data: evt.state.data
			}).done(function(msg) {
				$('#view').html(msg);
			});
		}
	}
};