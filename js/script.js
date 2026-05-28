const menuButton = document.querySelector('.site-header__toggle');
const mainNavigation = document.querySelector('.site-header__nav');
const siteHeader = document.querySelector('.site-header');
const servicesDropdown = document.querySelector('.site-header__dropdown');
const servicesButton = document.querySelector('.site-header__dropdown-button');
const heroSection = document.querySelector('.hero');
const heroSlidesTrack = document.querySelector('.hero__slides');
const heroSlides = document.querySelectorAll('.hero__slide');
const heroReviews = document.querySelectorAll('.hero__review');
const institutionalSection = document.querySelector('.institutional-section');
const institutionalSlides = document.querySelectorAll('.institutional-section__slide');
const institutionalCurrent = document.querySelector('[data-institutional-current]');
const institutionalTotal = document.querySelector('[data-institutional-total]');
const institutionalPreviousButton = document.querySelector('[data-institutional-prev]');
const institutionalNextButton = document.querySelector('[data-institutional-next]');
const differentialsSection = document.querySelector('.differentials-section');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeHeroSlide = 0;
let activeInstitutionalSlide = 0;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scrollToPageTop = () => {
  const pageElement = document.documentElement;
  const originalScrollBehavior = pageElement.style.scrollBehavior;

  pageElement.style.scrollBehavior = 'auto';

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });

  pageElement.style.scrollBehavior = originalScrollBehavior;
};

window.addEventListener('pageshow', scrollToPageTop);

window.addEventListener('load', () => {
  scrollToPageTop();

  window.setTimeout(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  }, 1200);
});

const updateHeaderBackground = () => {
  const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
  const scrollLimit = heroSection ? heroSection.offsetHeight - headerHeight : 120;
  const pageWasScrolled = window.scrollY > scrollLimit;
  let institutionalSectionIsActive = false;

  if (institutionalSection) {
    const institutionalArea = institutionalSection.getBoundingClientRect();

    institutionalSectionIsActive = institutionalArea.top <= headerHeight + 1 && institutionalArea.bottom > headerHeight + 120;
  }

  siteHeader.classList.toggle('is-scrolled', pageWasScrolled);
  siteHeader.classList.toggle('is-institutional', institutionalSectionIsActive);
};

const showHeroSlide = (slideIndex) => {
  if (!heroSlides.length) {
    return;
  }

  const nextActiveSlide = (slideIndex + heroSlides.length) % heroSlides.length;
  const previousHeroSlide = (nextActiveSlide - 1 + heroSlides.length) % heroSlides.length;
  const nextHeroSlide = (nextActiveSlide + 1) % heroSlides.length;

  if (heroSlidesTrack && nextActiveSlide !== activeHeroSlide) {
    heroSlidesTrack.classList.add('is-moving');

    heroReviews.forEach((review) => {
      review.classList.add('is-moving');
    });

    window.setTimeout(() => {
      heroSlidesTrack.classList.remove('is-moving');

      heroReviews.forEach((review) => {
        review.classList.remove('is-moving');
      });
    }, 900);
  }

  activeHeroSlide = nextActiveSlide;

  heroSlides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === activeHeroSlide);
    slide.classList.toggle('is-previous', index === previousHeroSlide);
    slide.classList.toggle('is-next', index === nextHeroSlide);
  });

  heroReviews.forEach((review, index) => {
    review.classList.toggle('is-active', index === activeHeroSlide);
    review.classList.toggle('is-previous', index === previousHeroSlide);
    review.classList.toggle('is-next', index === nextHeroSlide);
  });

};

const formatSlideNumber = (slideNumber) => String(slideNumber).padStart(2, '0');

