// DELETE block
document
	.querySelector('.addPost')
	.addEventListener('click', function() {
		document
			.querySelector('.formAdd')
			.classList.toggle("hidden");
});

document
	.querySelector('.container')
	.addEventListener('click', function(event) {
		let action = event.target.getAttribute('class');
		if (action == 'delete') {
			let id = event.target.getAttribute('data-id');
			let url = 'delete/' + id;
			if(confirm('Delete this?')) {
				let httpRequest = new XMLHttpRequest();
				httpRequest.open('DELETE', url);
				httpRequest.send();					
				window.location.href = '/';			
			}	
		}
		if (action == 'edit') {

			// Собираю значения из выбранного блока
			let id = event.target.getAttribute('data-id');
			let origin = event.target.getAttribute('data-origin');
			let destination = event.target.getAttribute('data-destination');
			let duration = event.target.getAttribute('data-duration');
			// console.log(id, origin, destination, duration);
			document.querySelector('.formEdit').classList.toggle("hidden");
			// console.log(document.querySelector('.formEdit'));
			document.querySelector('#edit-form-id').value = id;
			document.querySelector('#edit-form-origin').value = origin;
			document.querySelector('#edit-form-destination').value = destination;
			document.querySelector('#edit-form-duration').value = duration;
		}
});

// document
// 	.querySelector('.container')
// 	.addEventListener('click', function(event) {
// 		let id = event.target.getAttribute('data-id');
// 		if (id) {
// 			let url = 'delete/' + id;
// 			if(confirm('Delete this?')) {
// 				let httpRequest = new XMLHttpRequest();
// 				httpRequest.open('DELETE', url);
// 				httpRequest.send();					
// 				window.location.href = '/';
// 			}
// 		}
// });