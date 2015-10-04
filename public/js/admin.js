/*
*
*	Admin only scripts
*
*/

window.onload = function() {
	console.log('admin.js loaded successfully');

	var grabTreasuryData = document.getElementById('grabTreasuryData');

	grabTreasuryData.addEventListener('click', function() {

		var treasuryReq = new XMLHttpRequest();
		treasuryReq.addEventListener('load', function() {
			console.log(this.responseText);
		});
		treasuryReq.open('PUT', '/update/treasury');
		treasuryReq.send();

	});

};