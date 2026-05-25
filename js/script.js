const menuButton = document.querySelector('.site-header__toggle');
const mainNavigation = document.querySelector('.site-header__nav');
const siteHeader = document.querySelector('.site-header');
const servicesDropdown = document.querySelector('.site-header__dropdown');
const servicesButton = document.querySelector('.site-header__dropdown-button');

const updateHeaderBackground = () => {
  const heroSection = document.querySelector('.hero');
  const scrollLimit = heroSection ? heroSection.offsetHeight - siteHeader.offsetHeight : 120;
  const pageWasScrolled = window.scrollY > scrollLimit;

  siteHeader.classList.toggle('is-scrolled', pageWasScrolled);
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

updateHeaderBackground();

window.addEventListener('scroll', updateHeaderBackground);
window.addEventListener('resize', updateHeaderBackground);
