const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
document.documentElement.classList.add("animations-ready");

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(".reveal");

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
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const rotator = document.querySelector("[data-rotator]");
const rotatorImage = document.querySelector("[data-rotator-image]");
const productImages = [
  "assets/AF6EC9E9-9C56-432A-887B-0A07CD6585D7.jpeg",
  "assets/54213545-57BF-4705-A6B2-C52A8AA2D146.jpeg",
  "assets/B5B8547E-39AE-44ED-B2D7-8F34D979A173.jpeg",
  "assets/47D9FA27-C876-42C2-8BD1-36E3C9F85B22.jpeg"
];

let currentImage = 0;
let timerId;

function showImage(nextIndex) {
  if (!rotator || !rotatorImage) return;
  currentImage = (nextIndex + productImages.length) % productImages.length;
  rotator.classList.add("is-changing");
  window.setTimeout(() => {
    rotatorImage.src = productImages[currentImage];
    rotator.classList.remove("is-changing");
  }, 220);
}

function scheduleRotation() {
  if (!rotator) return;
  window.clearInterval(timerId);
  timerId = window.setInterval(() => showImage(currentImage + 1), 4200);
}

if (rotator) {
  const nextButton = rotator.querySelector("[data-next]");
  const previousButton = rotator.querySelector("[data-prev]");

  nextButton?.addEventListener("click", () => {
    showImage(currentImage + 1);
    scheduleRotation();
  });

  previousButton?.addEventListener("click", () => {
    showImage(currentImage - 1);
    scheduleRotation();
  });

  scheduleRotation();
}

const quoteForm = document.querySelector("[data-quote-form]");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const name = data.get("name") || "";
  const phone = data.get("phone") || "";
  const email = data.get("email") || "";
  const solution = data.get("solution") || "";
  const message = data.get("message") || "";
  const body = [
    "Hello Baristah Trade Links Ltd,",
    "",
    "I would like a quote for a power backup inverter system.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Solution: ${solution}`,
    `What I want to power: ${message}`,
    "",
    "Please contact me with the next steps."
  ].join("\n");

  window.location.href = `mailto:baristah23@gmail.com?subject=${encodeURIComponent("Power backup inverter quote request")}&body=${encodeURIComponent(body)}`;
});

const loadTabs = document.querySelectorAll("[data-load-tab]");
const loadPanels = document.querySelectorAll("[data-load-panel]");

loadTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.loadTab;
    loadTabs.forEach((item) => item.classList.toggle("active", item === tab));
    loadPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.loadPanel === target));
  });
});

const cursorLight = document.querySelector("[data-cursor-light]");

if (cursorLight) {
  window.addEventListener("pointermove", (event) => {
    const x = Math.round((event.clientX / window.innerWidth) * 100);
    const y = Math.round((event.clientY / window.innerHeight) * 100);
    cursorLight.style.setProperty("--x", `${x}%`);
    cursorLight.style.setProperty("--y", `${y}%`);
  });
}

const tiltTargets = document.querySelectorAll("[data-tilt]");

tiltTargets.forEach((target) => {
  target.addEventListener("pointermove", (event) => {
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });

  target.addEventListener("pointerleave", () => {
    target.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  });
});
