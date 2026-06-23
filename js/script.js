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
const institutionalTexts = document.querySelectorAll('[data-institutional-text]');
const institutionalCurrent = document.querySelector('[data-institutional-current]');
const institutionalTotal = document.querySelector('[data-institutional-total]');
const institutionalPreviousButton = document.querySelector('[data-institutional-prev]');
const institutionalNextButton = document.querySelector('[data-institutional-next]');
const differentialsSection = document.querySelector('.differentials-section');
const specialtiesSection = document.querySelector('.specialties-section');
const contactSection = document.querySelector('.contact-section');
const specialtiesTrack = document.querySelector('[data-specialties-track]');
const specialtiesPrevButton = document.querySelector('[data-specialties-prev]');
const specialtiesNextButton = document.querySelector('[data-specialties-next]');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeHeroSlide = 0;
let activeInstitutionalSlide = 0;
const heroReviewLeaveDuration = 680;
const heroReviewEnterDelay = 960;
const heroSlideChangeDelay = 900;
const pageLeaveDuration = reducedMotionQuery.matches ? 120 : 520;
let pageIsLeaving = false;

const setupPremiumSpecialtyHeroTyping = () => {
  const specialtyPage = document.querySelector('.specialty-page--premium');
  const specialtyHero = specialtyPage ? specialtyPage.querySelector('.specialty-page__hero') : null;
  const specialtyTitle = specialtyHero ? specialtyHero.querySelector('.specialty-page__title') : null;
  const specialtyText = specialtyHero ? specialtyHero.querySelector('.specialty-page__text') : null;

  if (!specialtyTitle || !specialtyText) {
    return;
  }

  const fullTitleText = specialtyTitle.textContent.trim();

  const showCompleteTitle = () => {
    specialtyTitle.textContent = fullTitleText;
    specialtyHero.classList.remove('is-typing', 'is-typing-done');
    specialtyHero.classList.add('is-title-complete');
    specialtyText.classList.add('is-visible');
  };

  if (reducedMotionQuery.matches) {
    showCompleteTitle();
    return;
  }

  const titleCursor = document.createElement('span');
  titleCursor.className = 'specialty-page__title-cursor';
  titleCursor.setAttribute('aria-hidden', 'true');

  specialtyTitle.setAttribute('aria-label', fullTitleText);
  specialtyTitle.textContent = '';
  specialtyTitle.appendChild(titleCursor);
  specialtyHero.classList.add('is-typing');

  const titleCharacters = Array.from(fullTitleText);
  const typingDelay = 36;
  let currentCharacterIndex = 0;

  const finishTyping = () => {
    specialtyHero.classList.remove('is-typing');
    specialtyHero.classList.add('is-typing-done');
    specialtyText.classList.add('is-visible');

    window.setTimeout(() => {
      titleCursor.remove();
      specialtyHero.classList.remove('is-typing-done');
      specialtyHero.classList.add('is-title-complete');
    }, 1500);
  };

  const typeNextCharacter = () => {
    if (currentCharacterIndex >= titleCharacters.length) {
      finishTyping();
      return;
    }

    specialtyTitle.insertBefore(
      document.createTextNode(titleCharacters[currentCharacterIndex]),
      titleCursor
    );
    currentCharacterIndex += 1;
    window.setTimeout(typeNextCharacter, typingDelay);
  };

  const startTyping = () => {
    window.setTimeout(typeNextCharacter, 180);
  };

  if (document.readyState === 'complete') {
    window.setTimeout(startTyping, 1320);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(startTyping, 1320);
    }, { once: true });
  }
};

const setupPremiumSpecialtyHeroBackground = () => {
  const specialtyHeroImages = document.querySelectorAll('.specialty-page--premium .specialty-page__hero-bg-image');

  if (specialtyHeroImages.length <= 1 || reducedMotionQuery.matches) {
    return;
  }

  let activeSpecialtyHeroImage = 0;

  window.setInterval(() => {
    specialtyHeroImages[activeSpecialtyHeroImage].classList.remove('is-active');
    activeSpecialtyHeroImage = (activeSpecialtyHeroImage + 1) % specialtyHeroImages.length;
    specialtyHeroImages[activeSpecialtyHeroImage].classList.add('is-active');
  }, 5200);
};

const setupPremiumSpecialtyArticleReveal = () => {
  const specialtyArticleElements = document.querySelectorAll(
    '.specialty-page--premium .specialty-article__intro, .specialty-page--premium .specialty-article__feature-media, .specialty-page--premium .specialty-article__body, .specialty-page--premium .specialty-article__note, .specialty-page--premium .specialty-article__highlights'
  );

  if (!specialtyArticleElements.length) {
    return;
  }

  if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
    specialtyArticleElements.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const technologyArticleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.18
  });

  specialtyArticleElements.forEach((element) => {
    technologyArticleObserver.observe(element);
  });
};

