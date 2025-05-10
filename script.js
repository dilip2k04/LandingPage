document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  
  if (window.matchMedia("(pointer: fine)").matches) {
      cursor.style.display = 'block';
      
      document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
      });
      
      // Cursor hover effects
      const hoverElements = document.querySelectorAll('a, button, .service-card, .blog-card, .info-item');
      
      hoverElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
              cursor.classList.add('cursor-hover');
          });
          el.addEventListener('mouseleave', () => {
              cursor.classList.remove('cursor-hover');
          });
      });
  } else {
      cursor.style.display = 'none';
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
      });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Animate stats counter
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
      statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;
          
          const timer = setInterval(() => {
              current += increment;
              stat.textContent = Math.floor(current);
              
              if (current >= target) {
                  stat.textContent = target;
                  clearInterval(timer);
              }
          }, 16);
      });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              
              // Animate stats when about section is visible
              if (entry.target.id === 'about') {
                  animateStats();
              }
              
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
  });
  
  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const formData = new FormData(this);
          const data = Object.fromEntries(formData.entries());
          
          // Here you would typically send the data to a server
          console.log('Form submitted:', data);
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          this.reset();
      });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = this.querySelector('input').value;
          console.log('Newsletter subscription:', email);
          
          // Show success message
          alert('Thank you for subscribing to our newsletter!');
          this.querySelector('input').value = '';
      });
  }
  
  // Image hover effects
  const hoverImages = document.querySelectorAll('.home-image, .about-image, .blog-image img');
  hoverImages.forEach(img => {
      img.parentElement.addEventListener('mousemove', (e) => {
          const rect = img.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          img.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      img.parentElement.addEventListener('mouseleave', () => {
          img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
  });
  
  // Initialize animations
  document.querySelectorAll('.service-card, .blog-card, .info-item').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
  });
});