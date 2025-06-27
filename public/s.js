// ---------toggle icon navbar----//
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  // Sequential typing animation for "Sami Khan" with longer delay
  const typingElement = document.querySelector(".typing-text");
  const textToType = typingElement.getAttribute("data-text");
  let index = 0;

  function typeLetter() {
    if (index < textToType.length) {
      typingElement.textContent = textToType.substring(0, index + 1);
      index++;
      setTimeout(typeLetter, 300); // 400ms per letter for clarity
    }
  }
  typeLetter();

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      let sectionTop = section.offsetTop - 150;
      let sectionHeight = section.offsetHeight;
      let sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        document
          .querySelector(`header nav a[href="#${sectionId}"]`)
          .classList.add("active");
      }
    });

    // --------------toggle sticky header-----------//
    let header = document.querySelector("header");
    header.classList.toggle("sticky", scrollY > 100);

    // --------------remove toggle icon and navbar-----------//
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// Scroll Reveal
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".skill-container, .project-box, .contact form", {
  origin: "bottom",
});
ScrollReveal().reveal(".home-content h1, .home-img, .about-img", {
  origin: "left",
});
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });
