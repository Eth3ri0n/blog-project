import './assets/styles/styles.scss';
import './index.scss';
import '/assets/js/topbar.js';

const ARTICLECONTAINERELEMENT = document.querySelector('.articles-container');

// Create articles.
const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement('div');
    articleDOM.classList.add('article');
    articleDOM.innerHTML = `
        <h2>${article.title}</h2>
        <div class="author-infos">
        <img src="${article.image_profile}" alt="profile" />
        <p class="article-author">${article.author}</p>
        </div>
        <p>Categories: ${article.category}</p>
        <article class="article-content">${article.content}</article>
        <div class="article-actions">
        <button class="btn btn-danger" data-id=${article._id}>Delete</button>
        <button class="btn btn-primary">Edit</button>
        </div>
        `;
    return articleDOM;
  });
  ARTICLECONTAINERELEMENT.innerHTML = '';
  ARTICLECONTAINERELEMENT.append(...articlesDOM);

  // Add event listeners to delete buttons.
  const deleteButtons = ARTICLECONTAINERELEMENT.querySelectorAll('.btn-danger');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(
          `https://restapi.fr/api/blog/${articleId}`,
          {
            method: 'DELETE',
          }
        );
        const body = await response.json();
        fetchArticle();
      } catch (error) {
        console.error('error :', error);
      }
    });
  });
};

// Fetch articles from the API.
const fetchArticle = async () => {
  try {
    const response = await fetch('https://restapi.fr/api/blog');
    const articles = await response.json();
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles(articles);
  } catch (error) {
    console.error('error : ', error);
  }
};

fetchArticle();
