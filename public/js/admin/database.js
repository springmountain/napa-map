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

$('#mergeCompaniesWineries').click(function(e) {
	$.ajax({
		method: 'PUT',
		url: '/update/merge'
	}).done(function(msg) {
		$('#view').html(msg.toString());
	});
});

$('#geojsonGetWineries').click(function(e) {
	$.ajax({
		method: 'GET',
		url: '/geojson/wineries'
	}).done(function(msg) {
		console.log(msg);
	});
});