const setupCompanyOpeningServiceReveal = () => {
  const serviceRevealElements = document.querySelectorAll('.service-page--company-opening [data-service-reveal]');

  if (!serviceRevealElements.length) {
    return;
  }

  if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
    serviceRevealElements.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const startServiceReveal = () => {
    const serviceRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.16
    });

    serviceRevealElements.forEach((element) => {
      serviceRevealObserver.observe(element);
    });
  };

  const scheduleServiceReveal = () => {
    window.setTimeout(startServiceReveal, 1680);
  };

  if (document.readyState === 'complete') {
    scheduleServiceReveal();
  } else {
    window.addEventListener('load', scheduleServiceReveal, { once: true });
  }
};

const setupAboutPageReveal = () => {
  const aboutRevealElements = document.querySelectorAll('[data-about-reveal]');

  if (!aboutRevealElements.length) {
    return;
  }

  const revealAboutElements = () => {
    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      aboutRevealElements.forEach((element) => {
        element.classList.add('is-visible');
      });
      return;
    }

    const aboutRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.14
    });

    aboutRevealElements.forEach((element) => {
      aboutRevealObserver.observe(element);
    });
  };

  if (document.readyState === 'complete') {
    window.setTimeout(revealAboutElements, 80);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(revealAboutElements, 1280);
    }, { once: true });
  }
};

setupPremiumSpecialtyHeroTyping();
setupPremiumSpecialtyHeroBackground();
setupPremiumSpecialtyArticleReveal();
setupCompanyOpeningServiceReveal();
setupAboutPageReveal();

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const linkShouldUsePageTransition = (link, event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  if (
    link.hasAttribute('download') ||
    (link.target && link.target.toLowerCase() !== '_self')
  ) {
    return false;
  }

  const rawHref = link.getAttribute('href');

  if (!rawHref || rawHref.trim() === '#' || rawHref.trim().startsWith('#')) {
    return false;
  }

  let linkUrl;

  try {
    linkUrl = new URL(rawHref, window.location.href);
  } catch {
    return false;
  }

  const currentUrl = new URL(window.location.href);
  const blockedProtocols = ['mailto:', 'tel:', 'sms:', 'javascript:'];
  const blockedHosts = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'];
  const linkPath = linkUrl.pathname.toLowerCase();
  const currentPath = currentUrl.pathname.toLowerCase();

  if (
    blockedProtocols.includes(linkUrl.protocol) ||
    blockedHosts.includes(linkUrl.hostname.toLowerCase()) ||
    linkUrl.origin !== currentUrl.origin ||
    !linkPath.endsWith('.html') ||
    (linkPath === currentPath && linkUrl.hash)
  ) {
    return false;
  }

  return true;
};

document.addEventListener('click', (event) => {
  const clickedLink = event.target instanceof Element
    ? event.target.closest('a[href]')
    : null;

  if (!clickedLink || !linkShouldUsePageTransition(clickedLink, event)) {
    return;
  }

  event.preventDefault();

  if (pageIsLeaving) {
    return;
  }

  pageIsLeaving = true;
  document.body.classList.add('is-page-leaving');

  window.setTimeout(() => {
    window.location.href = clickedLink.href;
  }, pageLeaveDuration);
});

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

window.addEventListener('pageshow', () => {
  pageIsLeaving = false;
  document.body.classList.remove('is-page-leaving');
  scrollToPageTop();
});

