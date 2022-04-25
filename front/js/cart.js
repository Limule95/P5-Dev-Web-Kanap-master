let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
console.table(articleLocalStorage);

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
      console.log(getCart);
      if (articleLocalStorage === null) {
        const articleNull = document.querySelector("#cart__items");
        const artNull = `<p>Votre panier est vide</p>`;
        articleNull.innerHTML = artNull;
      } else {
        // crée un nouvel élément div
        let newCart = document.createElement("article");
        // on vise le conteneur et on ajoute le nœud  au nouveau div créé
        document.querySelector("#cart__items").appendChild(newCart);
        // on rajoute une class
        newCart.className = "cart__item";
        newCart.setAttribute("data-id", produit.id);
        newCart.setAttribute("data-color", produit.color);
        // console.log(newCart);

        // Insertion de l'élément "div"
        let newDivImg = document.createElement("div");
        newCart.appendChild(newDivImg);
        newDivImg.className = "cart__item__img";
        // console.log(newCart);
        // Insertion de l'image
        let addImg = document.createElement("img");
        newDivImg.appendChild(addImg);
        addImg.src = getCart.imageUrl;
        addImg.alt = getCart.altTxt;
        console.log(newCart);

        //On rajoute une div + class
        let cartItemContent = document.createElement("div");
        document.querySelector("#cart__items").appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";
        let cartItemContentDescription = document.createElement("div");
        document.querySelector("#cart__items").appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";
      }
    })

    .catch(function (erreur) {
      // Une erreur est survenue
    });
}
