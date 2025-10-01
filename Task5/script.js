/* Interactivity: menu, tilt, lazy load, filters, modal, skill animation, contact fallback */
(function(){
  // Year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainMenu = document.getElementById('mainMenu');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(mainMenu) mainMenu.classList.toggle('show');
    });
  }

  // Simple lazy loader for images with data-src
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if('IntersectionObserver' in window && lazyImgs.length){
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, {rootMargin:'100px'});
    lazyImgs.forEach(i => imgObserver.observe(i));
  } else {
    lazyImgs.forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); });
  }

  // Tilt effect for elements with [data-tilt]
  function applyTilt(el){
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * 10; // rotateX
      const ry = (px - 0.5) * -10; // rotateY
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      el.style.boxShadow = `${(ry*2).toFixed(0)}px ${(rx*2).toFixed(0)}px 30px rgba(3,6,12,0.6)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  }
  document.querySelectorAll('[data-tilt]').forEach(applyTilt);

  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projects.forEach(p => {
        if(f === 'all' || p.dataset.category === f) p.style.display = '';
        else p.style.display = 'none';
      });
    });
  });

  // Project modal + details (demo content)
  const modal = document.getElementById('projModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  function openProject(key){
    const data = {
      inshorts: `<h3>Inshorts Clone</h3><p>React frontend with secure API and rate limiting. Implemented JWT auth and secure headers. Repo: <a href="https://github.com/Aura007/inshorts-clone" target="_blank">github.com/Aura007/inshorts-clone</a></p>`,
      atm: `<h3>Secure ATM System</h3><p>Java project with encrypted transaction storage, PIN auth and prepared statements.</p>`,
      subraider: `<h3>SubRaider</h3><p>Subdomain enumeration toolkit with dnsx integration, historical discovery and CNAME takeover checks.</p>`
    };
    if(modal && modalBody){
      modalBody.innerHTML = data[key] || '<p>Details coming soon.</p>';
      modal.setAttribute('aria-hidden','false');
    }
  }
  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-project');
      openProject(key);
    });
  });
  modalClose && modalClose.addEventListener('click', ()=> modal && modal.setAttribute('aria-hidden','true'));
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ modal && modal.setAttribute('aria-hidden','true'); } });

  // Animate radial skill meters when visible
  const radials = document.querySelectorAll('.radial');
  if('IntersectionObserver' in window && radials.length){
    const rObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const svg = entry.target;
          const value = Number(svg.dataset.value || 0);
          const meter = svg.querySelector('.meter');
          const dash = 100 - value; // stroke-dashoffset assuming 100 total
          if(meter) meter.style.strokeDashoffset = String(dash);
          obs.unobserve(svg);
        }
      });
    }, {threshold:0.4});
    radials.forEach(r => rObserver.observe(r));
  }

  // Contact form (client-side demo). Provide mailto fallback.
  const contactForm = document.getElementById('contactForm');
  const feedback = contactForm && contactForm.querySelector('.form-feedback');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value || document.getElementById('cf-name').value;
      const email = contactForm.email ? contactForm.email.value : document.getElementById('cf-email').value;
      const message = contactForm.message ? contactForm.message.value : document.getElementById('cf-message').value;
      if(!name || !email || !message){
        if(feedback) feedback.textContent = 'Please fill all fields.';
        return;
      }
      // Demo UX: show success, in real site integrate Formspree / Netlify
      if(feedback) feedback.textContent = 'Thanks! Message formatted. (Demo form — no server attached)';
      contactForm.reset();
    });
  }

  // Force resume download
const resumeBtn = document.getElementById('resumeBtn');
if(resumeBtn){
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const fileUrl = resumeBtn.getAttribute('href');

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Aura_Shanagonda_CS.pdf'; // rename as needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(() => alert('Error: Resume file not found. Please check the path.'));
  });
}



  // Mailto fallback button
  const mailtoBtn = document.getElementById('mailtoFallback');
  if(mailtoBtn){
    mailtoBtn.addEventListener('click', () => {
      const subject = encodeURIComponent('Opportunity — Portfolio Contact');
      const body = encodeURIComponent('Hi Aura,\n\nI saw your portfolio and would like to talk about... \n\nRegards,');
      window.location.href = `mailto:auragen2030@email.com?subject=${subject}&body=${body}`;
    });
  }

  // Accessibility: add focus outlines to keyboard users only
  (function(){
    function handleFirstTab(e){
      if(e.key === 'Tab'){
        document.documentElement.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  })();

})();
