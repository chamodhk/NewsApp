const newsContainer = document.querySelector("#news");

async function loadNews() {
    const response = await fetch("/api/news");
    const news = await response.json();

    displayNews(news);
}

function displayNews(news) {
    newsContainer.innerHTML = "";

    news.forEach(article => {
        const articleElement = document.createElement("article");
        articleElement.classList.add("article");

        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${new Date(article.published_at).toLocaleString()}</p>
        `;

        newsContainer.appendChild(articleElement);
    });
}

loadNews();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js")
        .then(() => {
            console.log("Service worker registered");
        })
        .catch(error => {
            console.error("Service worker registration failed:", error);
        });
}
