let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);
let totalProductsPrice = 0;
let totalProductsArticle = 0;

//Au chargement de la page :
for (let produit of articleLocalStorage) {
  const id = produit.id;
  console.log(id);

  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function (getCart) {
      // Si le localStorage est vide
      if (articleLocalStorage === null) {
        // on vise le conteneur
        const articleNull = document.querySelector("#cart__items");
        //On signale a l'utilisateur que le panier est vide
        const artNull = `<p>Votre panier est vide</p>`;
        // On insert le méssage avec innerHTML
        articleNull.innerHTML = artNull;
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
        // On insert un addEventLister au "click" sur le bouton supprimer que l'on crée
        deleteCartitem.addEventListener("click", deleteItem);
      }
    })
    .then(function () {
      //On appelle une deuxième function qui sera utiliser une fois que la première promise est fini d'être lu.
      let productTotalPrice = document.getElementById("totalPrice");
      productTotalPrice.innerHTML = totalProductsPrice;

      let productTotalQuantity = document.getElementById("totalQuantity");
      productTotalQuantity.innerHTML = totalProductsArticle;
    })

    .catch(function (erreur) {
      // Une erreur est survenue
    });
}
//Après le chargement de la page :
//On déclare la function "deleteItem"
function deleteItem(e) {
  let boutonSuprimer = e.target;
  let article = boutonSuprimer.closest(".cart__item");

  console.log(article);

  article.dataset.id === "";
  article.dataset.color === "";
  console.log(article.dataset.id);
  console.log(article.dataset.color);
  for (let produit of articleLocalStorage) {
    if (
      produit.id === article.dataset.id &&
      produit.color === article.dataset.color
    ) {
      //j'ai fais de cette façon pour récupérer le prix apprès la suppréssion par facilité, mais on pourrait aussi faire un fetch.
      console.log(document.querySelector("article .price").textContent);

      console.log(articleLocalStorage.indexOf(produit));
      let index = articleLocalStorage.indexOf(produit);
      articleLocalStorage.splice(index, 1);
      localStorage.setItem("article", JSON.stringify(articleLocalStorage));
      article.remove();
    }
  }
}
