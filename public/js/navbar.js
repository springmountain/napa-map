/*
*	Navbar specific javascript
*/

$('.nav-wrapper ul li').click(function(e) {
	$(this).siblings().each(function(el) {
		$(this).removeClass('active');
	});
	$(this).addClass('active');
	console.log('nav button clicked');
});