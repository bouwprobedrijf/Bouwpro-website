
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

/* BOUWPRO LIGHTBOX GALLERY */

(function () {

    function initGallery() {

        const images = document.querySelectorAll(".gallery-card img");

        if (!images.length) {
            console.log("BouwPro: Geen galerijfoto's gevonden.");
            return;
        }

        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Sluiten">&times;</button>
            <button class="lightbox-prev" aria-label="Vorige">&#10094;</button>
            <img src="" alt="Project foto">
            <button class="lightbox-next" aria-label="Volgende">&#10095;</button>
        `;

        document.body.appendChild(lightbox);

        const bigImage = lightbox.querySelector("img");
        let current = 0;

        function showImage(index) {
            current = (index + images.length) % images.length;
            bigImage.src = images[current].src;
            bigImage.alt = images[current].alt;
        }

        images.forEach((img, index) => {
            img.style.cursor = "pointer";

            img.addEventListener("click", function () {
                showImage(index);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        lightbox.querySelector(".lightbox-close").onclick = closeGallery;

        lightbox.querySelector(".lightbox-prev").onclick = function () {
            showImage(current - 1);
        };

        lightbox.querySelector(".lightbox-next").onclick = function () {
            showImage(current + 1);
        };

        lightbox.onclick = function (event) {
            if (event.target === lightbox) closeGallery();
        };

        function closeGallery() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }

        document.addEventListener("keydown", function (event) {
            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") closeGallery();
            if (event.key === "ArrowRight") showImage(current + 1);
            if (event.key === "ArrowLeft") showImage(current - 1);
        });

        console.log("BouwPro Gallery gestart!");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGallery);
    } else {
        initGallery();
    }

})();
