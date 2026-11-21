document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.getElementById('petals-container');
    const introOverlay = document.getElementById('intro-overlay');
    const openBtn = document.getElementById('open-btn');
    const mainApp = document.getElementById('main-app');
    const celebrateBtn = document.getElementById('celebrate-btn');

    // 1. Sürekli Düşen Kırmızı Gül Yaprakları
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 14 + 10; // 10px - 24px
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 0.8}px`;
        petal.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 5 + 5; // 5s - 10s
        petal.style.animationDuration = `${duration}s`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Her 350ms'de bir gül yaprağı oluştur
    setInterval(createPetal, 350);

    // 2. Zarfı Açma Animasyonu
    openBtn.addEventListener('click', (e) => {
        burstHearts(e.clientX, e.clientY, 20);
        introOverlay.classList.add('fade-out');

        setTimeout(() => {
            introOverlay.style.display = 'none';
            mainApp.classList.remove('hidden');
            triggerReveal();
            animateCounters();
        }, 700);
    });

    // 3. Kaydırdıkça Ortaya Çıkan Kartlar (Scroll Reveal)
    function triggerReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => observer.observe(el));
    }

    // 4. 16 Yıllık Sayaç Animasyonu
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num[data-target]');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target.toLocaleString('tr-TR');
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current).toLocaleString('tr-TR');
                }
            }, stepTime);
        });
    }

    // 5. Ekrana Dokununca veya Kutlama Butonuna Basınca Gül/Kalp Patlaması
    function burstHearts(x, y, count = 12) {
        const emojis = ['🌹', '❤️', '✨', '💖', '🥀'];
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('burst-particle');
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 140 + 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 40;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1400);
        }
    }

    // Alt kısımdaki büyük kutlama butonu
    celebrateBtn.addEventListener('click', (e) => {
        const rect = celebrateBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top;
        burstHearts(centerX, centerY, 30);

        // Ekstra gül yaprağı yağmuru
        for (let i = 0; i < 20; i++) {
            setTimeout(createPetal, i * 80);
        }
    });
});

// 6. Fotoğraf Büyütme (Lightbox) Fonksiyonları
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = src;
    lightboxCaption.innerText = caption;
    lightbox.classList.add('show');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}
