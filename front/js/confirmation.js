//********************************* Confirmation de la commande *********************************
//********************************* Récupèration du bon de commande *********************************
//On récupère le numéro de commande inclut dans l'URL.
let numCommande = new URLSearchParams(document.location.search).get("commande");

//********************************* Incorporation "dynamique" du bon de commande dans la page "CONFIRMATION" *********************************
//On sélectionne la balise ("orderId").
let numeroCommand = document.getElementById("orderId");
//On insert le numéro de commande.
numeroCommand.innerHTML = numCommande;

//********************************* Supréssion des articles du localStorage *********************************
//On vide le localStorage ("articleLocalStorage").
localStorage.clear();
