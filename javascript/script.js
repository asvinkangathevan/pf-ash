$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
    });

  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });
    ScrollReveal().reveal(".experience", {
      origin: "bottom"
    });
    ScrollReveal().reveal(".experience .about-content", {
      origin: "left",
      distance: "200px"
    });
    ScrollReveal().reveal("v", {

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });


  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  const expSection = document.querySelector('#experience .about-content');
  observer.observe(expSection);


  }
  // Menu mobile toggle
const menuIcon = document.querySelector('.mobile-menu');
const navbarModern = document.querySelector('.navbar-modern');

if (menuIcon && navbarModern) {
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navbarModern.classList.toggle('active');
        
        if (navbarModern.classList.contains('active')) {
            menuIcon.innerHTML = '<i class="fa fa-times"></i>';
            createOverlay();
        } else {
            menuIcon.innerHTML = '<i class="fa fa-bars"></i>';
            removeOverlay();
        }
    });
}

function createOverlay() {
    const existingOverlay = document.querySelector('.nav-overlay');
    if (!existingOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        overlay.addEventListener('click', () => {
            navbarModern.classList.remove('active');
            menuIcon.innerHTML = '<i class="fa fa-bars"></i>';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        });
    }
}

function removeOverlay() {
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }
}

// Fermer menu au clic sur lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1200) {
            navbarModern?.classList.remove('active');
            menuIcon.innerHTML = '<i class="fa fa-bars"></i>';
            removeOverlay();
        }
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animation au défilement (optionnel)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
});

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header-area')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 30;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
  

 