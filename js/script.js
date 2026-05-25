const menuButton = document.querySelector('.site-header__toggle');
const mainNavigation = document.querySelector('.site-header__nav');
const siteHeader = document.querySelector('.site-header');

const updateHeaderBackground = () => {
  const pageWasScrolled = window.scrollY > 8;

  siteHeader.classList.toggle('is-scrolled', pageWasScrolled);
};

menuButton.addEventListener('click', () => {
  const menuIsOpen = mainNavigation.classList.toggle('is-open');

  menuButton.setAttribute('aria-expanded', menuIsOpen);
  menuButton.setAttribute('aria-label', menuIsOpen ? 'Fechar menu' : 'Abrir menu');
});

updateHeaderBackground();

window.addEventListener('scroll', updateHeaderBackground);
