document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const toggleButton = document.querySelector(".toggle-button");
  const navLinks = document.querySelector(".nav-links");
  const modal = document.getElementById("contactModal");
  const contactBtns = document.querySelectorAll("#contactBtn, #contactBtn2");
  const closeBtn = modal.querySelector(".close");
  const tagline = document.querySelector(".hero-tagline");
  const pricingCards = document.querySelectorAll(".pricing-card");

  let ticking = false; // Used for optimizing scroll event handling

  /** 
   * Updates the active navigation link based on scroll position.
   */
  function updateActiveLinkOnScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        let scrollPosition = window.scrollY + 160;

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

        // Close mobile navigation menu on scroll
        navLinks.classList.remove("active");
        toggleButton.classList.remove("active");

        ticking = false;
      });

      ticking = true;
    }
  }

  /**
   * Handles smooth scrolling for navigation links.
   */
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }

  /**
   * Toggles the mobile navigation menu.
   */
  function toggleNav() {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
  }

  /**
   * Shows the contact modal.
   */
  function showModal(e) {
    e.preventDefault();
    modal.style.display = "block";
    navLinks.classList.remove("active");
    toggleButton.classList.remove("active");
  }

  /**
   * Closes the contact modal.
   */
  function closeModal() {
    modal.style.display = "none";
  }

  /**
   * Closes the modal when clicking outside of it.
   */
  function handleOutsideClick(e) {
    if (e.target === modal) closeModal();
  }

  /**
   * Implements typewriter effect for hero tagline.
   */
  function typeWriterEffect() {
    const fullText = tagline.textContent;
    tagline.textContent = "";
    let index = 0;
    const speed = 100;

    function typeWriter() {
      if (index < fullText.length) {
        tagline.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      } else {
        tagline.style.borderRight = "none";
      }
    }

    typeWriter();
  }

  /**
   * Handles "Read More" toggle for pricing cards.
   */
  function toggleReadMore(e) {
    const card = e.currentTarget.closest(".pricing-card");
    const moreContent = card.querySelector(".more-content");
    const readMoreBtn = card.querySelector(".read-more-btn");

    if (moreContent.classList.contains("hidden")) {
      moreContent.classList.remove("hidden");
      readMoreBtn.textContent = "Read Less";
    } else {
      moreContent.classList.add("hidden");
      readMoreBtn.textContent = "Read More";
    }
  }

  // Event Listeners
  links.forEach((link) => link.addEventListener("click", smoothScroll));
  window.addEventListener("scroll", updateActiveLinkOnScroll);
  toggleButton.addEventListener("click", toggleNav);
  contactBtns.forEach((btn) => btn.addEventListener("click", showModal));
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", handleOutsideClick);
  pricingCards.forEach((card) => {
    const readMoreBtn = card.querySelector(".read-more-btn");
    if (readMoreBtn) readMoreBtn.addEventListener("click", toggleReadMore);
  });

  // Initial function calls
  updateActiveLinkOnScroll(); // Ensure active link is set on page load
  typeWriterEffect();
});
