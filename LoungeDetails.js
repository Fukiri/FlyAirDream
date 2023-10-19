
function updateLoungeDetails() {
    // Retrieve data passed from the main page
    var params = new URLSearchParams(location.search);
    var loungeName = params.get('loungeName'); 
    var place = params.get('location');
    var services = params.get('services');
    var availabilityToday = params.get('availabilityToday');
    var occupancy = params.get('occupancy');
    var nextAvailableSlot = params.get('nextAvailableSlot');

    // Update the content on the availability.html page
    document.getElementById('loungeName').textContent = loungeName;
    document.getElementById('location').textContent = place;
    document.getElementById('services').textContent = services;
    document.getElementById('availabilityToday').textContent = availabilityToday;
    document.getElementById('occupancy').textContent = occupancy;
    document.getElementById('nextAvailableSlot').textContent = nextAvailableSlot;
}

// Call the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateLoungeDetails);

// Add an event listener for the "Back" button
document.getElementById('back-button').addEventListener('click', function () {
    // Redirect back to the main page
    window.location.href = 'FlyAirDream.html';
});
