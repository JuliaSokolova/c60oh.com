const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.querySelector("#access-form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `C60OH Labs Early Access — ${data.get("interest")}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Organization: ${data.get("organization") || ""}`,
      `Role: ${data.get("role") || ""}`,
      `Interest: ${data.get("interest") || ""}`,
      "",
      "What they are exploring:",
      data.get("message") || ""
    ].join("\n");

    window.location.href =
      `mailto:julia@c60oh.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
