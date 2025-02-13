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
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";

      setTimeout(() => {
        item.style.transition = "all 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, 100 * index);
    });
  }

  // Add hover animation for prices
  document.querySelectorAll(".price-list-item").forEach((item) => {
    const priceElement = item.querySelector(".col-2:last-child");

    item.addEventListener("mouseenter", () => {
      priceElement.style.transform = "scale(1.1)";
      priceElement.style.transition = "transform 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
      priceElement.style.transform = "scale(1)";
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

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

  // Back to Top functionality
  const backToTopButton = document.getElementById("backToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Smooth scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover animation for collapse arrows
  document.querySelectorAll(".collapse-arrow").forEach((arrow) => {
    const button = arrow.closest("button");

    button.addEventListener("click", () => {
      arrow.style.transition = "transform 0.3s ease";
      arrow.style.transform =
        button.getAttribute("aria-expanded") === "true"
          ? "rotate(180deg)"
          : "rotate(0deg)";
    });
  });

  const tabsWrapper = document.querySelector(".price-tabs-wrapper");
  const tabs = document.querySelector(".price-tabs");
  const leftBtn = document.querySelector(".tab-scroll-left");
  const rightBtn = document.querySelector(".tab-scroll-right");

  if (tabs && leftBtn && rightBtn) {
    const scrollAmount = 200;

    leftBtn.addEventListener("click", () => {
      tabs.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    rightBtn.addEventListener("click", () => {
      tabs.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    // Update button visibility based on scroll position
    function updateScrollButtons() {
      const isAtStart = tabs.scrollLeft <= 0;
      const isAtEnd = tabs.scrollLeft >= tabs.scrollWidth - tabs.clientWidth;

      leftBtn.style.opacity = isAtStart ? "0.5" : "1";
      leftBtn.style.cursor = isAtStart ? "default" : "pointer";
      rightBtn.style.opacity = isAtEnd ? "0.5" : "1";
      rightBtn.style.cursor = isAtEnd ? "default" : "pointer";
    }

    tabs.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    // Initial check
    updateScrollButtons();
  }

  // Gallery functionality
  const galleryImages = [
    "images/gallery/1.webp",
    "images/gallery/2.webp",
    "images/gallery/3.webp",
    "images/gallery/4.webp",
    "images/gallery/5.webp",
    "images/gallery/6.webp",
  ];

  let currentImageIndex = 0;

  function initGallery() {
    const modal = document.getElementById("galleryModal");
    const modalImg = modal.querySelector(".gallery-modal-img");
    const counter = modal.querySelector(".gallery-counter");
    const closeBtn = modal.querySelector(".gallery-close");
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");

    // Open modal on image click
    document.querySelectorAll(".gallery-img, .gallery-more").forEach((item) => {
      item.addEventListener("click", function () {
        currentImageIndex = parseInt(this.dataset.index);
        updateModalImage();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Navigation
    prevBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateModalImage();
    });

    nextBtn.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateModalImage();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    function updateModalImage() {
      modalImg.src = galleryImages[currentImageIndex];
      counter.textContent = `${currentImageIndex + 1} / ${
        galleryImages.length
      }`;
    }
  }

  // Add this to your DOMContentLoaded event listener
  initGallery();
});
