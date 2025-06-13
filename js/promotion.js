const slider = document.getElementById("bannerSlider");
const slides = document.querySelectorAll(".promo-slide");
const dotsContainer = document.getElementById("bannerDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
  dotsContainer.children[0].classList.add("active");
}

function showNext() {
  index = (index + 1) % slides.length;
  updateSlider();
}

function showPrev() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

createDots();
setInterval(showNext, 5000); // Auto-slide every 5s
