$(document).ready(function () {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (isLoggedIn) {
      // Redirect to the dashboard if logged in
      window.location.href = 'index.html';
    }
  
    // Event listener for registration form submission
    $('#registerForm').submit(function (event) {
      event.preventDefault();
  
      const firstName = $('#firstName').val();
      const surname = $('#surname').val();
      const email = $('#email').val();
      const idNumber = $('#idNumber').val();
      const phoneNumber = $('#phoneNumber').val();
      const county = $('#county').val();
      const constituency = $('#constituency').val();
      const gender = $('#gender').val();
      const nextOfKin = $('#nextOfKin').val();
      const nextOfKinPhoneNumber = $('#nextOfKinPhoneNumber').val();
      const password = $('#password').val();
      const confirmPassword = $('#confirmPassword').val();
  
      // Additional validation (e.g., password match)
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please check and try again.');
        return;
      }
  
      // Send registration request to the server
      $.post('/register', {
        firstName,
        surname,
        email,
        idNumber,
        phoneNumber,
        county,
        constituency,
        gender,
        nextOfKin,
        nextOfKinPhoneNumber,
        password,
      })
        .done(function (data) {
          alert('Registration successful. You can now log in.');
          // Redirect to the login page after successful registration
          window.location.href = 'login.html';
        })
        .fail(function (error) {
          console.error(error.responseText);
          alert('Registration failed. Please try again.');
        });
    });
  });
  