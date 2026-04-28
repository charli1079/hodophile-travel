// Clean JS - NO button blocking!
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation ONLY
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Experiences API
    loadExperiences();
    
    // Navbar scroll
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').style.background = 
            window.scrollY > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    });
});

// Load experiences
async function loadExperiences() {
    try {
        const response = await fetch('/api/experiences');
        const experiences = await response.json();
        const feed = document.getElementById('experiencesFeed');
        feed.innerHTML = '';
        
        experiences.slice(0, 6).forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.innerHTML = `
                <div style="font-weight:600;color:#ff6b35;">${exp.name}</div>
                <div style="color:#666;margin:5px 0;">${exp.destination}</div>
                <img src="${exp.photo}" style="width:100%;height:200px;object-fit:cover;border-radius:15px;">
                <p>${exp.story}</p>
                <small>${new Date(exp.createdAt).toLocaleDateString()}</small>
            `;
            feed.appendChild(card);
        });
    } catch (error) {
        console.error('Experiences load error');
    }
}

// Experiences Form
document.getElementById('experienceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/experiences', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('✅ Story shared!');
            e.target.reset();
            loadExperiences();
        }
    } catch (error) {
        alert('❌ Try again!');
    }
});
// Auto Image Slider for Uttarakhand
function initTourSlider() {
    const slider = document.querySelector('.tour-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetSlider();
        });
    });

    // Auto slide every 4 seconds
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function resetSlider() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 4000);
    }

    // Start
    resetSlider();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initTourSlider);
