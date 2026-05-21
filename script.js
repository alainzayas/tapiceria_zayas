document.addEventListener("DOMContentLoaded", () => {
// Slider reseñas
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('tDots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 't-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(n) {
  slides[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');
}

document.getElementById('tPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('tNext').addEventListener('click', () => goTo(current + 1));


// Process timeline horizontal
const processSteps = document.querySelectorAll('.step');
const trackFill = document.getElementById('trackFill');
let processStarted = false;
let currentStep = -1;

function activateStep(index) {
  processSteps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i < index) s.classList.add('done');
    if (i === index) s.classList.add('active');
  });

  const pct = index === 0 ? 0 : (index / (processSteps.length - 1)) * 100;
  if (trackFill) trackFill.style.width = pct + '%';
}

function runProcess() {
  if (processStarted) return;
  processStarted = true;
  currentStep = 0;
  activateStep(0);

  const interval = setInterval(() => {
    currentStep++;
    if (currentStep >= processSteps.length) {
      clearInterval(interval);
      if (trackFill) trackFill.style.width = '100%';
      return;
    }
    activateStep(currentStep);
  }, 1800);
}

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) runProcess(); });
}, { threshold: 0.4 });

const processContainer = document.getElementById('processSteps');
if (processContainer) processObserver.observe(processContainer);


// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));


// Modal materiales
const matModal = document.getElementById("matModal");
const matClose = document.getElementById("matClose");
const matModalImg = document.getElementById("matModalImg");
const matModalTitle = document.getElementById("matModalTitle");
const matModalDesc = document.getElementById("matModalDesc");

document.querySelectorAll(".mat-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const title = card.querySelector(".mat-card-name").innerText;
    const desc = card.querySelector(".mat-card-desc").innerText;

    if (img && img.getAttribute("src")) {
      matModalImg.src = img.getAttribute("src");
      matModalImg.alt = title;
    }

    matModalTitle.innerText = title;
    matModalDesc.innerText = desc;

    document.getElementById("matModalTag").innerText = "Material disponible";
    
    matModal.classList.add("open");
  });
});

matClose.addEventListener("click", () => matModal.classList.remove("open"));

matModal.addEventListener("click", (e) => {
  if (e.target === matModal) {
    matModal.classList.remove("open");
  }
});

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") matModal.classList.remove("open");
});

});