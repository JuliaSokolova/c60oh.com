document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("access-form");
  const status = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");

  if (!form || !status || !submitButton) {
      console.error("Form elements are missing.");
      return;
    };

  form.addEventListener("submit", async function (event) {

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

      const response = await fetch("https://formspree.io/f/xqerweqb", {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {

        form.reset();

        if (status) {
          status.textContent =
            "✅ Thank you! Your inquiry has been received. We'll contact you shortly.";
          status.classList.add("success");
        }

      } else {

        throw new Error("Submission failed");

      }

    } catch (error) {

      console.error(error);

      if (status) {
        status.textContent =
          "❌ Something went wrong. Please email us directly at julia@c60oh.com.";
        status.classList.add("error");
      }

    } finally {

      submitButton.disabled = false;
      submitButton.textContent = "Request Early Access";

    }

  });

});
