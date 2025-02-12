document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in class to elements you want to animate
  const fadeElements = document.querySelectorAll(
    ".services .card, .price-list-container"
  );
  fadeElements.forEach((el) => el.classList.add("fade-in"));

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
