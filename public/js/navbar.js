/*
*	Navbar specific javascript
*/

$('.ajax-nav ul li a').click(function(e) {
	e.preventDefault();

	var url = $(this).attr('href');

	$.ajax({
		method: 'GET',
		url: url,
		data: { ajax: true }
	}).done(function(msg) {
		$("#view").html(msg);
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
});

/*
*	History Forward/Backward controller
*/

window.onpopstate = function(evt) {
	console.log('fired onpopstate');
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