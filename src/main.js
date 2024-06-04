import './assets/styles/styles.scss';
import './index.scss';
import '/assets/js/topbar.js';

const ARTICLE_CONTAINER_ELEMENT = document.querySelector('.articles-container');
const MENU_CATEGORIES_CONTAINER_ELEMENT = document.querySelector('.categories');
const SELECT_ELEMENT = document.querySelector('select');

let Filter;
let articles;
let SortBy = 'desc';

SELECT_ELEMENT.addEventListener('change', () => {
  SortBy = SELECT_ELEMENT.value;
  fetchArticle();
});

// Create articles.
/**
 * Creates and renders articles on the webpage.
 *
 * @param {Array} articles - An array of article objects.
 */
const CREATE_ARTICLES = () => {
  const ARTICLES_DOM = articles
    .filter((article) => {
      if (Filter) {
        return article.category === Filter;
      } else {
        return true;
      }
    })
    .map((article) => {
      const ARTICLE_DOM = document.createElement('div');
      ARTICLE_DOM.classList.add('article');
      ARTICLE_DOM.innerHTML = `
        <h2>${article.title}</h2>
        <div class="author-infos">
        <img src="${article.image_profile}" alt="profile" />
        <p class="article-author">${article.author}</p>
        </div>
        <div class="article-infos">
        <p class="article-category">Categories : ${article.category}</p>
        <p class="article-date">Published on - ${new Date(
          article.createdAt
        ).toLocaleDateString('en-US', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}</p>
        </div>
        <article class="article-content">${article.content}</article>
        <div class="article-actions">
        <button class="btn btn-danger" data-id=${article._id}>Delete</button>
        <button class="btn btn-primary" data-id=${article._id}>Edit</button>
        </div>
        `;
      return ARTICLE_DOM;
    });
  ARTICLE_CONTAINER_ELEMENT.innerHTML = '';
  ARTICLE_CONTAINER_ELEMENT.append(...ARTICLES_DOM);

  // Add event listeners to delete buttons.
  const DELETE_BUTTONS =
    ARTICLE_CONTAINER_ELEMENT.querySelectorAll('.btn-danger');
  DELETE_BUTTONS.forEach((button) => {
    button.addEventListener('click', async (event) => {
      try {
        const TARGET = event.target;
        const ARTICLE_ID = TARGET.dataset.id;
        const RESPONSE = await fetch(
          `https://restapi.fr/api/blog/${ARTICLE_ID}`,
          {
            method: 'DELETE',
          }
        );
        const body = await RESPONSE.json();
        console.log(body);

        fetchArticle();
      } catch (error) {
        console.log('error :', error);
      }
    });
  });

  // Add event listeners to edit buttons.
  const EDIT_BUTTONS =
    ARTICLE_CONTAINER_ELEMENT.querySelectorAll('.btn-primary');
  EDIT_BUTTONS.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const TARGET = event.target;
      const ARTICLE_ID = TARGET.dataset.id;
      window.location.assign(`/form/form.html?id=${ARTICLE_ID}`);
    });
  });
};

const DISPLAY_MENU_CATEGORIES = (CATEGORIES_ARRAY) => {
  const LI_ELEMENTS = CATEGORIES_ARRAY.map((categoryElement) => {
    const li = document.createElement('li');
    li.innerHTML = `
        ${categoryElement[0]} ( <strong>${categoryElement[1]}</strong> )
        `;
    if (categoryElement[0] === Filter) {
      li.classList.add('active');
    }
    li.addEventListener('click', () => {
      if (Filter === categoryElement[0]) {
        Filter = null;
        li.classList.remove('active');
        CREATE_ARTICLES();
      } else {
        Filter = categoryElement[0];
        LI_ELEMENTS.forEach((li) => {
          li.classList.remove('active');
        });
        li.classList.add('active');
        CREATE_ARTICLES();
      }
    });
    return li;
  });

  MENU_CATEGORIES_CONTAINER_ELEMENT.innerHTML = '';
  MENU_CATEGORIES_CONTAINER_ELEMENT.append(...LI_ELEMENTS);
};

// Create menu categories.
const CREATE_MENU_CATEGORIES = () => {
  const CATEGORIES = articles.reduce((accumulator, article) => {
    if (accumulator[article.category]) {
      accumulator[article.category]++;
    } else {
      accumulator[article.category] = 1;
    }
    return accumulator;
  }, {});

  const CATEGORIES_ARRAY = Object.keys(CATEGORIES)
    .map((category) => {
      return [category, CATEGORIES[category]];
    })
    .sort((a, b) => a[0].localeCompare(b[0]));

  DISPLAY_MENU_CATEGORIES(CATEGORIES_ARRAY);
};

// Fetch articles from the API.
const fetchArticle = async () => {
  try {
    const RESPONSE = await fetch(
      `https://restapi.fr/api/blog?sort=createdAt:${SortBy}`
    );
    articles = await RESPONSE.json();
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    CREATE_ARTICLES();
    CREATE_MENU_CATEGORIES();
  } catch (error) {
    console.log('error : ', error);
  }
};

fetchArticle();
