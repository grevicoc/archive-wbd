import { getAPI } from "./api.js";

const totalPrice = document.getElementById("tot-price");
const dorayakiPrice = document.getElementById("dorayaki-price").innerHTML.slice(18);
const minusIcon = document.getElementById("minus");
const plusIcon = document.getElementById("plus");
const inputUser = document.getElementById("buy-stock");
const inputAdmin = document.getElementById("stock-change");
console.log(inputAdmin);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const getStockAJAX = () => {
  getAPI('/dorayaki/get/stock?id=' + params.id).then(
    data => { 
      const response = JSON.parse(data);
      console.log(response);
      adjustDorayakiStock(response.data.stock);
      setTimeout(getStockAJAX, 3000);
    },
    error => { console.log(error); }
  )
}

setTimeout(getStockAJAX, 1000);

const adjustDorayakiStock = (stock) => {
  document.getElementById("stock-dorayaki").innerHTML = `Stock: ${stock}`;
  inputUser.setAttribute("max", stock);
}

minusIcon.addEventListener('click', (e) => {
  if (document.getElementById("buy-stock")!=null){
    if (document.getElementById("buy-stock").value > 0) {
      document.getElementById("buy-stock").value -= 1;
      totalPrice.innerText = `Total harga = Rp. ${parseInt(document.getElementById("buy-stock").value) * parseInt(dorayakiPrice)}`
    }
  }
  inputAdmin.value -= 1;
})

plusIcon.addEventListener('click', (e) => {
  if (document.getElementById("buy-stock")!=null){
    if (parseInt(document.getElementById("buy-stock").value) < parseInt(inputUser.getAttribute("max"))) {
      document.getElementById("buy-stock").value = parseInt(document.getElementById("buy-stock").value) + 1;
      totalPrice.innerText = `Total harga = Rp. ${parseInt(document.getElementById("buy-stock").value) * parseInt(dorayakiPrice)}`
    }
  }
  inputAdmin.value = parseInt(inputAdmin.value) + 1;
})

