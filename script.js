document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Existing homepage form support, retained in case the form is reintroduced later.
  const form = document.getElementById("access-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();

      if (status) {
        status.textContent = "✓ Thank you. Your request has been received.";
        status.classList.add("success");
      }
    } catch (error) {
      console.error(error);

      if (status) {
        status.textContent = "Something went wrong. Please email us directly at julia@c60oh.com.";
        status.classList.add("error");
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Request Early Access";
    }
  });
});
