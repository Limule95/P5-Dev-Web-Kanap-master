//Initialisation du local storage qu'on récupère dans la console sous forme de tableau avec " console.table "
let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);
//Initialisation de la variables " totalProductsPrice" qu'on viendra réutiliser pour afficher le prix total de tous les articles.
let totalProductsPrice = 0;
//Initialisation de la variables "totalProductsArticle" qu'on viendra réutiliser pour afficher le la quantité pour chaque article.
let totalProductsArticle = 0;

//****************************Au chargement de la page****************************
for (let produit of articleLocalStorage) {
  //On récupère l'ID
  const id = produit.id;
  //On fait une requette fetch à l'API en fonction des ID qu'on a récupèrer dans notre localStorage pour récupèrer des données de chaques articles en fonction de leurs ID.
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function (getCart) {
      // Si le localStorage est vide
      if (articleLocalStorage === null) {
        let artNull = document.createElement("p");
        //On signale a l'utilisateur que le panier est vide
        artNull.innerHTML = "Votre panier est vide";
        // on vise le conteneur et on ajoute le nœud  a la nouvelle div créé
        document.querySelector("#cart__items").appendChild(artNull);
      } else {
        //Si le localStorage contient des données
        // Insertion d'un article
        let cartItem = document.createElement("article");
        //On rajoute une class
        cartItem.className = "cart__item";
        // on vise le conteneur et on ajoute le nœud  a la nouvelle div créé
        document.querySelector("#cart__items").appendChild(cartItem);
        // On insert les attributs
        cartItem.setAttribute("data-id", produit.id);
        cartItem.setAttribute("data-color", produit.color);

        // Insertion de la div cart__item__img
        let cartItemImg = document.createElement("div");
        //On rajoute une class
        cartItemImg.className = "cart__item__img";
        // on vise le conteneur
        cartItem.appendChild(cartItemImg);
        // rajout de l'image à la div cart__item__img
        let addImg = document.createElement("img");
        // on vise le conteneur
        cartItemImg.appendChild(addImg);
        // On insert les attributs
        addImg.src = getCart.imageUrl;
        addImg.alt = getCart.altTxt;

        //Insertion de la div cart__item__content
        let cartItemContent = document.createElement("div");
        //On rajoute une class
        cartItemContent.className = "cart__item__content";
        // on vise le conteneur
        cartItem.appendChild(cartItemContent);

        //On rajoute une div à la div cart__item__content
        let cartItemContentDescription = document.createElement("div");
        //On rajoute une class
        cartItemContentDescription.className =
          "cart__item__content__description";
        // on vise le conteneur
        cartItemContent.appendChild(cartItemContentDescription);

        // On insert le title "h2"
        let titleCartItem = document.createElement("h2");
        // on vise le conteneur
        cartItemContentDescription.appendChild(titleCartItem);
        // On insert les attributs
        titleCartItem.innerHTML = getCart.name;

        // On insert la couleur choisie
        let colorCartItem = document.createElement("p");
        // on vise le conteneur
        cartItemContentDescription.appendChild(colorCartItem);
        // On insert les attributs
        colorCartItem.innerHTML = produit.color;

        // On insert le prix
        let priceCartItem = document.createElement("p");

        // on vise le conteneur
        cartItemContentDescription.appendChild(priceCartItem);
        // On insert les attributs
        let getPriceTotal = getCart.price * produit.nombre;
        priceCartItem.innerHTML = `<span class="price">${getPriceTotal}</span>€`;
        //On récupère le prix Total de tous les articles
        totalProductsPrice = totalProductsPrice + getPriceTotal;

        //Insertion de la div cart__item__content__settings
        let cartItemContentSettings = document.createElement("div");
        //On rajoute une class
        cartItemContentSettings.className = "cart__item__content__settings";
        // on vise le conteneur
        cartItem.appendChild(cartItemContentSettings);

        //On rajoute une div à la div cart__item__content__settings
        let cartItemContentSettingsQuantity = document.createElement("div");
        //On rajoute une class
        cartItemContentSettingsQuantity.className =
          "cart__item__content__settings__quantity";
        // on vise le conteneur
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        // On insert la quantité
        let quantityCartItem = document.createElement("p");
        // on vise le conteneur
        cartItemContentSettingsQuantity.appendChild(quantityCartItem);
        // On insert les attributs
        quantityCartItem.innerHTML = "Qté : ";

        //On insert l'input
        let inputQuantity = document.createElement("input");
        //On rajoute une class
        inputQuantity.className = "itemQuantity";
        // on vise le conteneur
        cartItemContentSettingsQuantity.appendChild(inputQuantity);
        // On insert les attributs
        inputQuantity.value = produit.nombre;
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "inputQuantity");
        // On récupère le total de tous les articles
        totalProductsArticle = totalProductsArticle + produit.nombre;
        // On insert un addEventLister au "change" sur le bouton "inputQuantity"
        inputQuantity.addEventListener("change", updatePrice);

        //Insertion de la div div class="cart__item__content__settings__delete
        let cartItemContentSettingsDelete = document.createElement("div");
        //On rajoute une class
        cartItemContentSettingsDelete.className =
          "cart__item__content__settings__delete";
        // on vise le conteneur
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        // On insert le bouton "Supprimer"
        let deleteCartitem = document.createElement("p");
        //On rajoute une class
        deleteCartitem.className = "deleteItem";
        // on vise le conteneur
        cartItemContentSettingsDelete.appendChild(deleteCartitem);
        // On insert les attributs
        deleteCartitem.innerHTML = "Supprimer";
        // On insert un addEventLister au "click" sur le bouton supprimer
        deleteCartitem.addEventListener("click", deleteItem);
      }
    })
    .then(function () {
      //On appelle une deuxième function qui sera utiliser une fois que la première promise est fini d'être lu.

      //On déclarer une variable qui va ciblé l'ID "totalPrice" auquel on va insérer le prix total.
      let productTotalPrice = document.getElementById("totalPrice");
      productTotalPrice.innerHTML = totalProductsPrice;

      //On déclarer une variable qui va ciblé l'ID "totalQuantity" auquel on va insérer la quatité total d'article.
      let productTotalQuantity = document.getElementById("totalQuantity");
      productTotalQuantity.innerHTML = totalProductsArticle;
    })
    .catch(function (erreur) {
      alert("Une erreur est survenue" + erreur);
    });
}

