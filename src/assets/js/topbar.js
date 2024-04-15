const iconMobile = document.querySelector('.header-menu-icon');
const headerMenu = document.querySelector('.header-menu');

let isMenuOpen = false;
let mobileMenuDOM;

/**
 * Creates a mobile menu and appends it to the header menu.
 */
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement('div');
  mobileMenuDOM.classList.add('mobile-menu');
  mobileMenuDOM.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector('ul').cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

// Open the mobile menu.
const openMenu = () => {
  if (mobileMenuDOM) {
  } else {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add('open');
};

// Close the mobile menu.
const closeMenu = () => {
  mobileMenuDOM.classList.remove('open');
};

// Toggle the mobile menu.
const toggleMobileMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

// Event listeners.
iconMobile.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

window.addEventListener('click', () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 480) {
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  }
});