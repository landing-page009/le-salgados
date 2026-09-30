"use strict";

// Menu mobile
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.toggleAttribute("data-open", open);
  btn.setAttribute("aria-expanded", String(open));
}

btn.addEventListener("click", () => setMenu(!nav.hasAttribute("data-open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Status "aberto agora" (horário de Brasília). Valores em minutos: [abre, fecha]
// Terça e quarta: 9h às 18h50. Quinta, sexta e sábado: 9h às 19h.
const HOURS = {
  Tue: [540, 1130],
  Wed: [540, 1130],
  Thu: [540, 1140],
  Fri: [540, 1140],
  Sat: [540, 1140],
};

const fmt = (min) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`;

function updateStatus() {
  const el = document.querySelector("[data-status]");
  if (!el) return;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const today = HOURS[get("weekday")];
  const isOpen = today && minutes >= today[0] && minutes < today[1];
  el.textContent = isOpen
    ? `Aberto agora, até ${fmt(today[1])}`
    : "Fechado agora. Atendemos de terça a sábado, a partir das 9h";
}

updateStatus();

// Carrossel de feedbacks: automático, com pausa, botões e respeito a prefers-reduced-motion
(function () {
  const list = document.querySelector(".rev");
  const items = list ? list.querySelectorAll("li") : [];
  if (!items.length) return;
  const toggle = document.querySelector("[data-rev-toggle]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let userPaused = reduce, hover = false, timer = null;

  const step = () => items[0].offsetWidth + (parseFloat(getComputedStyle(list).columnGap) || 16);

  function go(dir) {
    const max = list.scrollWidth - list.clientWidth;
    let left = list.scrollLeft + dir * step();
    if (dir > 0 && list.scrollLeft >= max - 4) left = 0;
    else if (dir < 0 && list.scrollLeft <= 4) left = max;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }
  function render() {
    if (!toggle) return;
    toggle.textContent = userPaused ? "Reproduzir" : "Pausar";
    toggle.setAttribute("aria-pressed", String(userPaused));
  }
  function tick() {
    clearInterval(timer);
    if (!userPaused && !hover && !document.hidden) timer = setInterval(() => go(1), 5000);
  }

  document.querySelectorAll("[data-rev]").forEach((b) =>
    b.addEventListener("click", () => { go(Number(b.dataset.rev)); tick(); }));
  if (toggle) toggle.addEventListener("click", () => { userPaused = !userPaused; render(); tick(); });
  list.addEventListener("mouseenter", () => { hover = true; tick(); });
  list.addEventListener("mouseleave", () => { hover = false; tick(); });
  list.addEventListener("focusin", () => { hover = true; tick(); });
  list.addEventListener("focusout", () => { hover = false; tick(); });
  list.addEventListener("touchstart", () => { hover = true; tick(); }, { passive: true });
  list.addEventListener("touchend", () => setTimeout(() => { hover = false; tick(); }, 6000), { passive: true });
  document.addEventListener("visibilitychange", tick);
  render();
  tick();
})();

// Ano do rodapé
const year = document.getElementById("ano");
if (year) year.textContent = new Date().getFullYear();
