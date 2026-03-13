const container = document.getElementById("newsContainer");
const topic = document.getElementById("topic");
const btn = document.getElementById("searchBtn");

// function to fetch news
async function getNews(query){

container.innerHTML = "Loading...";

const url = `https://hn.algolia.com/api/v1/search?query=${query}`;

const res = await fetch(url);
const data = await res.json();

showNews(data.hits);

}

// show news
function showNews(news){

container.innerHTML = "";

news.forEach(item => {

const div = document.createElement("div");
div.classList.add("news-card");

div.innerHTML = `
<h3>${item.title}</h3>
<a href="${item.url}" target="_blank">Read More</a>
`;

container.appendChild(div);

});

}

// button click
btn.addEventListener("click",()=>{
getNews(topic.value);
});

// load default news when page loads
window.onload = ()=>{
getNews("startup");
};