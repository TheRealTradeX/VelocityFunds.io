// Velocity Funds — main.js
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // Pricing toggle
  const toggle = document.getElementById("billingToggle");
  if (toggle) {
    const amounts = document.querySelectorAll(".price-amount");
    const setMode = () => {
      amounts.forEach(el => {
        const one = el.getAttribute("data-onetime");
        const mon = el.getAttribute("data-monthly");
        el.textContent = toggle.checked ? mon : one;
      });
    };
    setMode();
    toggle.addEventListener("change", setMode);
  }
});
