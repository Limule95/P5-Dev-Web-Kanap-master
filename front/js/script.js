//********************************* Incorporation "dynamique" des articles dans la page "ACCEUIL" *********************************

//On requette l'API avec "fetch" pour récupèrer les propriétés de chaque article.
fetch("http://localhost:3000/api/products")
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (catalogue) {
    //On récupère la réponse de l'API qui renvoie un objet Promise que l'on nomme ici (catalogue).

    //On selectionne la balise ("items").
    let container = document.getElementById("items");

    // On parcour la promesse (catalogue)
    for (let produit of catalogue) {
      //container.insertAdjacentHTML() analyse le texte spécifié en tant que "HTML" et insère les noeuds résultants dans le "DOM" à la position spécifiée.
      container.insertAdjacentHTML(
        // "beforeend", définie la postion "Juste à l'intérieur de l'element , après son dernier enfant".
        "beforeend",
        `<a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a>`
      );
    }
  })
  .catch(function (erreur) {
    //Renvoie une réponse "(erreur)"
    alert("Une erreur est survenue" + erreur);
  });
