/*
*	Admin Database Page Scripts
*/

$('#recreateTables').click(function(e) {
	$.ajax({
		method: 'PUT',
		url: '/update/recreate'
	}).done(function(msg) {
		$('#view').html(msg.toString());
	});
});

$('#recreateCompanies').click(function(e) {
	$.ajax({
		method: 'PUT',
		url: '/update/companies'
	}).done(function(msg) {
		$('#view').html();
	});
});

$('#mergeCompaniesWineries').click(function(e) {
	$(".preloader-wrapper-wrap").removeClass("hide");
	$.ajax({
		method: 'PUT',
		url: '/update/merge'
	}).done(function(msg) {
		$(".preloader-wrapper-wrap").addClass("hide");
		$('#view').html(msg);
	});
});

$('#geojsonGetWineries').click(function(e) {
	$.ajax({
		method: 'GET',
		url: '/wineries/geojson'
	}).done(function(msg) {
		$('#view').html(msg.toString());
	});
});