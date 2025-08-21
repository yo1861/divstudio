// Smooth scroll & close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const toggle = document.getElementById('nav-toggle');
      if (toggle) toggle.checked = false;
    }
  });
});

// Formspree AJAX
(function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const feedback = document.querySelector('.form-feedback');
  function setStatus(msg, ok = true){
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.classList.toggle('status-ok', ok);
    feedback.classList.toggle('status-error', !ok);
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hp = form.querySelector('input[name="empresa"]');
    if (hp && hp.value.trim() !== '') { form.reset(); return; }
    const btn = form.querySelector('button[type="submit"]');
    if (btn){ btn.disabled = true; btn.textContent = 'Enviando…'; }
    const data = new FormData(form);
    try{
      const resp = await fetch(form.action, { method:'POST', body:data, headers:{'Accept':'application/json'} });
      if (resp.ok){ setStatus('¡Gracias! Te responderemos pronto.', true); form.reset(); }
      else { setStatus('No pudimos enviar el mensaje. Probá otra vez o escribinos por email.', false); }
    }catch(e){ setStatus('Error de conexión. Intentá nuevamente.', false); }
    finally{ if (btn){ btn.disabled = false; btn.textContent = 'Enviar'; } }
  });
})();

// Reveal on scroll: hero + pills + service cards
(function revealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    })
  }, { threshold: 0.18 });
  items.forEach(el => obs.observe(el));
})();