//****************************Fonction = suppréssion d'article****************************

//Après le chargement de la page :
//On déclare la function "deleteItem" pour pouvoir supprimer un article du DOM et du localStorage
function deleteItem(e) {
  // On crée une variable "boutonSupprimer" au quel on lui donne comme valeur un "event target" qui va ciblé l'élèment du DOM ou la function est appellé.
  let boutonSuprimer = e.target;
  // On crée une variable "article" à la quelle on lui donne comme valeur la variable "boutonSupprimer" à qui on va lui attribuer un closet qui va ciblé le parent ".cart__Item" de l'enfant target.
  let article = boutonSuprimer.closest(".cart__item");
  //Avec article.dataset."", on récupère le data-Id et le data-Color de l'élèment ciblé
  article.dataset.id === "";
  article.dataset.color === "";

  // On boucle de localStorage pour récupèrer l'ID et la couleur pour faire une comparaison.
  for (let produit of articleLocalStorage) {
    if (
      //Si l'id et la couleur d'un produit dans le localStorage est égale au data-id et data-color de l'article dans le Dom
      produit.id === article.dataset.id &&
      produit.color === article.dataset.color
    ) {
      // j'ai fais de cette façon pour récupérer le prix apprès la suppréssion par facilité, mais on pourrait aussi faire un fetch.
      // changePrice = document.querySelector("article .price").textContent;
      // let productTotalPrice = document.getElementById("totalPrice");

      totalProductsArticle = totalProductsArticle - produit.nombre;
      // On déclare une varible index à laquelle on lui donne comme valeur le localStorage avec un "indexOf" qui renvoie le premier indice.
      //Sachant que l'on boucle le localStorage, l'indexOf va chercher l'indice en fonction de l'id et la couleur de l'élèment qu'on cible,

      // Avec la méthode "splice", on va modifie le contenu du tableau en retirant l'élément choisie.
      articleLocalStorage.splice(boutonSuprimer.index, 1);
      //avec "localStorage.setItem", on met a jour le localStorage
      localStorage.setItem("article", JSON.stringify(articleLocalStorage));
      //On supprimer l'article du DOM avec "remove"
      article.remove();
      Location.reload();
    }
  }
}

//****************************Fonction = Changement de quantité d'article et modification des prix*********************************

