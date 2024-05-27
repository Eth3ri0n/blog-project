/**
 * Importing styles and SCSS files.
 */

import '../assets/styles/styles.scss';
import './form.scss';
import '/assets/js/topbar';

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

const CANCELBUTTON = document.querySelector('.btn-accent');

/**
 * An array to store error messages.
 * @type {Array<string>}
 */
let errors = [];

CANCELBUTTON.addEventListener('click', () => {
    window.location.assign('/index.html');
});

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
            
            if(RESPONSE.status < 299) {
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
