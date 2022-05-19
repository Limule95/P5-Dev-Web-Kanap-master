fetch("http://localhost:3000/api/products")
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (catalogue) {
    let container = document.getElementById("items"); //Selection la division
    for (let canape of catalogue) {
      //pour les canape du catalogue
      container.insertAdjacentHTML(
        // on declare un container en y inserant les variables de chaques objets
        "beforeend",
        `<a href="./product.html?id=${canape._id}">
            <article>
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
              <h3 class="productName">${canape.name}</h3>
              <p class="productDescription">${canape.description}</p>
            </article>
          </a>`
      );
    }
  })
  .catch(function (erreur) {
    alert("Une erreur est survenue" + erreur);
  });
