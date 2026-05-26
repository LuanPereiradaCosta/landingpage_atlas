const menuButton = document.querySelector('.site-header__toggle');
const mainNavigation = document.querySelector('.site-header__nav');
const siteHeader = document.querySelector('.site-header');
const servicesDropdown = document.querySelector('.site-header__dropdown');
const servicesButton = document.querySelector('.site-header__dropdown-button');
const heroSection = document.querySelector('.hero');
const heroSlidesTrack = document.querySelector('.hero__slides');
const heroSlides = document.querySelectorAll('.hero__slide');
const heroReviews = document.querySelectorAll('.hero__review');
let activeHeroSlide = 0;

window.addEventListener('load', () => {
  window.setTimeout(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  }, 1200);
});

const updateHeaderBackground = () => {
  const scrollLimit = heroSection ? heroSection.offsetHeight - siteHeader.offsetHeight : 120;
  const pageWasScrolled = window.scrollY > scrollLimit;

  siteHeader.classList.toggle('is-scrolled', pageWasScrolled);
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

updateHeaderBackground();
showHeroSlide(activeHeroSlide);

window.addEventListener('scroll', updateHeaderBackground);
window.addEventListener('resize', updateHeaderBackground);
