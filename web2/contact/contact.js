document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  
  // Form validation
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      clearErrors();
      
      // Validate form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      // Name validation
      if (name.value.trim() === '') {
          showError('name-error', 'Name is required');
          isValid = false;
      }
      
      // Email validation
      if (email.value.trim() === '') {
          showError('email-error', 'Email is required');
          isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
          showError('email-error', 'Please enter a valid email');
          isValid = false;
      }
      
      // Subject validation
      if (subject.value.trim() === '') {
          showError('subject-error', 'Subject is required');
          isValid = false;
      }
      
      // Message validation
      if (message.value.trim() === '') {
          showError('message-error', 'Message is required');
          isValid = false;
      } else if (message.value.trim().length < 10) {
          showError('message-error', 'Message should be at least 10 characters');
          isValid = false;
      }
      
      // If form is valid, submit it
      if (isValid) {
          submitForm({
              name: name.value.trim(),
              email: email.value.trim(),
              subject: subject.value.trim(),
              message: message.value.trim()
          });
      }
  });
  
  // Helper function to show error messages
  function showError(id, message) {
      const errorElement = document.getElementById(id);
      errorElement.textContent = message;
  }
  
  // Helper function to clear all error messages
  function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(element => {
          element.textContent = '';
      });
  }
  
  // Email validation helper function
  function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
  
  // Form submission function
  function submitForm(formData) {
      // In a real application, you would send this data to a server
      // For demonstration, we'll simulate a successful submission
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
          submitBtn.disabled = false;
          
          // Show success message
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          formStatus.className = 'form-status success';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
              formStatus.style.display = 'none';
          }, 5000);
      }, 1500);
      
      // In a real application, you would use fetch or axios to send the data:
      /*
      fetch('your-api-endpoint', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
          // Handle success
          contactForm.reset();
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          formStatus.className = 'form-status success';
          submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
          submitBtn.disabled = false;
      })
      .catch(error => {
          // Handle error
          formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
          formStatus.className = 'form-status error';
          submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
          submitBtn.disabled = false;
          console.error('Error:', error);
      });
      */
  }
  
  // Add animation to form elements when they come into view
  const formGroups = document.querySelectorAll('.form-group');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }, index * 100);
          }
      });
  }, { threshold: 0.1 });
  
  formGroups.forEach((group, index) => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(20px)';
      group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      group.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(group);
  });
});