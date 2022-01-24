const apiKey = 'f778c165f85a42a0b73e0877131f2edb';
const container = document.querySelector('.news');

async function getNews(api) {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=${api}`);
    const requestValue = response.json();
    requestValue.then(data => showNews(data));
}

function showNews(responseData) {
    const articles = responseData.articles;
    articles.forEach(({title, description, urlToImage, url}) => {
        const card = document.createElement('div');
        card.classList.add('col-6');
        card.classList.add('offset-3');
        card.classList.add('card');

        const titleText = document.createElement('h2');
        const descr = document.createElement('p');
        const img = document.createElement('img')
        const href = document.createElement('a');

        titleText.textContent = title;
        descr.textContent = description;
        img.setAttribute('src', `${urlToImage}`);
        href.setAttribute('href', `${url}`);
        href.textContent = 'Read more';

        card.appendChild(img);
        card.appendChild(titleText);
        card.appendChild(descr);
        card.appendChild(href);
        container.insertAdjacentElement('afterbegin', card);
    });
}

getNews(apiKey);