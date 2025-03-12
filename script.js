// Optional: Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', this.getAttribute('href'));
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50, // Adjust offset as needed
            behavior: 'smooth'
          });
        }
        links.forEach(link => {
          link.classList.remove('active');
        })
        this.classList.add('active');
      });
      if(link.href === window.location.href){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    const contactBtn = document.getElementById('contactBtn');
    const modal = document.getElementById('contactModal');
    const closeBtn = modal.querySelector('.close');
  
    // Open modal on contact button click
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
  
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal if clicking outside the modal-content
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    const toggleButton = document.querySelector(".toggle-button");
      const navLinks = document.querySelector(".nav-links");

      toggleButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        toggleButton.classList.toggle("active");
      });
  });
  