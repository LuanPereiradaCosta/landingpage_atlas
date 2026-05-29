const menuButton = document.querySelector('.site-header__toggle');
const mainNavigation = document.querySelector('.site-header__nav');
const siteHeader = document.querySelector('.site-header');
const servicesDropdown = document.querySelector('.site-header__dropdown');
const servicesButton = document.querySelector('.site-header__dropdown-button');
const clientAreaButton = document.querySelector('.site-header__social');
const heroSection = document.querySelector('.hero');
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
const heroReviewLeaveDuration = 600;
const heroReviewEnterDelay = 1450;
const heroSlideChangeDelay = 1040;

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

  siteHeader.classList.toggle('is-scrolled', pageWasScrolled);
};

const showHeroSlide = (slideIndex) => {
  if (!heroSlides.length) {
    return;
  }

  const totalHeroSlides = heroSlides.length;
  const nextActiveSlide = (slideIndex + totalHeroSlides) % totalHeroSlides;
  const previousActiveHeroSlide = activeHeroSlide;
  const currentPreviousSlide = (previousActiveHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  const upcomingNextSlide = (nextActiveSlide + 1) % totalHeroSlides;
  const heroSlideIsChanging = previousActiveHeroSlide !== nextActiveSlide;

  const clearHeroSlideTimer = (slide, timerName) => {
    if (slide && slide[timerName]) {
      window.clearTimeout(slide[timerName]);
      slide[timerName] = null;
    }
  };

  if (!heroSlideIsChanging) {
    heroSlides.forEach((slide, index) => {
      clearHeroSlideTimer(slide, 'heroShrinkTimer');
      clearHeroSlideTimer(slide, 'heroEjectTimer');
      clearHeroSlideTimer(slide, 'heroActivateTimer');

      slide.classList.remove('is-active', 'is-previous', 'is-next', 'is-shrinking', 'is-ejecting');

      if (index === nextActiveSlide) {
        slide.classList.add('is-active');
      } else if (index === (nextActiveSlide - 1 + totalHeroSlides) % totalHeroSlides) {
        slide.classList.add('is-previous');
      } else if (index === (nextActiveSlide + 1) % totalHeroSlides) {
        slide.classList.add('is-next');
      }
    });
  } else {
    const shrinkingSlide = heroSlides[previousActiveHeroSlide];
    const ejectingSlide = heroSlides[currentPreviousSlide];
    const enteringSlide = heroSlides[nextActiveSlide];
    const reservedNextSlide = heroSlides[upcomingNextSlide];

    heroSlides.forEach((slide, index) => {
      clearHeroSlideTimer(slide, 'heroActivateTimer');

      const slideMustStayInCycle =
        index === previousActiveHeroSlide ||
        index === currentPreviousSlide ||
        index === nextActiveSlide ||
        index === upcomingNextSlide;

      if (!slideMustStayInCycle) {
        clearHeroSlideTimer(slide, 'heroShrinkTimer');
        clearHeroSlideTimer(slide, 'heroEjectTimer');
        slide.classList.remove('is-active', 'is-previous', 'is-next', 'is-shrinking', 'is-ejecting');
      }
    });

    if (ejectingSlide) {
      clearHeroSlideTimer(ejectingSlide, 'heroEjectTimer');
    }

    if (enteringSlide) {
      clearHeroSlideTimer(enteringSlide, 'heroActivateTimer');
      enteringSlide.classList.remove('is-active', 'is-previous', 'is-shrinking', 'is-ejecting');
      if (!enteringSlide.classList.contains('is-next')) {
        enteringSlide.classList.add('is-next');
      }
    }

    if (shrinkingSlide) {
      clearHeroSlideTimer(shrinkingSlide, 'heroShrinkTimer');
      shrinkingSlide.classList.remove('is-active', 'is-previous', 'is-next', 'is-ejecting');
      shrinkingSlide.classList.add('is-shrinking');

      shrinkingSlide.heroShrinkTimer = window.setTimeout(() => {
        shrinkingSlide.classList.remove('is-shrinking');
        shrinkingSlide.classList.add('is-previous');
        shrinkingSlide.heroShrinkTimer = null;

        if (ejectingSlide) {
          ejectingSlide.classList.remove('is-active', 'is-previous', 'is-next', 'is-shrinking');
          ejectingSlide.classList.add('is-ejecting');

          ejectingSlide.heroEjectTimer = window.setTimeout(() => {
            ejectingSlide.classList.remove('is-ejecting');
            ejectingSlide.heroEjectTimer = null;
          }, 960);
        }

        if (enteringSlide) {
          enteringSlide.classList.remove('is-next', 'is-previous', 'is-shrinking', 'is-ejecting');
          enteringSlide.classList.add('is-active');
        }

        if (
          reservedNextSlide &&
          reservedNextSlide !== enteringSlide &&
          reservedNextSlide !== shrinkingSlide
        ) {
          reservedNextSlide.heroActivateTimer = window.setTimeout(() => {
            clearHeroSlideTimer(reservedNextSlide, 'heroActivateTimer');
            reservedNextSlide.classList.remove('is-active', 'is-previous', 'is-next', 'is-shrinking', 'is-ejecting');
            reservedNextSlide.classList.add('is-next');
            reservedNextSlide.heroActivateTimer = null;
          }, 60);
        }
      }, 320);
    }
  }

  activeHeroSlide = nextActiveSlide;

  const previousHeroSlide = (activeHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  const nextHeroSlide = (activeHeroSlide + 1) % totalHeroSlides;

  heroReviews.forEach((review, index) => {
    review.classList.remove('is-active', 'is-previous', 'is-next', 'is-waiting');

    if (review.heroLeaveTimer) {
      window.clearTimeout(review.heroLeaveTimer);
      review.heroLeaveTimer = null;
    }

    if (review.heroEnterTimer) {
      window.clearTimeout(review.heroEnterTimer);
      review.heroEnterTimer = null;
    }

    const reviewIsLeaving = index === previousActiveHeroSlide && heroSlideIsChanging;
    const reviewIsEntering = index === activeHeroSlide;

    if (reviewIsEntering && !heroSlideIsChanging) {
      review.classList.remove('is-leaving');
      review.classList.add('is-active');
    } else if (reviewIsEntering) {
      review.classList.remove('is-leaving');
      review.classList.add('is-waiting');

      review.heroEnterTimer = window.setTimeout(() => {
        review.classList.remove('is-waiting');
        review.classList.add('is-active');
        review.heroEnterTimer = null;
      }, heroReviewEnterDelay);
    } else if (reviewIsLeaving) {
      review.classList.add('is-leaving');

      review.heroLeaveTimer = window.setTimeout(() => {
        review.classList.remove('is-leaving');
        review.heroLeaveTimer = null;
      }, heroReviewLeaveDuration);
    } else if (index === previousHeroSlide) {
      review.classList.add('is-previous');
    } else if (index === nextHeroSlide) {
      review.classList.add('is-next');
    } else {
      review.classList.remove('is-leaving');
    }
  });
};

const scheduleHeroSlide = (slideIndex) => {
  if (!heroSlides.length) {
    showHeroSlide(slideIndex);
    return;
  }

  const nextActiveSlide = (slideIndex + heroSlides.length) % heroSlides.length;

  if (nextActiveSlide === activeHeroSlide) {
    showHeroSlide(slideIndex);
    return;
  }

  window.setTimeout(() => {
    showHeroSlide(slideIndex);
  }, heroSlideChangeDelay);
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
  const institutionalHeaderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        siteHeader.classList.add('is-institutional');
      } else {
        siteHeader.classList.remove('is-institutional');
      }
    });
  }, {
    rootMargin: '-68px 0px -78% 0px',
    threshold: 0
  });

  institutionalHeaderObserver.observe(institutionalSection);

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
  const differentialsHeaderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        siteHeader.classList.remove('is-institutional');
        siteHeader.classList.add('is-differentials');
      } else {
        siteHeader.classList.remove('is-differentials');
      }
    });
  }, {
    rootMargin: '-68px 0px -78% 0px',
    threshold: 0
  });

  differentialsHeaderObserver.observe(differentialsSection);

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
    scheduleHeroSlide(activeHeroSlide + 1);
  }, 4600);
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