window.addEventListener('load', () => {
  scrollToPageTop();

  window.setTimeout(() => {
    document.body.classList.remove('is-page-leaving');
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

  institutionalTexts.forEach((text, index) => {
    const isActiveText = index === activeInstitutionalSlide;

    text.classList.toggle('is-active', isActiveText);
    text.setAttribute('aria-hidden', String(!isActiveText));
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

if (specialtiesSection) {
  const specialtiesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        specialtiesSection.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.28
  });

  specialtiesObserver.observe(specialtiesSection);
}

if (specialtiesTrack) {
  const originalSpecialtyCards = [...specialtiesTrack.querySelectorAll('.specialty-card')];
  const specialtyCloneCopies = 2;

  for (let copyIndex = 0; copyIndex < specialtyCloneCopies; copyIndex += 1) {
    originalSpecialtyCards.slice().reverse().forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.specialtyClone = 'true';
      specialtiesTrack.prepend(clone);
    });
  }

  for (let copyIndex = 0; copyIndex < specialtyCloneCopies; copyIndex += 1) {
    originalSpecialtyCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.specialtyClone = 'true';
      specialtiesTrack.appendChild(clone);
    });
  }

  const getCardWidth = () => {
    const cards = [...specialtiesTrack.querySelectorAll('.specialty-card')];
    const firstOriginalCardIndex = cards.findIndex((card) => !card.dataset.specialtyClone);
    const firstCardIndex = firstOriginalCardIndex >= 0 ? firstOriginalCardIndex : 0;
    const firstCard = cards[firstCardIndex];
    const secondCard = cards[firstCardIndex + 1];

    if (!firstCard) return 300;

    if (secondCard) {
      return secondCard.offsetLeft - firstCard.offsetLeft;
    }

    const trackStyles = window.getComputedStyle(specialtiesTrack);
    const trackGap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 16;

    return firstCard.offsetWidth + trackGap;
  };

  const getLoopWidth = () => getCardWidth() * originalSpecialtyCards.length;
  let scrollAnimationTimer = null;
  let resumeAutoScrollTimer = null;

  const jumpToPosition = (leftPosition) => {
    specialtiesTrack.style.scrollBehavior = 'auto';
    specialtiesTrack.scrollLeft = leftPosition;

    window.requestAnimationFrame(() => {
      specialtiesTrack.style.scrollBehavior = '';
    });
  };

  const moveToLoopStart = () => {
    jumpToPosition(getLoopWidth() * specialtyCloneCopies);
  };

  const normalizeInfiniteScrollPosition = () => {
    const loopWidth = getLoopWidth();

    if (!loopWidth) return;

    let normalizedPosition = specialtiesTrack.scrollLeft;
    const minLoopPosition = loopWidth * specialtyCloneCopies;
    const maxLoopPosition = loopWidth * (specialtyCloneCopies + 1);

    while (normalizedPosition < minLoopPosition) {
      normalizedPosition += loopWidth;
    }

    while (normalizedPosition >= maxLoopPosition) {
      normalizedPosition -= loopWidth;
    }

    if (Math.abs(normalizedPosition - specialtiesTrack.scrollLeft) > 1) {
      jumpToPosition(normalizedPosition);
    }
  };

  window.requestAnimationFrame(moveToLoopStart);

  const moveSpecialtiesCarousel = (direction) => {
    specialtiesTrack.scrollTo({
      left: specialtiesTrack.scrollLeft + (getCardWidth() * direction),
      behavior: reducedMotionQuery.matches ? 'auto' : 'smooth'
    });

    window.clearTimeout(scrollAnimationTimer);
    scrollAnimationTimer = window.setTimeout(
      normalizeInfiniteScrollPosition,
      reducedMotionQuery.matches ? 0 : 900
    );
  };

  if (specialtiesPrevButton) {
    specialtiesPrevButton.addEventListener('click', () => {
      pauseAutoScroll();
      moveSpecialtiesCarousel(-1);
    });
  }

  if (specialtiesNextButton) {
    specialtiesNextButton.addEventListener('click', () => {
      pauseAutoScroll();
      moveSpecialtiesCarousel(1);
    });
  }

  let autoScrollInterval = null;
  let isUserInteracting = false;

  const startAutoScroll = () => {
    if (reducedMotionQuery.matches) return;

    window.clearInterval(autoScrollInterval);

    autoScrollInterval = window.setInterval(() => {
      if (isUserInteracting) return;

      moveSpecialtiesCarousel(1);
    }, 3200);
  };

  const pauseAutoScroll = () => {
    isUserInteracting = true;
    window.clearInterval(autoScrollInterval);
    window.clearTimeout(resumeAutoScrollTimer);

    resumeAutoScrollTimer = window.setTimeout(() => {
      isUserInteracting = false;
      startAutoScroll();
    }, 6000);
  };

  let isDragging = false;
  let dragStartX = 0;
  let dragScrollLeft = 0;

  specialtiesTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.pageX - specialtiesTrack.offsetLeft;
    dragScrollLeft = specialtiesTrack.scrollLeft;
    specialtiesTrack.classList.add('is-dragging');
    pauseAutoScroll();
  });

  specialtiesTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    specialtiesTrack.classList.remove('is-dragging');
    normalizeInfiniteScrollPosition();
  });

  specialtiesTrack.addEventListener('mouseup', () => {
    isDragging = false;
    specialtiesTrack.classList.remove('is-dragging');
    normalizeInfiniteScrollPosition();
  });

  specialtiesTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - specialtiesTrack.offsetLeft;
    const walk = (x - dragStartX) * 1.2;
    specialtiesTrack.scrollLeft = dragScrollLeft - walk;
  });

  specialtiesTrack.addEventListener('touchstart', pauseAutoScroll, { passive: true });
  specialtiesTrack.addEventListener('touchend', () => {
    window.setTimeout(normalizeInfiniteScrollPosition, 120);
  });
  specialtiesTrack.addEventListener('scrollend', normalizeInfiniteScrollPosition);

  let specialtiesScrollTimer = null;
  specialtiesTrack.addEventListener('scroll', () => {
    window.clearTimeout(specialtiesScrollTimer);
    specialtiesScrollTimer = window.setTimeout(normalizeInfiniteScrollPosition, 160);
  });

  let specialtiesResizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(specialtiesResizeTimer);
    specialtiesResizeTimer = window.setTimeout(() => {
      moveToLoopStart();
    }, 160);
  });

  startAutoScroll();
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
    let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    if (targetId === '#contato') {
      const contactButton = targetElement.querySelector('.contact-section__cta');
      const availableViewportHeight = window.innerHeight - headerHeight;

      if (contactButton && targetElement.offsetHeight > availableViewportHeight) {
        const sectionTopPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const preferredSectionTop = Math.max(
          0,
          headerHeight + ((availableViewportHeight - targetElement.offsetHeight) / 2)
        );
        const buttonBottomPosition = contactButton.getBoundingClientRect().bottom + window.scrollY;
        const centeredPosition = sectionTopPosition - preferredSectionTop;
        const buttonBottomAfterCenter = buttonBottomPosition - centeredPosition;

        targetPosition = centeredPosition;

        if (buttonBottomAfterCenter > window.innerHeight - 40) {
          targetPosition += buttonBottomAfterCenter - (window.innerHeight - 40);
        }
      }
    }

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

