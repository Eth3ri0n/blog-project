/**
 * Importing styles and SCSS files.
 */
import '../assets/styles/styles.scss';
import './form.scss';

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

/**
 * An array to store error messages.
 * @type {Array<string>}
 */
let errors = [];

/**
 * Event listener for form submission.
 * @param {Event} event - The submit event.
 */
FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    const FORMDATA = new FormData(FORM);
    const OBJECTDATA = Object.fromEntries(FORMDATA.entries());
    if (FORM_IS_VALID(OBJECTDATA)) {
        const JSONDATA = JSON.stringify(OBJECTDATA);
    }
});

/**
 * Checks if the form data is valid.
 * @param {Object} data - The form data object.
 * @returns {boolean} - True if the form data is valid, false otherwise.
 */
const FORM_IS_VALID = (data) => {
    if (!data.title || !data.category || !data.content || !data.author) {
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
    } else {
        ERRORELEMENT.innerHTML = '';
    }
};
