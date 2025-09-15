document.addEventListener('DOMContentLoaded', () => {
  // Typing animation in About page
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = "Cybersecurity Analyst | Penetration Tester | Vulnerability Specialist";
    let index = 0;
    const speed = 50;

    function type() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Highlight active nav link on scroll/navigation
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Fade-in animation for sections on scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.15
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Contact form validation & submission
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2 || email.length < 5 || message.length < 10) {
        alert("Please fill all fields correctly.");
        return;
      }

      // For demo: simulate form submission
      alert("Thank you for your message! I will get back to you soon.");
      form.reset();
    });
  }
});
