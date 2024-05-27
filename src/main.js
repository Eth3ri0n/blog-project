import './assets/styles/styles.scss';
import './index.scss';
import '/assets/js/topbar.js';

const ARTICLE_CONTAINER_ELEMENT = document.querySelector('.articles-container');

// Create articles.
/**
 * Creates and renders articles on the webpage.
 * 
 * @param {Array} articles - An array of article objects.
 */
const CREATE_ARTICLES = (articles) => {
  const ARTICLES_DOM = articles.map((article) => {
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
        <p class="article-date">Published on - ${(new Date(article.createdAt)).toLocaleDateString("en-US", {
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
  const DELETE_BUTTONS = ARTICLE_CONTAINER_ELEMENT.querySelectorAll('.btn-danger');
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
  const EDIT_BUTTONS = ARTICLE_CONTAINER_ELEMENT.querySelectorAll('.btn-primary');
  EDIT_BUTTONS.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const TARGET = event.target;
        const ARTICLE_ID = TARGET.dataset.id;
        window.location.assign(`/form/form.html?id=${ARTICLE_ID}`);
    });
  });

};

// Fetch articles from the API.
const fetchArticle = async () => {
  try {
    const RESPONSE = await fetch('https://restapi.fr/api/blog');
    let articles = await RESPONSE.json();
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    CREATE_ARTICLES(articles);
  } catch (error) {
    console.log('error : ', error);
  }
};

fetchArticle();