//On déclare la function "updatePrice" pour pouvoir modifier le nombre d'article et leurs prix, ainsi que le prix total de tous les articles.
function updatePrice(e) {
  // On crée une variable "updateButtun" au quel on lui donne comme valeur un "event target" qui va ciblé l'élèment du DOM ou la function est appellé.
  let updateButtun = e.target;
  // On crée une variable "update" à la quelle on lui donne comme valeur la variable "updateButtun" à qui on va lui attribuer un closet qui va ciblé le parent ".cart__Item" de l'enfant target.
  let update = updateButtun.closest(".cart__item");
  //Avec update.dataset."", on récupère le data-Id et le data-Color de l'élèment ciblé
  update.dataset.id === "";
  update.dataset.color === "";
  //Avec update.value, on recupère la valeur que l'on viens de modifier avec l'event "target" qui cible la valeur qui change.
  update.value = e.target.value;

  //On initialise une variable "TotalNombre" qui est à 0.
  let totalNombre = 0;

  // On boucle de localStorage pour récupèrer l'ID et la couleur pour faire une comparaison.
  for (let produit of articleLocalStorage) {
    //On récupère l'ID
    const id = produit.id;
    if (
      //Si l'id et la couleur d'un produit dans le localStorage est égale au data-id et data-color de l'élèment du DOM qu'on modifie.
      produit.id === update.dataset.id &&
      produit.color === update.dataset.color
    ) {
      //On stock l'encien prix
      let oldPrice = update.querySelector(".price").textContent;
      //Avec "produit.nombre" on va récupèrer la valeur de "update.value" qui avec la fonction "parseInt", analyse la chaîne de caractère fournie en argument et renvoie un entier.
      produit.nombre = parseInt(update.value);
      //On récupère "totalProductsArticle" au quel on lui attribut la quantité modifier de article avec "produit.nombre"
      totalProductsArticle = produit.nombre;
      //avec "localStorage.setItem", on met a jour le localStorage
      localStorage.setItem("article", JSON.stringify(articleLocalStorage));

      //On fait une requette fetch à l'API en fonction des ID qu'on a récupèrer dans notre localStorage pour récupèrer des données de chaques articles en fonction de leurs ID.
      fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (reponse) {
          if (reponse.ok) {
            return reponse.json();
          }
        })
        .then(function (getArticle) {
          //On crée une variable "getPriceTotal"  a laquelle on lui attribut le prix de article x la quantité d'article qu'on à modifier
          let getPriceTotal = getArticle.price * totalProductsArticle;
          //On crée une variable "PriceTotal" ou l'on va selectionner ".price"
          let PriceTotal = update.querySelector(".price");
          //On insert la valeur de "getPriceTotal" dans le DOM
          PriceTotal.innerHTML = getPriceTotal;

          //on calcule la différence entre le nouveau prix et l'encien prix ex : 10k - 5k Si le resultat est positif, on rajoute 5k sinon ( 5k - 10k = -5 )on ajoute -5k ( qui est équivalant a retirer 5k)
          let difference = getPriceTotal - parseInt(oldPrice);
          totalProductsPrice = totalProductsPrice + difference;
          //On insert dans le DOM à "totalPrice" la différence de prix que l'on a récupèré dans la variable "totalProductsPrice".
          let productTotalPrice = document.getElementById("totalPrice");
          productTotalPrice.innerHTML = totalProductsPrice;
        })
        .catch(function (erreur) {
          alert("Une erreur est survenue" + erreur);
        });
    }
    //On ajoute à "totalNombre" le nombre de d'article que l'utilisateur ajoute ou modifie.
    totalNombre = totalNombre + produit.nombre;
  }
  //On insert dans le DOM à "totalQuantity" le nombre d'article total que l'on a récupèré dans la variable "totalNombre".
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = totalNombre;
}

