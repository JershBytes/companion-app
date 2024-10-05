// JavaScript for Tab Functionality
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));

    // Add active class to the clicked tab and corresponding section
    tab.classList.add('active');
    document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
  });
});

document.getElementById('submit-button').addEventListener('click', async () => {
  const formData = {
    fullname: document.getElementById('fullname').value,
    age: document.getElementById('age').value,
    email: document.getElementById('email').value,
    hobbies: document.getElementById('hobbies').value,
    favfood: document.getElementById('favfood').value,
    question1: document.getElementById('question1').value,
    question2: document.getElementById('question2').value,
    question3: document.getElementById('question3').value,
    question4: document.getElementById('question4').value,
    question5: document.getElementById('question5').value,
    question6: document.getElementById('question6').value,
    hrq1: document.getElementById('hrq1').value,
    hrq2: document.getElementById('hrq2').value,
    hrq3: document.getElementById('hrq3').value,
    hrq4: document.getElementById('hrq4').value,
    hrq5: document.getElementById('hrq5').value,
    hrq6: document.getElementById('hrq6').value,
    hrq7: document.getElementById('hrq7').value,
    hrq8: document.getElementById('hrq8').value,
    hrq9: document.getElementById('hrq9').value,
  };

  try {
    const response = await axios.post('/notify', formData);
    console.log('Notification sent:', response.data);
    alert('Your responses have been submitted successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
    alert('There was an error submitting your responses.');
  }
});