const showInstitutionalSlide = (slideIndex) => {
  if (!institutionalSlides.length) {
    return;
  }

  const nextInstitutionalSlide = (slideIndex + institutionalSlides.length) % institutionalSlides.length;
  const previousInstitutionalSlide = activeInstitutionalSlide;
  const previousSlide = institutionalSlides[previousInstitutionalSlide];

  if (nextInstitutionalSlide !== previousInstitutionalSlide) {
    previousSlide.classList.add('is-leaving');

    window.setTimeout(() => {
      previousSlide.classList.remove('is-active');
      previousSlide.classList.add('is-leaving-out');
    }, 30);

    window.setTimeout(() => {
      previousSlide.classList.remove('is-leaving');
      previousSlide.classList.remove('is-leaving-out');
    }, 1900);
  }

  activeInstitutionalSlide = nextInstitutionalSlide;

  institutionalSlides.forEach((slide, index) => {
    if (index === activeInstitutionalSlide) {
      slide.classList.add('is-active');
      slide.classList.remove('is-leaving');
      slide.classList.remove('is-leaving-out');

      return;
    }

    if (index !== previousInstitutionalSlide) {
      slide.classList.remove('is-active');
      slide.classList.remove('is-leaving');
      slide.classList.remove('is-leaving-out');
    }
  });

  if (institutionalCurrent) {
    institutionalCurrent.textContent = formatSlideNumber(activeInstitutionalSlide + 1);
  }
};

if (institutionalTotal) {
  institutionalTotal.textContent = formatSlideNumber(institutionalSlides.length);
}

if (institutionalPreviousButton) {
  institutionalPreviousButton.addEventListener('click', () => {
    showInstitutionalSlide(activeInstitutionalSlide - 1);
  });
}

if (institutionalNextButton) {
  institutionalNextButton.addEventListener('click', () => {
    showInstitutionalSlide(activeInstitutionalSlide + 1);
  });
}

if (institutionalSection) {
  const institutionalTextObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        institutionalSection.classList.add('is-visible');
      } else {
        institutionalSection.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.35
  });

  institutionalTextObserver.observe(institutionalSection);
}

if (differentialsSection) {
  const differentialsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        differentialsSection.classList.add('is-visible');
      } else {
        differentialsSection.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.3
  });

  differentialsObserver.observe(differentialsSection);
}

menuButton.addEventListener('click', () => {
  const menuIsOpen = mainNavigation.classList.toggle('is-open');

  menuButton.setAttribute('aria-expanded', menuIsOpen);
  menuButton.setAttribute('aria-label', menuIsOpen ? 'Fechar menu' : 'Abrir menu');
});

servicesButton.addEventListener('click', () => {
  const servicesMenuIsOpen = servicesDropdown.classList.toggle('is-open');

  servicesButton.setAttribute('aria-expanded', servicesMenuIsOpen);
});

document.addEventListener('click', (event) => {
  const clickWasInsideServices = servicesDropdown.contains(event.target);

  if (!clickWasInsideServices) {
    servicesDropdown.classList.remove('is-open');
    servicesButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchorLink) => {
  anchorLink.addEventListener('click', (event) => {
    const targetId = anchorLink.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: reducedMotionQuery.matches ? 'auto' : 'smooth'
    });

    mainNavigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');

    servicesDropdown.classList.remove('is-open');
    servicesButton.setAttribute('aria-expanded', 'false');
  });
});

if (heroSection) {
  heroSection.addEventListener('mousemove', (event) => {
    const heroArea = heroSection.getBoundingClientRect();
    const mouseX = ((event.clientX - heroArea.left) / heroArea.width) * 100;
    const mouseY = ((event.clientY - heroArea.top) / heroArea.height) * 100;

    heroSection.style.setProperty('--hero-x', `${mouseX}%`);
    heroSection.style.setProperty('--hero-y', `${mouseY}%`);
  });

  window.setInterval(() => {
    showHeroSlide(activeHeroSlide + 1);
  }, 5200);
}

if (institutionalSlides.length && !reducedMotionQuery.matches) {
  window.setInterval(() => {
    showInstitutionalSlide(activeInstitutionalSlide + 1);
  }, 8800);
}

updateHeaderBackground();
showHeroSlide(activeHeroSlide);
showInstitutionalSlide(activeInstitutionalSlide);

window.addEventListener('scroll', updateHeaderBackground);
window.addEventListener('resize', updateHeaderBackground);
