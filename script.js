// Your GitHub username (used for the project and profile links)
const GITHUB_USERNAME = "Bongokuhle-Nokubonga";

// Point project and profile links at your GitHub account.
document.querySelectorAll(".gh-link[data-repo]").forEach((a) => {
  a.href = `https://github.com/${GITHUB_USERNAME}/${a.dataset.repo}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll(".gh-profile").forEach((a) => {
  a.href = `https://github.com/${GITHUB_USERNAME}`;
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dark mode: remember the choice, default to the system setting.
const root = document.documentElement;
function getSaved() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}
const saved = getSaved();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (prefersDark ? "dark" : "light");
document.querySelector(".theme-btn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch { /* ignore */ }
});

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// Count-up numbers in the hero
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1200;
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-ZA");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

// Fade sections in as they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".section").forEach((s) => {
  s.classList.add("reveal");
  observer.observe(s);
});
