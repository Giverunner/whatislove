document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    // Create an object to send to Google Apps Script
    const data = {
        name: name,
        review: review
    };

    // Send the data to the Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbzGUhTkx3oa0K_xbN821AZhVx5XusTXlQ2TlfZlc_E5Nam4bUP85thkVEfEeSXdMtDM/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Optionally, add the review to the page or alert success
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `<h3>${name}</h3><p>${review}</p>`;
            document.getElementById('reviews').appendChild(reviewItem);

            // Clear the form
            document.getElementById('reviewForm').reset();
        } else {
            alert('There was a problem with the request.');
        }
    })
    .catch(error => console.error('Error:', error));
});
