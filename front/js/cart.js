//********************************* Au chargement de la page "PANIER" *********************************

//********************************* Initialisation de variable *********************************
//Récupèration du localStorage ("articleLocalStorage")
let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);

//Variables "totalProductsPrice" qu'on viendra réutiliser pour afficher le prix total de tous les articles.
let totalProductsPrice = 0;

//Variables "totalProductsArticle" qu'on viendra réutiliser pour afficher la quantité pour chaque article.
let totalProductsArticle = 0;

//********************************* Incorporation "dynamique" des articles dans la page "PANIER" *********************************
// Si ("articleLocalStorage") est "vide" ==>
if (articleLocalStorage === null) {
  //Appelle de la function arrayEmpty()
  arrayEmpty();
}
//Si on a déja un ("articleLocalStorage") qui est bien un array et qu'il est "vide" ==>
if (Array.isArray(articleLocalStorage) && articleLocalStorage.length === 0) {
  //Appelle de la function arrayEmpty()
  arrayEmpty();
}
//Sinon, si ("articleLocalStorage") contient des articles
else {
  // On parcour le localStorage ("articleLocalStorage")
  for (let produit of articleLocalStorage) {
    //On récupère l'ID
    const id = produit.id;
    //On requette l'API avec "fetch" en fonction des "ID" qu'on a récupèré dans notre localStorage("articleLocalStorage") pour récupèrer certainent données de chaque article
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (reponse) {
        if (reponse.ok) {
          return reponse.json();
        }
      })
      .then(function (getCart) {
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
        //Renvoie une réponse "(erreur)"
        alert("Une erreur est survenue" + erreur);
      });
  }
}

//********************************* Fonction deleteItem(e) = suppréssion d'article *********************************

//On déclare la function deleteItem(e) pour pouvoir supprimer un article du DOM et du localStorage
function deleteItem(e) {
  // On crée une variable "boutonSupprimer" au quel on lui donne comme valeur un "event target" qui va ciblé l'élèment du DOM ou la function est appellé.
  let boutonSuprimer = e.target;
  // On crée une variable "article" à la quelle on lui donne comme valeur la variable "boutonSupprimer" à qui on va lui attribuer un closet qui va ciblé le parent ".cart__Item" de l'enfant target.
  let article = boutonSuprimer.closest(".cart__item");

  //On appelle la function updateAll() avec comme paramêtre "article" qui est le parent (".cart__item") que l'on veut supprimer
  updateAll(article, "delete", 0);

  //Si ("articleLocalStorage") est bien un array et qu'il est "vide" après la suppréssion des articles ==>
  if (Array.isArray(articleLocalStorage) && articleLocalStorage.length === 0) {
    //Appelle de la function arrayEmpty()
    arrayEmpty();
  }
}

//********************************* Fonction updatePrice(e) = Changement de quantité d'article et modification des prix *********************************

//On déclare la function updatePrice(e) pour pouvoir modifier le nombre d'article et leurs prix, ainsi que le nombre et prix total de tous les articles.
function updatePrice(e) {
  // On crée une variable "updateButtun" au quel on lui donne comme valeur un "event target" qui va ciblé l'élèment du DOM ou la function est appellé.
  let updateButtun = e.target;
  // On crée une variable "update" à la quelle on lui donne comme valeur la variable "updateButtun" à qui on va lui attribuer un closet qui va ciblé le parent ".cart__Item" de l'enfant target.
  let update = updateButtun.closest(".cart__item");

  //On appelle la function updateAll() avec comme paramêtre "update" qui est le parent (".cart__item") que l'on veut modifier
  updateAll(update, "update", e.target.value);
}

//********************************* Function "USINE" updateAll(element, type, value) *********************************
//********************************* MAJ "prix/quantité" regroupant tous les paramêtres de modification des quantités et de suppréssion d'article *********************************

