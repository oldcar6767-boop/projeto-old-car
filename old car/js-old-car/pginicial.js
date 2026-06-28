const produtos = document.querySelector(".produtos");
const prevBtn = document.querySelector(".nav-button.prev");
const nextBtn = document.querySelector(".nav-button.next");
const cards = produtos.querySelectorAll(".produto");
let currentIndex = 0;
const cardGap = 40;
const visibleCount = 2;

function updateButtons() {
    const maxIndex = Math.max(0, cards.length - visibleCount);
    const shouldHidePrev = currentIndex === 0;
    const shouldHideNext = currentIndex >= maxIndex;

    prevBtn.style.display = shouldHidePrev ? "none" : "flex";
    nextBtn.style.display = shouldHideNext ? "none" : "flex";

    prevBtn.disabled = shouldHidePrev;
    nextBtn.disabled = shouldHideNext;
}

function updateSlider() {
    const cardWidth = cards[0]?.offsetWidth || 0;
    const offset = currentIndex * (cardWidth + cardGap);
    produtos.style.transform = `translateX(-${offset}px)`;
    updateButtons();
    updateDots();
}

prevBtn.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
});

nextBtn.addEventListener("click", () => {
    currentIndex = Math.min(cards.length - visibleCount, currentIndex + 1);
    updateSlider();
});

let slideDirection = 1;
const maxSlideIndex = Math.max(0, cards.length - visibleCount);
const dotsContainer = document.querySelector(".slider-dots");
let dotButtons = [];

function renderDots() {
    if (!dotsContainer) {
        return;
    }

    dotsContainer.innerHTML = "";
    for (let i = 0; i <= maxSlideIndex; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
    dotButtons = Array.from(dotsContainer.querySelectorAll(".slider-dot"));
}

function updateDots() {
    dotButtons.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function autoSlide() {
    if (cards.length <= visibleCount) {
        return;
    }

    if (currentIndex >= maxSlideIndex) {
        slideDirection = -1;
    } else if (currentIndex <= 0) {
        slideDirection = 1;
    }

    currentIndex = Math.min(maxSlideIndex, Math.max(0, currentIndex + slideDirection));
    updateSlider();
}

const autoSlideInterval = setInterval(autoSlide, 5000);

renderDots();

const accountToggle = document.querySelector(".account-toggle");
const accountDropdown = document.querySelector(".account-dropdown");

accountToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    accountDropdown.classList.toggle("show");
    accountDropdown.setAttribute(
        "aria-hidden",
        accountDropdown.classList.contains("show") ? "false" : "true"
    );
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".account-menu")) {
        accountDropdown.classList.remove("show");
        accountDropdown.setAttribute("aria-hidden", "true");
    }
});

window.addEventListener("resize", updateSlider);
updateSlider();