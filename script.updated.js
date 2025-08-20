// ===== Navegación con scroll suave =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      // Cerrar menú mobile si está abierto
      const toggle = document.getElementById('nav-toggle');
      if (toggle) toggle.checked = false;
    }
  });
});

// ===== Botón "volver arriba" (opcional) =====
(function setupScrollTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerText = '↑';
  scrollBtn.id = 'scrollToTop';
  document.body.appendChild(scrollBtn);

  Object.assign(scrollBtn.style, {
    position: 'fixed',
    bottom: '90px',
    right: '26px',
    padding: '10px 15px',
    fontSize: '18px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#6b5cff',
    color: '#fff',
    cursor: 'pointer',
    display: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: '999'
  });
  scrollBtn.title = "Volver arriba";

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== Envío Formspree (AJAX) =====
(function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const feedback = document.querySelector('.form-feedback');

  function setStatus(msg, ok = true) {
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
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    const data = new FormData(form);
    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        setStatus('¡Gracias! Tu mensaje fue enviado.', true);
        form.reset();
      } else {
        let msg = 'Hubo un problema al enviar. Probá de nuevo o escribime por email.';
        try {
          const json = await resp.json();
          if (json && json.errors && json.errors.length) {
            msg = json.errors.map(e => e.message).join(' ');
          }
        } catch {}
        setStatus(msg, false);
      }
    } catch {
      setStatus('Sin conexión o error del servidor. Intentá más tarde.', false);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; }
    }
  });
})();