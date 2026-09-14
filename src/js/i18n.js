import en from "../locales/en.json";
import ja from "../locales/ja.json";

function getNestedValue(object, path) {
    return path
    .split(".")
    .reduce((value, key) => value?.[key], object);
}

function loadLanguage(language) {
    // const response = await fetch(`../locales/${language}.json`);
    const translations = {
        en,
        ja
    };
-0
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const translation = getNestedValue(translations[language], key);

        if (translation !== undefined) {
            element.textContent = translation;
        }
    });

    document.documentElement.lang = language;

}

export default function setupI18n() {
    const savedLanguage = localStorage.getItem("brushup-language");
    const language = savedLanguage || "ja";
    loadLanguage(language);

    document.querySelectorAll("[data-lang-choice]").forEach(button => {
        button.addEventListener("click", () => {
            const language = button.dataset.langChoice;
            
            loadLanguage(language);
            localStorage.setItem("brushup-language", language);
        });
    });
}