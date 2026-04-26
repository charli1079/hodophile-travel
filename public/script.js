// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').style.background = window.scrollY > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
});

// Experiences Form + API
const experienceForm = document.getElementById('experienceForm');
const experiencesFeed = document.getElementById('experiencesFeed');

experienceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('destination', document.getElementById('destination').value);
    formData.append('story', document.getElementById('story').value);
    formData.append('photo', document.getElementById('photo').files[0]);

    try {
        const response = await fetch('/api/experiences', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('✅ Experience shared!');
            experienceForm.reset();
            loadExperiences();
        }
    } catch (error) {
        alert('❌ Try again!');
    }
});

// Load experiences
async function loadExperiences() {
    try {
        const response = await fetch('/api/experiences');
        const experiences = await response.json();
        displayExperiences(experiences);
    } catch (error) {
        console.error('Load error:', error);
    }
}

function displayExperiences(experiences) {
    experiencesFeed.innerHTML = '';
    experiences.slice(0, 6).forEach(exp => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.innerHTML = `
            <div class="experience-author">${exp.name}</div>
            <div class="experience-destination">${exp.destination}</div>
            <img src="${exp.photo}" alt="Travel" style="width:100%;height:200px;object-fit:cover;border-radius:15px;">
            <p>${exp.story}</p>
            <small>${new Date(exp.createdAt).toLocaleDateString()}</small>
        `;
        experiencesFeed.appendChild(card);
    });
}

// Booking Calculator
document.querySelectorAll('.tour-card .btn-small').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Quick Booking</h3>
                <p>WhatsApp link ready! Tap below:</p>
                <a href="${btn.href}" class="btn btn-primary" target="_blank">Open WhatsApp</a>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.close').onclick = () => modal.remove();
        modal.onclick = (e) => e.target === modal && modal.remove();
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadExperiences();
    
    // Parallax
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
});