function updateAll(element, type, value) {
  //Avec article.dataset."", on récupère le data-Id et le data-Color de l'élèment ciblé
  element.dataset.id === "";
  element.dataset.color === "";

  //On crée une variable "TotalNombre" qui est à "0".
  let totalNombre = 0;

  // On parcour le localStorage ("articleLocalStorage")
  for (let [i, produit] of articleLocalStorage.entries()) {
    //On récupère l'ID
    const id = produit.id;
    if (
      //On cible l'article sélectionné via à correspondance de l'id et la couleur
      produit.id === element.dataset.id &&
      produit.color === element.dataset.color
    ) {
      //On stock l'encien prix
      let oldPrice = element.querySelector(".price").textContent;

      //On remplace la quantité article par la nouvelle
      produit.nombre = parseInt(value); //On transforme la valeur de la quantité de string à number grace à parsInt
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
          //On récupère la réponse de l'API
          //Recalcule du prix en fonction de la nouvelle quantité
          let getPriceTotal = getArticle.price * totalProductsArticle;
          let PriceTotal = element.querySelector(".price");
          //On injecte le nouveau prix en html
          PriceTotal.innerHTML = getPriceTotal;

          //on calcule la différence entre le nouveau prix et l'encien prix ex : 10k - 5k Si le resultat est positif, on rajoute 5k sinon ( 5k - 10k = -5 )on ajoute -5k ( qui est équivalant a retirer 5k)
          let difference = getPriceTotal - parseInt(oldPrice); //On transforme la valeur de la quantité de string à number grace à parsInt
          //Calcule du total en fonction de la différence entre le total et l'encien prix
          totalProductsPrice = totalProductsPrice + difference; //Prix du total d'article + la différence

          //On insert dans le DOM à "totalPrice" la différence de prix que l'on a récupèré dans la variable "totalProductsPrice".
          let productTotalPrice = document.getElementById("totalPrice");
          productTotalPrice.innerHTML = totalProductsPrice;
        })
        .catch(function (erreur) {
          //Renvoie une réponse "(erreur)"
          alert("Une erreur est survenue" + erreur);
        });
    }
    //totalNombre prend la valeur de la quantité d'article
    totalNombre = totalNombre + produit.nombre;
  }
  //On insert dans le DOM à "totalQuantity" le nombre d'article total que l'on a récupèré dans la variable "totalNombre".
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = totalNombre;

  //Si le paramêtre "type" de updateAll() est la même que deleteItem()
  if (type === "delete") {
    //On parcoure le "array" de Storage
    for (let [i, produit] of articleLocalStorage.entries()) {
      console.log(i);

      if (
        //Si l'id et la couleur d'un produit dans le localStorage est égale au data-id et data-color de l'article dans le Dom
        produit.id === element.dataset.id &&
        produit.color === element.dataset.color
      ) {
        // Avec la méthode "splice", on va modifie le contenu du tableau en retirant l'élément choisie.
        articleLocalStorage.splice(i, 1);
        //avec "localStorage.setItem", on met a jour le localStorage
        localStorage.setItem("article", JSON.stringify(articleLocalStorage));
        //On supprimer l'article du DOM avec "remove"
        element.remove();
      }
    }
  }
}
//On crée une function qui affichera dans le corp html "Votre panier est vide" si il ne trouve aucun article dans "articleLocalStorage"
function arrayEmpty() {
  //On crée une balise html "p"
  let artNull = document.createElement("p");
  //On signale a l'utilisateur que le panier est vide
  artNull.innerHTML = "Votre panier est vide";
  // on vise le conteneur et on ajoute la balise crée
  document.querySelector("#cart__items").appendChild(artNull);

  //On indique que le total d'article et le prix total est a "0"
  let totalArticle = document.getElementById("totalQuantity");
  totalArticle.innerHTML = " 0 ";
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = `<span class="price"> 0 </span>`;
}

