
// AOS INITIALIZATION
AOS.init({
  duration: 800,
  offset: 100
});

// TYPED TEXT EFFECT
const textArray = [
  "Full-Stack Developer",
  "PHP & Laravel Expert",
  "ASP.NET Developer",
  "Angular Specialist",
  "Multi-Panel Systems"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.getElementById("typed-text");

function typeEffect() {
  if (!typedTextElement) return;
  
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeEffect, 500);
    return;
  }
  
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typedTextElement) {
    setTimeout(typeEffect, 500);
  }
});


// CUSTOM CURSOR (Disable on touch devices)
if (!('ontouchstart' in window)) {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .timeline-content, .contact-info-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = `scale(1.5)`;
        cursor.style.borderColor = '#6a0dad';
        cursorDot.style.transform = `scale(0.5)`;
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = `scale(1)`;
        cursor.style.borderColor = '#20c997';
        cursorDot.style.transform = `scale(1)`;
      });
    });
  }
} else {
  // Hide custom cursor on touch devices
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  if (cursor) cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
}

// DARK MODE
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('bi-moon-fill');
      themeIcon.classList.add('bi-sun-fill');
    }
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-fill');
    }
    localStorage.setItem('darkMode', 'disabled');
  }
}

if (localStorage.getItem('darkMode') === 'enabled') {
  setDarkMode(true);
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });
}

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTopBtn');

function toggleScrollButton() {
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
}

window.addEventListener('scroll', toggleScrollButton);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ACTIVE NAV LINK ON SCROLL 
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  // If no section found, set home as active
  if (current === '' && window.scrollY < 100) {
    current = 'home';
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    } else if (current === 'home' && href === '#home') {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
setActiveLink();

// SMOOTH SCROLL FOR NAV LINKS
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    }
  });
});

// SKILL PROGRESS BARS ANIMATION
const skillSection = document.querySelector('#skills');
let animated = false;

function animateProgressBars() {
  if (skillSection && !animated) {
    const rect = skillSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      animated = true;
    }
  }
}

window.addEventListener('scroll', animateProgressBars);
animateProgressBars();

// CONTACT FORM VALIDATION
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const message = this.querySelector('textarea[name="message"]');
    
    if (name && name.value.trim().length < 2) {
      e.preventDefault();
      alert('Please enter a valid name');
      name.focus();
      return false;
    }
    
    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        e.preventDefault();
        alert('Please enter a valid email address');
        email.focus();
        return false;
      }
    }
    
    if (message && message.value.trim().length < 5) {
      e.preventDefault();
      alert('Please enter a message (minimum 5 characters)');
      message.focus();
      return false;
    }
    
    const submitBtn = this.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.innerHTML = 'Sending... <i class="bi bi-hourglass-split"></i>';
      submitBtn.disabled = true;
    }
  });
}

// LAZY LOAD IMAGES WITH FADE IN
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '1';
      img.style.transition = 'opacity 0.5s ease';
      observer.unobserve(img);
    }
  });
}, { threshold: 0.1 });

images.forEach(img => {
  img.style.opacity = '0';
  imageObserver.observe(img);
});

// PAGE LOAD
window.addEventListener('load', () => {
  document.body.style.visibility = 'visible';
  console.log('Portfolio loaded successfully!');
});

// YEAR UPDATE IN FOOTER
const footerYear = document.querySelector('.footer p');
if (footerYear) {
  footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Fasih. All rights reserved.`;
}

// ========== MOBILE MENU SCROLL FIX ==========
(function() {
  let scrollPosition = 0;
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (!navbarToggler || !navbarCollapse) return;
  
  // Disable scroll on body
  function disableBodyScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = '0px';
  }
  
  // Enable scroll on body
  function enableBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }
  
  // Check if menu is open and handle scroll
  function handleMenuState() {
    if (navbarCollapse.classList.contains('show')) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }
  
  // Listen for Bootstrap collapse events
  navbarCollapse.addEventListener('show.bs.collapse', disableBodyScroll);
  navbarCollapse.addEventListener('hidden.bs.collapse', enableBodyScroll);
  
  // Handle toggler click
  navbarToggler.addEventListener('click', function() {
    setTimeout(handleMenuState, 50);
  });
  
  // Close menu when clicking on nav links (optional)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 991 && navbarCollapse.classList.contains('show')) {
        setTimeout(() => {
          enableBodyScroll();
        }, 300);
      }
    });
  });
  
  // Also handle window resize - if menu is open and screen becomes desktop, re-enable scroll
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
      enableBodyScroll();
    } else {
      // If on mobile and menu is open, keep scroll disabled
      if (navbarCollapse.classList.contains('show')) {
        disableBodyScroll();
      } else {
        enableBodyScroll();
      }
    }
  });
})();