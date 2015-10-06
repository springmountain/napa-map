/*
*	Navbar specific javascript
*/

$('.nav-wrapper ul li').click(function(e) {
	var url = $(this).children('a').data('url');

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
	console.log('nav button clicked');
});

/*
*	History Forward/Backward controller
*/

window.onpopstate = function(evt) {
	if (evt.state.url) {
		$.ajax({
			method: evt.state.method,
			url: evt.state.url,
			data: evt.state.data
		}).done(function(msg) {
			$('#view').html(msg);
		});
	}
};