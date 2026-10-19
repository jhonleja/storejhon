
(() => {
  "use strict";

  // ==========================================
  // JHON MEN'S WEAR
  // JavaScript principal del sitio web
  // ==========================================


  // ==========================================
  // 1. MENU RESPONSIVE
  // ==========================================

  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".mobile-nav");

  function closeMenu() {
    if (!toggle || !mobile) return;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");

    mobile.classList.remove("open");
    mobile.setAttribute("inert", "");

    document.body.classList.remove("menu-open");
  }

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open =
        toggle.getAttribute("aria-expanded") !== "true";

      toggle.setAttribute("aria-expanded", String(open));

      toggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
      );

      mobile.classList.toggle("open", open);

      if (open) {
        mobile.removeAttribute("inert");
      } else {
        mobile.setAttribute("inert", "");
      }

      document.body.classList.toggle("menu-open", open);
    });

    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 970) closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        !mobile.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }


  // ==========================================
  // 2. ANIMACIONES AL HACER SCROLL
  // ==========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -22px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  // ==========================================
  // 3. AÑO AUTOMATICO EN EL FOOTER
  // ==========================================

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  // ==========================================
  // 4. BOTON VOLVER ARRIBA
  // ==========================================

  const backToTop = document.querySelector(".back-top");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle(
        "visible",
        window.scrollY > 450
      );
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth"
      });
    });
  }


  // ==========================================
  // 5. FILTROS DE LA COLECCION
  // ==========================================

  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const selected = filterButton === button;

        filterButton.classList.toggle("selected", selected);
        filterButton.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

      productCards.forEach((card) => {
        const category = card.dataset.category;

        card.hidden =
          selectedFilter !== "all" &&
          category !== selectedFilter;
      });
    });
  });


  // ==========================================
  // 6. FORMULARIO DE CONTACTO POR WHATSAPP
  // ==========================================

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // Numero oficial de JHON, Guatemala
  const whatsappNumber = "50232726775";

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Verificar campos obligatorios
      if (!contactForm.reportValidity()) {
        return;
      }

      // Obtener los datos del formulario
      const formData = new FormData(contactForm);

      const nombre = String(
        formData.get("nombre") || ""
      ).trim();

      const email = String(
        formData.get("email") || ""
      ).trim();

      const asunto = String(
        formData.get("asunto") || ""
      ).trim();

      const mensaje = String(
        formData.get("mensaje") || ""
      ).trim();

      // Validar campos vacios
      if (!nombre || !email || !asunto || !mensaje) {
        if (formStatus) {
          formStatus.textContent =
            "Por favor, completa todos los campos.";
        }
        return;
      }

      // ======================================
      // CONSTRUIR MENSAJE SIN EMOJIS
      // ======================================

      const whatsappMessage = [
        "*JHON | MEN'S WEAR*",
        "------------------------------",
        "",
        "Hola, JHON!",
        "",
        "Me gustaría ponerme en contacto con ustedes.",
        "",
        "*DATOS DEL CLIENTE*",
        "",
        "*Nombre:* " + nombre,
        "*Correo electrónico:* " + email,
        "*Asunto:* " + asunto,
        "",
        "*MENSAJE*",
        mensaje,
        "",
        "------------------------------",
        "Enviado desde el sitio web de JHON."
      ].join("\n");


      // ======================================
      // GENERAR URL DE WHATSAPP
      // ======================================

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);


      // ======================================
      // ABRIR WHATSAPP
      // ======================================

      if (formStatus) {
        formStatus.textContent =
          "Abriendo WhatsApp...";
      }

      const whatsappWindow = window.open(
        whatsappURL,
        "_blank"
      );

      if (whatsappWindow) {
        whatsappWindow.opener = null;
      } else if (formStatus) {
        formStatus.textContent =
          "WhatsApp no se abrió automáticamente. ";

        const fallbackLink = document.createElement("a");

        fallbackLink.href = whatsappURL;
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        fallbackLink.textContent = "Abrir WhatsApp aquí";

        formStatus.appendChild(fallbackLink);
      }
    });
  }

})();
