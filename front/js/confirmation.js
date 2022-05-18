//On récupère le numéro de commande inclut dans l'URL pour le stocké dans la variable "numCommande"
let numCommande = new URLSearchParams(document.location.search).get("commande");

//Initialisation du local storage
let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);

//On insert dans le DOM a la partie "orderId", la variable "numCommande" qui contient le numéro de commande.
let numeroCommand = document.getElementById("orderId");
numeroCommand.innerHTML = numCommande;
