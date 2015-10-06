/*
*
*	Admin only scripts
*
*/

$(document).ready(function() {
	console.log('admin.js loaded successfully');

	$('#adminBtn').click(function(e) {
		$.ajax({
			method: 'GET',
			url: '/admin',
			data: { ajax: true }
		}).done(function (msg) {
			$("#view").html(msg);
		});
	});

	$('#mapBtn').click(function(e) {
		$.ajax({
			method: 'GET',
			url: '/map'
		}).done(function(msg) {
			$('#view').html(msg).promise().done(function() {
				$('html').removeClass('admin');
				mapLoad();
			});
		});
	});

	$('#databaseBtn').click(function(e) {
		$.ajax({
			method: 'GET',
			url: '/admin/database',
			data: { ajax: true }
		}).done(function (msg) {
			$('#view').html(msg);
		});
	});

	// var grabTreasuryData = document.getElementById('grabTreasuryData');

	// grabTreasuryData.addEventListener('click', function() {

	// 	var treasuryReq = new XMLHttpRequest();
	// 	treasuryReq.addEventListener('load', function() {
	// 		console.log(this.responseText);
	// 	});
	// 	treasuryReq.open('PUT', '/update/treasury');
	// 	treasuryReq.send();

	// });

	// var recreateTables = document.getElementById('recreateTables');

	// recreateTables.addEventListener('click', function() {
	// 	var recreateReq = new XMLHttpRequest();
	// 	recreateReq.addEventListener('load', function() {
	// 		console.log(this.responseText);
	// 	});
	// 	recreateReq.open('PUT', '/update/recreate');
	// 	recreateReq.send();
	// });
});