document.addEventListener("DOMContentLoaded", function () {
  // Initialize language from localStorage or default to 'de'
  const currentLang = localStorage.getItem("selectedLanguage") || "de";
  updateLanguageDisplay(currentLang);

  // Handle language selection
  const languageButtons = document.querySelectorAll(
    ".language-dropdown .dropdown-item"
  );
  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      localStorage.setItem("selectedLanguage", lang);
      updateLanguageDisplay(lang);

      // Reload page with new language
      if (window.location.search.includes("lang=")) {
        window.location.href = window.location.href.replace(
          /lang=[^&]+/,
          `lang=${lang}`
        );
      } else {
        window.location.href =
          window.location.href +
          (window.location.href.includes("?") ? "&" : "?") +
          `lang=${lang}`;
      }
    });
  });

  function updateLanguageDisplay(lang) {
    const currentLanguageElement = document.querySelector(".current-language");
    if (currentLanguageElement) {
      currentLanguageElement.textContent = lang.toUpperCase();
    }
  }
});