//****************************Validation des données saisie****************************
//---------------Création des expressions régulières "Regexp"---------------
//---------------Création de "RegExp" pour la validation de FirstName et LastName---------------
let textRegExp = new RegExp(
  "^[a-zA-Z -,]{2,}$"
  //--------Premier paramètre du RegExp----------
  // ^ = début du texte
  // [a-zA-Z -,] = ensemble de caractères "minuscule" "MAJUSCULE" "caractère spéciaux "espace" (, -)"  utilisables
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // $ = Désigne la fin de mon expression régulière
);
//---------------Création de "RegExp" pour la validation d'adresse---------------
let adresseRegExp = new RegExp(
  "^[a-zA-Z0-9 -,]{2,}$"
  //--------Premier paramètre du RegExp----------
  // ^ = début du texte
  // [a-zA-Z0-9 -,] = ensemble de caractères "minuscule" "MAJUSCULE" "caractère spéciaux (, -)" "espace" utilisables
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // $ = Désigne la fin de mon expression régulière
);
//---------------Création de "RegExp" pour la validation d'email---------------
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]{2,}[@]{1}[a-zA-Z0-9.-_]{2,}[.]{1}[a-z]{2,5}$"
  //--------Premier paramètre du RegExp----------
  // ^ = début du texte
  // [a-zA-Z0-9.-_] = ensemble de caractères "minuscule" "MAJUSCULE" "Chifre" "Caractère spéciaux" utilisables au début de l'email
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // [@] = Définie le caractère possible et {1} = le nombre de fois qu'il est possible de l'écrire.
  // [a-zA-Z0-9.-_] = ensemble de caractères "minuscule" "MAJUSCULE" "Chifre" "Caractère spéciaux" utilisables après "@".
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // [.] = Définie le caractère possible et {1} = le nombre de fois qu'il est possible de l'écrire.
  // [a-z] = ensemble de caractères "minuscule" utilisables pour définir l'extension de l'email
  // {2,3} = Nombre de caractère compris entre "2 ou 3" qu'il est possible d'écrire
  // $ = Désigne la fin de mon expression régulière
  //--------Deuxième paramètre du RegExp----------
  // Le marqueur "g" = "global". Définie la façon de lire le RegExp
);

//****************************Envoie de données à l'API****************************

//On cible le bouton commander
let commander = document.getElementById("order");
//A l'evenement "Click" sur commander
commander.addEventListener("click", postCommand);
//On lance une function "postCommand" pour envoyer les données à l'API
function postCommand(e) {
  e.preventDefault();
  let contact = {};
  //-----------------------Validation formulaire----------------------
  //Ecoute des formulaire =>
  let textFirstName = document.getElementById("firstName");
  let textLastName = document.getElementById("lastName");
  let textAddress = document.getElementById("address");
  let textCity = document.getElementById("city");
  let textEmail = document.getElementById("email");
  //Récupèration des balises "NameErrorMsg"
  let errorFirstName = document.getElementById("firstNameErrorMsg");
  let errorLastName = document.getElementById("lastNameErrorMsg");
  let errorAdresse = document.getElementById("addressErrorMsg");
  let errorCity = document.getElementById("cityErrorMsg");
  let errorEmail = document.getElementById("emailErrorMsg");
  //Test des expressions régulières'
  //Condition si "true" alors on ajoute un méssage de validation || si "false" on ajoute un méssage d'érreur
  let valide = true;
  if (textRegExp.test(textFirstName.value)) {
    errorFirstName.innerHTML = "Formulaire valide";
  } else {
    errorFirstName.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (textRegExp.test(textLastName.value)) {
    errorLastName.innerHTML = "Formulaire valide";
  } else {
    errorLastName.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (adresseRegExp.test(textAddress.value)) {
    errorAdresse.innerHTML = "Formulaire valide";
  } else {
    errorAdresse.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (textRegExp.test(textCity.value)) {
    errorCity.innerHTML = "Formulaire valide";
  } else {
    errorCity.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (emailRegExp.test(textEmail.value)) {
    errorEmail.innerHTML = "Adresse email valide";
  } else {
    errorEmail.innerHTML = "Adresse email invalide";
    valide = false;
  }
  if (valide != true) {
    alert(`Il y a une érreur au niveau de votre saisie`);
    return false;
  }
  //****************************récupèration des données saisie****************************
  contact = {
    firstName: textFirstName.value,
    lastName: textLastName.value,
    address: textAddress.value,
    city: textCity.value,
    email: textEmail.value,
  };
  console.log(contact);

  //On crée un tableau "product"
  let products = [];
  //On récupère les "ID" des produits du panier.
  for (let produits of articleLocalStorage) {
    let id = produits.id;
    products.push(id);
  }
  console.log(products);
  // Requette fetch pour utiliser la méthode POST, envoyer les données utilisateurs, récupérer le bon de commande et envoyer l'utilisateur sur la page confirmation.
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({
      contact,
      products,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function (reponse) {
      console.log(reponse);
      const orderId = reponse.orderId;
      console.log(orderId);
      location.href = `./confirmation.html?commande=${orderId}`;
    })
    .catch(function (erreur) {
      alert("Une erreur est survenue" + erreur);
    });
}
