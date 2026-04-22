// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }, 800);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// SERVICES DATA
const services = [
  { name: "Makeup", desc: "Professional makeup for all occasions", img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400" },
  { name: "Bridal Makeup", desc: "Stunning bridal looks for your big day", img: "https://images.pexels.com/photos/3783055/pexels-photo-3783055.jpeg?auto=compress&w=400" },
  { name: "Hair Styling", desc: "Trendy cuts, colors & styling", img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400" },
  { name: "Facial Treatments", desc: "Glowing skin with premium facials", img: "https://images.pexels.com/photos/3783055/pexels-photo-3783055.jpeg?auto=compress&w=400" },
  { name: "Skin Care", desc: "Personalized skin care solutions", img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400" }
];

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  
  grid.innerHTML = services.map(service => `
    <div class="service-card">
      <div class="service-img" style="background-image: url('${service.img}');"></div>
      <div class="service-info">
        <h3>${service.name}</h3>
        <p>${service.desc}</p>
      </div>
    </div>
  `).join('');
}

// BEFORE/AFTER SLIDER
const baSlider = document.getElementById('baSlider');
const baOverlay = document.getElementById('baOverlay');
let isDraggingBA = false;

if (baSlider) {
  baSlider.addEventListener('mousedown', () => isDraggingBA = true);
  baSlider.addEventListener('touchstart', () => isDraggingBA = true);
  
  window.addEventListener('mouseup', () => isDraggingBA = false);
  window.addEventListener('touchend', () => isDraggingBA = false);
  
  window.addEventListener('mousemove', (e) => {
    if (!isDraggingBA) return;
    const rect = document.querySelector('.ba-image').getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.min(Math.max(x, 0), rect.width);
    const percent = (x / rect.width) * 100;
    baOverlay.style.width = percent + '%';
    baSlider.style.left = percent + '%';
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDraggingBA) return;
    const rect = document.querySelector('.ba-image').getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    x = Math.min(Math.max(x, 0), rect.width);
    const percent = (x / rect.width) * 100;
    baOverlay.style.width = percent + '%';
    baSlider.style.left = percent + '%';
  });
}

// GALLERY DATA
const galleryImages = [
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/3783055/pexels-photo-3783055.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/3783055/pexels-photo-3783055.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/3783055/pexels-photo-3783055.jpeg?auto=compress&w=400"
];

function renderGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  
  galleryGrid.innerHTML = galleryImages.map(img => `
    <div class="gallery-item" style="background-image: url('${img}');" onclick="openGalleryModal('${img}')"></div>
  `).join('');
}

// GALLERY MODAL
function openGalleryModal(imgSrc) {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'flex';
  modalImg.src = imgSrc;
}

// CLOSE MODAL
document.querySelector('.close-modal')?.addEventListener('click', () => {
  document.getElementById('galleryModal').style.display = 'none';
});

window.onclick = (e) => {
  if (e.target === document.getElementById('galleryModal')) {
    document.getElementById('galleryModal').style.display = 'none';
  }
};

// BOOKING FORM TO WHATSAPP
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const service = document.getElementById('serviceSelect').value;
    const date = document.getElementById('bookingDate').value;
    const message = document.getElementById('bookingMessage').value;
    
    const whatsappMsg = `💄 *New Booking Request - Hania's Beauty Salon*%0A%0A👤 *Name:* ${name}%0A📞 *Phone:* ${phone}%0A💅 *Service:* ${service}%0A📅 *Preferred Date:* ${date}%0A💬 *Message:* ${message}%0A%0A_This is a booking inquiry from website._`;
    
    window.open(`https://wa.me/923162107201?text=${whatsappMsg}`, '_blank');
  });
}

// TESTIMONIALS SLIDER
let currentTesti = 0;
const testimonialsContainer = document.getElementById('testimonialsContainer');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTesti = document.getElementById('prevTesti');
const nextTesti = document.getElementById('nextTesti');

function updateTestiSlider() {
  if (testimonialsContainer) {
    testimonialsContainer.style.transform = `translateX(-${currentTesti * 100}%)`;
  }
}

if (nextTesti) {
  nextTesti.addEventListener('click', () => {
    currentTesti = (currentTesti + 1) % testimonialCards.length;
    updateTestiSlider();
  });
}

if (prevTesti) {
  prevTesti.addEventListener('click', () => {
    currentTesti = (currentTesti - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestiSlider();
  });
}

// SCROLL ANIMATIONS
const animatedElements = document.querySelectorAll('.service-card, .why-card, .gallery-item, .pricing-card');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  appearOnScroll.observe(el);
});

// STICKY NAVBAR ON SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
  }
});

// INITIALIZE
renderServices();
renderGallery();

// Make openGalleryModal globally available
window.openGalleryModal = openGalleryModal;
