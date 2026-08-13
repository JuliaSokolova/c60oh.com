document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu fix
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

  // One shared form; package CTA preselects dropdown
  const packageSelect = document.getElementById("package-select");
  document.querySelectorAll(".package-cta").forEach((cta) => {
    cta.addEventListener("click", () => {
      const selected = cta.dataset.package;
      if (packageSelect && selected) {
        packageSelect.value = selected;
        packageSelect.dispatchEvent(new Event("change"));
      }
    });
  });

  // Formspree submission + dynamic email subject
  const form = document.getElementById("evaluation-form");
  const status = document.getElementById("evaluation-status");
  const submitButton = document.getElementById("evaluation-submit");
  const subject = document.getElementById("form-subject");
  const organization = document.getElementById("organization");

  function updateSubject() {
    if (!subject) return;
    const packageName = packageSelect?.value || "R&D Evaluation Inquiry";
    const company = organization?.value?.trim();
    subject.value = `C60OH — ${packageName}${company ? ` — ${company}` : ""}`;
  }

  packageSelect?.addEventListener("change", updateSubject);
  organization?.addEventListener("input", updateSubject);

  if (!form || !status || !submitButton) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    updateSubject();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.textContent = "";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Submission failed");

      const selectedPackage = packageSelect?.value || "your request";
      form.reset();
      updateSubject();

      status.textContent =
        `✓ Thank you. Your ${selectedPackage} request has been received. We'll contact you directly.`;
      status.classList.add("success");

    } catch (error) {
      console.error(error);
      status.textContent =
        "Something went wrong. Please email us directly at julia@c60oh.com.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Request";
    }
  });
});
