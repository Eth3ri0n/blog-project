/**
 * Importing styles and SCSS files.
 */

import '../assets/styles/styles.scss';
import './form.scss';
import '/assets/js/topbar';

let ArticleId;

/**
 * The form element.
 * @type {HTMLElement}
 */
const FORM = document.querySelector('.form');

/**
 * The element to display error messages.
 * @type {HTMLElement}
 */
const ERRORELEMENT = document.querySelector('#errors');

// The cancel button.
const CANCELBUTTON = document.querySelector('.btn-accent');

// Event listener for the cancel button.
CANCELBUTTON.addEventListener('click', () => {
  window.location.assign('/index.html');
});

const FILL_FORM = (article) => {
  // Get the form elements.
  const TITLE = document.querySelector('input[name="title"]');
  const IMAGE_PROFILE = document.querySelector('input[name="image_profile"]');
  const AUTHOR = document.querySelector('input[name="author"]');
  const CATEGORY = document.querySelector('input[name="category"]');
  const CONTENT = document.querySelector('textarea[name="content"]');

  // Fill the form with the article data.
  TITLE.value = article.title || '';
  IMAGE_PROFILE.value = article.image_profile || '';
  AUTHOR.value = article.author || '';
  CATEGORY.value = article.category || '';
  CONTENT.value = article.content || '';
};

const INIT_FORM = async () => {
  // Get the article id from the URL.
  const PARAMS = new URL(window.location.href);
  ArticleId = PARAMS.searchParams.get('id');

  if (ArticleId) {
    const RESPONSE = await fetch(`https://restapi.fr/api/blog/${ArticleId}`);

    if (RESPONSE.status < 300) {
      const ARTICLE = await RESPONSE.json();
      FILL_FORM(ARTICLE);
    }
  }
};

INIT_FORM();

/**
 * An array to store error messages.
 * @type {Array<string>}
 */
let errors = [];

/**
 * Event listener for form submission.
 * @param {Event} event - The submit event.
 */
FORM.addEventListener('submit', async (event) => {
  event.preventDefault();

  const FORMDATA = new FormData(FORM);
  const ARTICLE = Object.fromEntries(FORMDATA.entries());
  if (FORM_IS_VALID(ARTICLE)) {
    try {
      const JSONDATA = JSON.stringify(ARTICLE);
      let reponse;
      if (ArticleId) {
        reponse = await fetch(`https://restapi.fr/api/blog/${ArticleId}`, {
          method: 'PATCH',
          body: JSONDATA,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        reponse = await fetch('https://restapi.fr/api/blog', {
          method: 'POST',
          body: JSONDATA,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (reponse.status < 300) {
        window.location.assign('/index.html');
      }
    } catch (error) {
      console.error('error :', error);
    }
  }
});

/**
 * Checks if the form data is valid.
 *
 * @param {Object} data - The form data object.
 * @returns {boolean} - Returns true if the form data is valid, otherwise false.
 */
/**
 * Checks if the form data is valid.
 *
 * @param {Object} data - The form data to be validated.
 * @returns {boolean} - Returns true if the form data is valid, otherwise false.
 */
const FORM_IS_VALID = (data) => {
  errors = [];
  if (
    !data.title ||
    !data.image_profile ||
    !data.author ||
    !data.category ||
    !data.content
  ) {
    errors.push('All fields are required.');
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = '';
    errors.forEach((error) => {
      errorHTML += `<li>${error}</li>`;
    });
    ERRORELEMENT.innerHTML = errorHTML;
    return false;
  } else {
    ERRORELEMENT.innerHTML = '';
    return true;
  }
};
