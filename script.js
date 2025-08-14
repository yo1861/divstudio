// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-to-top button (invisible by default)
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '↑';
scrollBtn.id = 'scrollToTop';
document.body.appendChild(scrollBtn);

scrollBtn.style.position = 'fixed';
scrollBtn.style.bottom = '30px';
scrollBtn.style.right = '30px';
scrollBtn.style.padding = '10px 15px';
scrollBtn.style.fontSize = '18px';
scrollBtn.style.borderRadius = '50%';
scrollBtn.style.border = 'none';
scrollBtn.style.backgroundColor = '#00c9a7';
scrollBtn.style.color = '#fff';
scrollBtn.style.cursor = 'pointer';
scrollBtn.style.display = 'none';
scrollBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
scrollBtn.style.zIndex = '1000';
scrollBtn.title = "Back to top";

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form confirmation (temporary)
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Stop actual submission
  alert('Thanks! We’ll get in touch with you soon.');
  form.reset(); // Clear fields
});