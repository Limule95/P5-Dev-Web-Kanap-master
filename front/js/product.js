const url = new URL(window.location.href); //url de la page en cours a partir de window
const id = url.searchParams.get("id");

//====================================================================================

// Récupération des articles de l'API
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  // Répartition des données de l'API dans le DOM
  .then(function (produit) {
    // Insertion de l'image
    //On crée un élément (enfant) img vide en utilisant la méthode createElement()
    const image = document.createElement("img");
    //On définie ses attributs : chemin d'acces, descrption de l'image
    image.src = produit.imageUrl;
    image.alt = produit.altTxt;
    //On l'insére (au parent) dans le document. ex: Div parent => enfant.element
    document.querySelector(".item__img").appendChild(image);

    //autre méthode avec innerHTML =>
    // document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}">`;

    // Modification du titre "h1"
    const title = document.getElementById("title");
    title.innerHTML = produit.name;

    // Modification du prix
    const price = document.querySelector("#price");
    price.innerHTML = produit.price;

    // Modification de la description
    const description = document.querySelector("#description");
    description.innerHTML = produit.description;

    // Insertion des options de couleurs
    //pour "les couleurs" de "l'objet produit + sa donnée #le tableau qui contient les couleurs" = objet.donnée {objet.[couleur]}
    for (let produitCouleur of produit.colors) {
      //On crée un élément (enfant) "option" vide en utilisant la méthode "createElement()"
      const couleur = document.createElement("option");
      //On définie les attributs :
      couleur.value = produitCouleur;
      couleur.innerHTML = produitCouleur;
      //On l'insére (au parent) dans le document. ex: Div parent => enfant.element
      document.querySelector("#colors").appendChild(couleur);
    }
  })
  .catch(function (erreur) {
    alert("Une erreur est survenue" + erreur);
  });

//====================================================================================

// Ajout au Panier
//On observe l'évènement "au click" sur le bouton "ajouter au panier" fait par l'utilisateur -------------
const button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);

// On crée une fonction "addToCart" qui va ajouter un produit dans le panier
function addToCart(e) {
  // on récupère la couleur choisie
  const colorValue = document.querySelector("#colors");
  let color = colorValue.value;
  if (color === "") {
    alert("Aucune couleur choisie, veuillez choisir une couleur!");
    return false;
  }

  // 2 eme méthode: const colorValue = document.querySelector("#colors").value;

  // On récupère la quantitée voulue
  const quantityValue = document.querySelector("#quantity");
  let nombreValue = quantityValue.value;
  // 2 eme méthode: const colorValue = document.querySelector("#quantity").value;

  // Options de l'article à ajouter au panier
  let article = {
    id: id,
    color: color,
    nombre: Number(nombreValue),
  };

  //Initialisation du local storage
  //Récupérer l'article du stockage pour ajouter un nouvel article
  let articleLocalStorage = JSON.parse(localStorage.getItem("article"));

  // 2e méthode :
  // var recupArticle = localStorage.getItem("article");
  // var articleStocké = JSON.parse(recupArticle);

  //Importation dans le local storage
  //Si le panier est vide, alors =>
  if (articleLocalStorage == null) {
    // On crée un "array" panier
    articleLocalStorage = [];
    // On "push" ajoute l'article dans "l'array" panier
    articleLocalStorage.push(article);
    // On ajoute dans le localStorage un "article" qu'on va pouvoir recupérer (en charactere "string") avec "getItem" et stocker "JSON.pars" qui est un "array" qui contient un "objet" contenant des données sur l'article
    localStorage.setItem("article", JSON.stringify(articleLocalStorage));
    // Utilisation de ".table" pour afficher un tableau dans la console
    console.table(articleLocalStorage);

    //Sinon => Si le panier comporte déjà au moins 1 article
  } else {
    let find = false;
    for (let produit of articleLocalStorage) {
      if (produit.id === article.id && produit.color === article.color) {
        produit.nombre = article.nombre + produit.nombre;

        // produit.nombre =
        //   article.nombre + produit.nombre > 100
        //     ? 100
        //     : article.nombre + produit.nombre;

        if (produit.nombre > 100) {
          produit.nombre = 100;
          alert("il y à déja 100 articles dans votre panier");
        }
        localStorage.setItem("article", JSON.stringify(articleLocalStorage));
        find = true;
        console.table(articleLocalStorage);
      }
    }
    if (find === false) {
      articleLocalStorage.push(article);
      localStorage.setItem("article", JSON.stringify(articleLocalStorage));
      console.table(articleLocalStorage);
    }
  }
}
