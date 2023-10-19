console.log('JavaScript loaded');
document.addEventListener('DOMContentLoaded', function () {
    // Open or create the IndexedDB database
    var request = indexedDB.open('userBookings', 1);
    var db;

    request.onerror = function (event) {
        console.log('Error opening database');
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        // Display user bookings
        displayBookings();

        //add the event listeners
        setupEventListeners();
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create an object store to store user bookings
        var objectStore = db.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });

        // Define object store schema
        objectStore.createIndex('lounge', 'lounge', { unique: false });
        objectStore.createIndex('date', 'date', { unique: false });
        objectStore.createIndex('guests', 'guests', { unique: false });
		objectStore.createIndex('location', 'location', { unique: false });
    };

    // Function to setup event listeners
    function setupEventListeners() {
        var bookingForm = document.getElementById('booking-form');
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
			console.log('Form submitted');

            // Get form data
            var lounge = document.getElementById('lounge').value;
            var date = document.getElementById('date').value;
            var guests = document.getElementById('guests').value;
			var location = document.getElementById('location').value;

            // Create a booking object
            var booking = {
                lounge: lounge,
                date: date,
                guests: guests,
				location: location,
            };

            // Add the booking to IndexedDB
            addBooking(booking);
        });

        // Add event listener to delete button
        document.getElementById('booking-info').addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-button')) {
                var bookingId = Number(e.target.getAttribute('data-id'));
                deleteBooking(bookingId);
            }
        });
    }

    // Function to add a booking to IndexedDB
    function addBooking(booking) {
        const transaction = db.transaction(['bookings'], 'readwrite');
        const objectStore = transaction.objectStore('bookings');
        const request = objectStore.add(booking);

        request.onsuccess = function(event) {
            console.log('Booking added successfully');
            // After adding a booking, you can display all bookings again.
            displayBookings();
        };

        request.onerror = function(event) {
            console.error('Error adding booking:', event.target.error);
        };
    }

	// Function to display booking
	function displayBookings() {
		var transaction = db.transaction(['bookings'], 'readonly');
		var objectStore = transaction.objectStore('bookings');
		var bookingInfo = document.getElementById('booking-info');

		bookingInfo.innerHTML = ''; // Clear the existing content

		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				// Create a div to hold each booking entry
				var bookingEntry = document.createElement('div');
				bookingEntry.classList.add('booking-entry');

				// Create and style individual elements
				var orderInfo = document.createElement('p');
				orderInfo.textContent = 'Order: ' + cursor.key;
				orderInfo.classList.add('info');

				var loungeInfo = document.createElement('p');
				loungeInfo.textContent = 'Lounge: ' + cursor.value.lounge;
				loungeInfo.classList.add('info');

				var dateInfo = document.createElement('p');
				dateInfo.textContent = 'Date: ' + cursor.value.date;
				dateInfo.classList.add('info');

				var guestsInfo = document.createElement('p');
				guestsInfo.textContent = 'Number of Guests: ' + cursor.value.guests;
				guestsInfo.classList.add('info');
				
				var locationInfo = document.createElement('p');
				locationInfo.textContent = 'Location: ' + cursor.value.location; // Include location
				locationInfo.classList.add('info');

				var deleteButton = document.createElement('button');
				deleteButton.classList.add('delete-button');
				deleteButton.setAttribute('data-id', cursor.key);
				deleteButton.textContent = 'Delete';

				// Append elements to the booking entry div
				bookingEntry.appendChild(orderInfo);
				bookingEntry.appendChild(loungeInfo);
				bookingEntry.appendChild(dateInfo);
				bookingEntry.appendChild(guestsInfo);
				bookingEntry.appendChild(locationInfo);
				bookingEntry.appendChild(deleteButton);

				// Append the booking entry div to the bookingInfo section
				bookingInfo.appendChild(bookingEntry);

				cursor.continue();
			}
		};
	}


    // Function to delete a booking by its ID
    function deleteBooking(id) {
        var transaction = db.transaction(['bookings'], 'readwrite');
        var objectStore = transaction.objectStore('bookings');
        var request = objectStore.delete(id);

        request.onsuccess = function () {
            displayBookings(); // Update the displayed bookings
        };
    }
});
