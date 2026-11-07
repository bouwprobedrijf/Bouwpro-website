
// BouwPro Bedrijf - algemene JavaScript

// Automatisch jaartal in de footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobiele navigatie
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

function closeMenu() {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menu openen");
}

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Menu sluiten" : "Menu openen"
    );

  });

  // Menu sluiten na klikken op een link
  navigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", closeMenu);

  });

  // Menu sluiten met Escape
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  // Menu sluiten bij klikken buiten het menu
  document.addEventListener("click", (event) => {

    const clickedInsideMenu = navigation.contains(event.target);
    const clickedButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      closeMenu();
    }

  });

  // Menu sluiten bij groter scherm
  window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {
      closeMenu();
    }

  });

}
