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