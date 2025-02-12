document.addEventListener("DOMContentLoaded", function () {
  // Staggered animation for service cards
  const cards = document.querySelectorAll(".services .card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 * index);
  });

  // Enhance scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeElements = document.querySelectorAll(
    ".price-list-container, .services .card"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("price-list-container")) {
          animatePriceItems(entry.target);
        }
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));

  // Animate price list items with delay
  function animatePriceItems(container) {
    const items = container.querySelectorAll(".price-list-item");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, 100 * index);
    });
  }

  // Enhanced navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("scrolled", "scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("scroll-down")
    ) {
      navbar.classList.remove("scroll-up");
      navbar.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      navbar.classList.contains("scroll-down")
    ) {
      navbar.classList.remove("scroll-down");
      navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });
});
