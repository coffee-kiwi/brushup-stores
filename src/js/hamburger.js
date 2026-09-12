export default function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".navlinks");
    const dropDownLinks = document.querySelectorAll(".navmid a")

    if (!hamburger || !navLinks) return;
    
    function toggleDropdown() {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        hamburger.setAttribute("aria-expanded", isOpen);
    }

    function closeDropdown() {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", false);
    }

    hamburger.addEventListener("click", toggleDropdown);

    dropDownLinks.forEach(link => {
        link.addEventListener("click", closeDropdown);
    });
}
