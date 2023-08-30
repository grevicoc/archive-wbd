const button = document.getElementById("button");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

button.addEventListener('click', (e) => {
  const baseURL = document.location.href.split("/dashboard");
  document.location.href = '/dorayaki/buy?id='+params.id;
})