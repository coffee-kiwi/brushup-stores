import en from "../locales/en.json";
import ja from "../locales/ja.json";

function getNestedValue(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

function loadLanguage(language) {
  const translations = {
    en,
    ja,
  };
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = getNestedValue(translations[language], key);

    if (translation !== undefined) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const translation = getNestedValue(
      translations[language],
      element.dataset.i18nAriaLabel,
    );
    if (translation !== undefined)
      element.setAttribute("aria-label", translation);
  });
  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.langChoice === language),
    );
  });
  document.documentElement.lang = language;
}

export default function setupI18n() {
  const savedLanguage = localStorage.getItem("brushup-language");
  const language = ["en", "ja"].includes(savedLanguage) ? savedLanguage : "ja";
  loadLanguage(language);

  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.langChoice;

      loadLanguage(language);
      localStorage.setItem("brushup-language", language);
    });
  });
}
