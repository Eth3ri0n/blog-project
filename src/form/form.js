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
FORM.addEventListener('submit', async (event) => {
    event.preventDefault();

    const FORMDATA = new FormData(FORM);
    const OBJECTDATA = Object.fromEntries(FORMDATA.entries());
    if (FORM_IS_VALID(OBJECTDATA)) {
        try {
            const JSONDATA = JSON.stringify(OBJECTDATA);
            const RESPONSE = await fetch('https://restapi.fr/api/blog', {
                method: 'POST',
                body: JSONDATA,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const DATA = await RESPONSE.json();
                console.log(DATA);
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
const FORM_IS_VALID = (data) => {
    if (!data.title || !data.image_profile || !data.author || !data.category || !data.content) {
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
