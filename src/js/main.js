// Animate service cards on scroll
const cards = document.querySelectorAll('.card.animate');
const showCardsOnScroll = () => {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            card.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', showCardsOnScroll);
window.addEventListener('DOMContentLoaded', showCardsOnScroll);

// 3D Carousel for specialists
const track = document.querySelector('.carousel-track');
const cardsSpecialist = document.querySelectorAll('.specialist-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel() {
    const angle = 360 / cardsSpecialist.length;
    track.style.transform = `translateZ(-300px) rotateY(${-currentIndex * angle}deg)`;
    cardsSpecialist.forEach((card, i) => {
        card.style.transform = `rotateY(${i * angle}deg) translateZ(300px)`;
    });
}
if (track && cardsSpecialist.length) {
    updateCarousel();
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cardsSpecialist.length) % cardsSpecialist.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cardsSpecialist.length;
        updateCarousel();
    });
}

// Animated stats counter
const statNumbers = document.querySelectorAll('.stat-number');
function animateStats() {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 100);
        function update() {
            count += increment;
            if (count > target) count = target;
            stat.textContent = count.toLocaleString();
            if (count < target) requestAnimationFrame(update);
        }
        update();
    });
}
let statsAnimated = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (!statsAnimated && statsSection.getBoundingClientRect().top < window.innerHeight - 80) {
        animateStats();
        statsAnimated = true;
    }
});

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form (demo only)
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us! (Demo only)');
    this.reset();
});