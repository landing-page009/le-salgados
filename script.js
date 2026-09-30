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

// Status "aberto agora" (horário de Brasília)
// Terça, quinta, sexta e sábado, das 12:00 às 18:50
const OPEN_DAYS = ["Tue", "Thu", "Fri", "Sat"];
const OPEN_MIN = 12 * 60;
const CLOSE_MIN = 18 * 60 + 50;

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
  const isOpen = OPEN_DAYS.includes(get("weekday")) && minutes >= OPEN_MIN && minutes < CLOSE_MIN;
  el.textContent = isOpen
    ? "Aberto agora, até 18h50"
    : "Fechado agora. Atendemos ter, qui, sex e sáb, das 12h às 18h50";
}

updateStatus();

// Ano do rodapé
const year = document.getElementById("ano");
if (year) year.textContent = new Date().getFullYear();

// Se uma foto não carregar, esconde a imagem em vez de mostrar ícone quebrado
document.querySelectorAll("img[data-ph]").forEach((img) => {
  img.addEventListener("error", () => { img.hidden = true; });
});
