const apiKey = 'f778c165f85a42a0b73e0877131f2edb';
const container = document.querySelector('.news');
const search_btn = document.querySelector('#btn_search');
const search_country = document.querySelector('#search_country');
const search_topic = document.querySelector('#search_topic');

async function getNews(api, country = "ru", topic = null) {
    let response;
    if (topic === null) {
        response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${api}`);
    }else {
        response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${api}`)
    }
    const requestValue = response.json();
    requestValue.then(data => showNews(data));
}

function showNews(responseData) {
    let num = 0;

    const articles = responseData.articles;
    articles.forEach(({title, description, urlToImage, url}) => {

        if (num === 0) {
            const fnImg = document.querySelector('.first_news_img');
            const fnTitle = document.querySelector('.first_news_title');
            const fnLink = document.querySelector('.first_news_link');

            fnImg.setAttribute('src', `${urlToImage}`);
            fnTitle.textContent = title;
            fnLink.setAttribute('href', `${url}`);

            num = 1;
        }else {
            const img = document.createElement('img')
            const href = document.createElement('a');
            const titleText = document.createElement('h2');
            const card = document.createElement('div');
            card.classList.add('card');

            const descr = document.createElement('p');
            descr.textContent = description;

            titleText.textContent = title;
            img.setAttribute('src', `${urlToImage}`);
            href.setAttribute('href', `${url}`);
            href.textContent = 'Read more';
            
            card.appendChild(img);
            card.appendChild(titleText);
            card.appendChild(descr);
            card.appendChild(href);
            container.insertAdjacentElement('afterbegin', card); 
        }
        
    });
}

search_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const country = search_country.value;
    const topic = search_topic.value;

    if (topic) {
        getNews(apiKey, country ,topic);
    }else {
        getNews(apiKey, country);
    }
})

getNews(apiKey);