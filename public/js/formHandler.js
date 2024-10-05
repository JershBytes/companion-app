// public/js/formHandler.js

document.getElementById('companionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Capture the form data
    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries()); // Convert form data to an object

    try {
        // Send the form data to the backend
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObj), // Send the form data as JSON
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Form successfully submitted:', result);
        } else {
            console.error('Error submitting form');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
