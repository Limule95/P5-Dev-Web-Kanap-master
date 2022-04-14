const url = new URL(window.location.href); //url de la page enc ours a partir de window
const id = url.searchParams.get("id");
console.log(window.location.href);

// On requête l’API dans le but de récupérer les différentes informations du produit en question.
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (produit) {
    //On crée un élément (enfant) img vide en utilisant la méthode createElement()
    const image = document.createElement("img");
    //On définie ses attributs : chemin d'acces, descrption de l'image
    image.src = produit.imageUrl;
    image.alt = produit.altTxt;
    //On l'insére (au parent) dans le document. ex: Div parent => enfant.element
    document.querySelector(".item__img").appendChild(image);

    //autre méthode avec innerHTML =>
    // document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}">`;

    const title = document.getElementById("title");
    title.innerHTML = produit.name;
    console.log(title);

    const price = document.querySelector("#price");
    price.innerHTML = produit.price;
    console.log(price);

    const description = document.querySelector("#description");
    description.innerHTML = produit.description;
    console.log(description);

    //pour "les couleurs" de "l'objet produit + sa donnée #le tableau qui contient les couleurs" = objet.donnée {objet.[couleur]}
    for (let produitCouleur of produit.colors) {
      //On crée un élément (enfant) "option" vide en utilisant la méthode "createElement()"
      const couleur = document.createElement("option");
      //On définie les attributs :
      couleur.value = produitCouleur;
      couleur.innerHTML = produitCouleur;
      console.log(couleur);
      //On l'insére (au parent) dans le document. ex: Div parent => enfant.element
      document.querySelector("#colors").appendChild(couleur);
    }
  })
  .catch(function (erreur) {
    // Une erreur est survenue
  });

// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5578156-ecoutez-des-evenements
// target.addEventListener(type, listener [, options]);
//On observe l'évènement "au click" sur le bouton "ajouter au panier" fait par l'utilisateur -------------
const button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);

function addToCart(e) {
  let color = document.getElementById("colors").value;
  let nombre = document.getElementById("quantity").value;
  let titre = document.getElementById("title");
  console.log(id, color, nombre, titre.innerHTML);
}
