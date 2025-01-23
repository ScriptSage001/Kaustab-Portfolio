(function() {
  "use strict";

  // /**
  //  * Toggle Theme
  //  */
  // document.addEventListener("DOMContentLoaded", () => {
  //   const themeToggleButton = document.getElementById("theme-toggle");
  //   const themeIcon = document.getElementById("theme-icon");
  //   const currentTheme = localStorage.getItem("theme");
  
  //   if (currentTheme) {
  //     document.documentElement.setAttribute("data-theme", currentTheme);
  //     themeIcon.className = currentTheme === "light" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  //   }
  
  //   themeToggleButton.addEventListener("click", () => {
  //     const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
  //     const newTheme = isLightMode ? "dark" : "light";
  
  //     // Set the new theme
  //     document.documentElement.setAttribute("data-theme", newTheme);
  //     localStorage.setItem("theme", newTheme);
  
  //     // Update the icon
  //     themeIcon.className = newTheme === "light" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  //   });
  // });

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  let scrollTopText = document.querySelector('.scroll-top-text');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      if (!scrollTop.classList.contains('active')) {
        scrollTopText.style.visibility = 'hidden';
        scrollTopText.style.opacity = '0';
      }
    }
  }
  
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);


  scrollTop.addEventListener('mouseenter', () => {
    scrollTopText.style.visibility = 'visible';
    scrollTopText.style.opacity = '1';
  });

  scrollTop.addEventListener('mouseleave', () => {
    scrollTopText.style.visibility = 'hidden';
    scrollTopText.style.opacity = '0';
  });

  /**
   * Scroll Progress Bar
   */

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
  
    const progressBar = document.getElementById("scroll-progress");
    progressBar.style.width = `${scrollPercentage}%`;
  }); 

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /** 
   * Dynamically Calculate the Experience
   */
  
  const joiningDate = new Date('2022-03-07');

  // Function to calculate experience in years
  function calculateExperience(startDate) {
    const currentDate = new Date();
    let diffInMs = currentDate.getTime() - startDate.getTime();
    let diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return parseFloat(diffInYears.toFixed(1));
  }

  // Update the experience span
  if (document.getElementById('experience')) {
    document.getElementById('experience').textContent = calculateExperience(joiningDate);
  }

  /** 
   * Dynamically Calculate the Current Year
   */
  function calculateCurrentYear() {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    return year;
  }

  // Update the currentYear span
  if (document.getElementById('current-year')) {
    document.getElementById('current-year').textContent = calculateCurrentYear();
  }

  /** 
   * Contact Form Submition
   */

  const form = document.getElementById('form');
  if (form) {
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      message.innerHTML = "Please wait...";
      message.classList.add('loading', 'show-message');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            message.innerHTML = "Message sent successfully!";
            message.classList.remove('loading');
            message.classList.add('sent-message');
          } else {
            console.log(response);
            message.innerHTML = json.message;
            message.classList.remove('loading');
            message.classList.add('error-message');
          }
        })
        .catch(error => {
          console.log(error);
          message.innerHTML = "Something went wrong!";
          message.classList.add('loading');
          message.classList.add('error-message');
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            message.innerHTML = null;
            message.className = '';
          }, 3000);
        });
    });
  }

  document.querySelectorAll('.chevron-btn').forEach(x => {
    x.addEventListener('click', function() {
      x.classList.toggle('bi-chevron-up');
      x.classList.toggle('bi-chevron-down');
    }, false);
  });

})();