const contactSteps = document.querySelectorAll('.contact-step');
const contactMockupSection = document.querySelector('.contact-section__mockup');
const mockupMessages = document.querySelectorAll('[data-mockup-messages] .contact-mockup__msg');
const mockupMessagesMobile = document.querySelectorAll('[data-mockup-messages-mobile] .contact-mockup__msg');
const mockupInput = document.querySelector('[data-mockup-input]');
const mockupInputMobile = document.querySelector('[data-mockup-input-mobile]');

const contactStepMessages = [
  [],
  [0],
  [0, 1],
  [0, 1, 2, 3]
];

const contactInputTexts = [
  '',
  'Olá, gostaria de saber mais...',
  '',
  ''
];

let contactAutoTimer = null;
let activeContactStep = 0;
let isContactSectionVisible = false;
const contactStepInterval = 2600;

const showContactStep = (stepIndex) => {
  if (!contactSteps.length) return;

  const total = contactSteps.length;
  const index = (stepIndex + total) % total;

  contactSteps.forEach((step, i) => {
    const isActive = i === index;
    step.classList.toggle('is-active', isActive);
    step.querySelector('.contact-step__button').setAttribute('aria-expanded', isActive);
  });

  const visibleMessages = contactStepMessages[index] || [];

  mockupMessages.forEach((msg, i) => {
    msg.classList.toggle('is-visible', visibleMessages.includes(i));
  });

  mockupMessagesMobile.forEach((msg, i) => {
    msg.classList.toggle('is-visible', visibleMessages.includes(i));
  });

  if (mockupInput) {
    mockupInput.textContent = contactInputTexts[index] || '';
  }

  if (mockupInputMobile) {
    mockupInputMobile.textContent = contactInputTexts[index] || '';
  }

  if (contactMockupSection) {
    contactMockupSection.classList.toggle('show-mobile', index >= 2);
  }

  activeContactStep = index;
};

const startContactAutoPlay = () => {
  if (reducedMotionQuery.matches) return;
  if (!isContactSectionVisible) return;

  window.clearInterval(contactAutoTimer);

  contactAutoTimer = window.setInterval(() => {
    if (!isContactSectionVisible) {
      stopContactAutoPlay();
      return;
    }

    showContactStep(activeContactStep + 1);
  }, contactStepInterval);
};

const stopContactAutoPlay = () => {
  window.clearInterval(contactAutoTimer);
  contactAutoTimer = null;
};

const resetContactAutoPlay = () => {
  stopContactAutoPlay();
  startContactAutoPlay();
};

if (contactSection) {
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isContactSectionVisible = true;
        contactSection.classList.add('is-visible');
        stopContactAutoPlay();
        showContactStep(0);
        startContactAutoPlay();
      } else {
        isContactSectionVisible = false;
        stopContactAutoPlay();
        showContactStep(0);
      }
    });
  }, {
    threshold: 0.28
  });

  contactObserver.observe(contactSection);
}

if (contactSteps.length) {
  contactSteps.forEach((step) => {
    step.querySelector('.contact-step__button').addEventListener('click', () => {
      const stepIndex = parseInt(step.getAttribute('data-step'), 10);
      showContactStep(stepIndex);
      if (isContactSectionVisible) {
        resetContactAutoPlay();
      }
    });
  });

  showContactStep(0);
}

updateHeaderBackground();
showHeroSlide(activeHeroSlide);
showInstitutionalSlide(activeInstitutionalSlide);

window.addEventListener('scroll', updateHeaderBackground);
window.addEventListener('resize', updateHeaderBackground);
