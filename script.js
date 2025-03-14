document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section"); // Adjust selector if needed

  // Function to handle scroll-based active link switching
  function updateActiveLinkOnScroll() {
    let scrollPosition = window.scrollY + 160; // Adjust offset as needed

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        links.forEach((link) => link.classList.remove("active"));
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
    const toggleButton = document.querySelector(".toggle-button");
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.remove("active");
    toggleButton.classList.remove("active");
  }

  // Smooth scrolling for navigation links
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      history.pushState(null, "", this.getAttribute("href"));
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50, // Adjust offset as needed
          behavior: "smooth",
        });
      }
    });
  });

  // Listen for scroll events
  window.addEventListener("scroll", updateActiveLinkOnScroll);
  updateActiveLinkOnScroll(); // Run initially to set the correct active link on page load

  // Contact modal handling
  const contactBtn = document.getElementById("contactBtn");
  const contactBtn2 = document.getElementById("contactBtn2");
  const modal = document.getElementById("contactModal");
  const closeBtn = modal.querySelector(".close");

  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    const toggleButton = document.querySelector(".toggle-button");
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.remove("active");
    toggleButton.classList.remove("active");
  });


  contactBtn2.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Mobile navigation toggle
  const toggleButton = document.querySelector(".toggle-button");
  const navLinks = document.querySelector(".nav-links");

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
  });
  const tagline = document.querySelector('.hero-tagline');
  const fullText = tagline.textContent; // e.g., "Building Modern Web Experiences"
  tagline.textContent = "";
  let index = 0;
  const speed = 100; // Adjust speed in milliseconds

  function typeWriter() {
    if (index < fullText.length) {
      tagline.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // Remove the blinking cursor once finished (optional)
      tagline.style.borderRight = 'none';
    }
  }
  typeWriter();
  document.querySelectorAll(".pricing-card").forEach((card) => {
    console.log(card);
    const readMoreBtn = card.querySelector(".read-more-btn");
    const moreContent = card.querySelector(".more-content");
    if(readMoreBtn){
      readMoreBtn.addEventListener("click", function () {
        if (moreContent.classList.contains("hidden")) {
          moreContent.classList.remove("hidden");
          readMoreBtn.textContent = "Read Less";
        } else {
          moreContent.classList.add("hidden");
          readMoreBtn.textContent = "Read More";
        }
      });
    }
  });
});