//****************************Validation des données saisie****************************
//---------------Création des expressions régulières "Regexp"---------------
//---------------Création de "RegExp" pour la validation de FirstName et LastName---------------
let textRegExp = new RegExp(
  "^[a-zA-Z -,]{2,}$"
  //--------Paramètre du RegExp----------
  // ^ = début du texte
  // [a-zA-Z -,] = ensemble de caractères "minuscule" "MAJUSCULE" "caractère spéciaux "espace" (, -)"  utilisables
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // $ = Désigne la fin de mon expression régulière
);
//---------------Création de "RegExp" pour la validation d'adresse---------------
let adresseRegExp = new RegExp(
  "^[a-zA-Z0-9 -,]{2,}$"
  //--------Paramètre du RegExp----------
  // ^ = début du texte
  // [a-zA-Z0-9 -,] = ensemble de caractères "minuscule" "MAJUSCULE" "caractère spéciaux (, -)" "espace" utilisables
  // {2,} = Nombre de caractère compris entre "2 ou plus qu'il est possible d'écrire
  // $ = Désigne la fin de mon expression régulière
);
//---------------Création de "RegExp" pour la validation d'email---------------
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]{2,}[@]{1}[a-zA-Z0-9.-_]{2,}[.]{1}[a-z]{2,5}$"
  //--------Paramètre du RegExp----------
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
);

//********************************* Validation, Récupèration et Envoie de données à l'API *********************************

//On cible le bouton commander
let commander = document.getElementById("order");
//A l'evenement "Click" sur commander
commander.addEventListener("click", postCommand);
//On lance une function "postCommand" pour envoyer les données à l'API
function postCommand(e) {
  e.preventDefault();
  let contact = {};

  //********************************* Validation formulaire *********************************
  //Ecoute des formulaire => On sélectionne les balises de chaque champ a remplir.
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
  //Condition si les information rentrés par l'utilisateur dans le formulaire sont validés par les "RegExp" alors on ajoute un méssage de validation
  //Sinon on ajoute un méssage d'érreur.
  let valide = true;
  if (textRegExp.test(textFirstName.value)) {
    errorFirstName.innerHTML = "Formulaire valide";
    errorFirstName.setAttribute("style", "color:#11D01F");
  } else {
    errorFirstName.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (textRegExp.test(textLastName.value)) {
    errorLastName.innerHTML = "Formulaire valide";
    errorLastName.setAttribute("style", "color:#11D01F");
  } else {
    errorLastName.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (adresseRegExp.test(textAddress.value)) {
    errorAdresse.innerHTML = "Formulaire valide";
    errorAdresse.setAttribute("style", "color:#11D01F");
  } else {
    errorAdresse.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (textRegExp.test(textCity.value)) {
    errorCity.innerHTML = "Formulaire valide";
    errorCity.setAttribute("style", "color:#11D01F");
  } else {
    errorCity.innerHTML = "Formulaire invalide";
    valide = false;
  }
  if (emailRegExp.test(textEmail.value)) {
    errorEmail.innerHTML = "Adresse email valide";
    errorEmail.setAttribute("style", "color:#11D01F");
  } else {
    errorEmail.innerHTML = "Adresse email invalide";
    valide = false;
  }
  if (valide != true) {
    alert(`Il y a une érreur au niveau de votre saisie`);
    return false;
  }
  //********************************* Récupèration des informations saisies *********************************
  contact = {
    firstName: textFirstName.value,
    lastName: textLastName.value,
    address: textAddress.value,
    city: textCity.value,
    email: textEmail.value,
  };
  console.log(contact);

  //********************************* récupèration des "ID" d'article *********************************
  //On crée un tableau "product" vide
  let products = [];
  // On parcour le localStorage ("articleLocalStorage")
  for (let produits of articleLocalStorage) {
    //On récupère les "ID" de chaque article.
    let id = produits.id;
    //On "push" le/les "ID" dans le tableau "products"
    products.push(id);
  }

  //********************************* Envoie des données à l'API *********************************
  //On requette l'API avec "fetch" en utilisant la méthode POST. et envoyer l'utilisateur sur la page confirmation.
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    //Envoye l'objet "contact" qui contient les informations de utilisateur, saisie dans le formulaire.
    // Envoie le tableau "product" qui contient les "ID" des articles.
    body: JSON.stringify({
      //JSON.stringify qui converti les valeurs JavaScript en chaîne JSON.
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
      //Récupèration du bon de commande
      const orderId = reponse.orderId;
      //On envoye l'utilisateur sur la page confirmation et on ajoute dans l'URL un paramêtre (?commande=) qui contient le bon de commande "orderId".
      location.href = `./confirmation.html?commande=${orderId}`;
    })
    .catch(function (erreur) {
      alert("Une erreur est survenue" + erreur);
    });
}
