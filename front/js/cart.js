// Récupération du localStorage
let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);

// Pointer la position du contenant "liste des articles" dans le DOM
let contenant = document.getElementById("cart__items");
console.log(contenant);
