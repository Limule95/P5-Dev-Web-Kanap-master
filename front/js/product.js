//Récupèration de l'URL de la page en cours de visite.
const url = new URL(window.location.href);

//Récupèration de l'ID dans les paramêtre de l'URL.
// " url.searchParams.get " Retourne la première valeur associée au paramètre de recherche donné.
const id = url.searchParams.get("id");

//********************************* Incorporation "dynamique" de l'article dans la page "PRODUIT" *********************************

//On requette l'API avec "fetch" pour récupèrer les propriétés de l'article.
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (produit) {
    //On récupère la réponse de l'API qui renvoie un objet Promise que l'on nomme ici (produit).

    //********************************* Insertion de l'image *********************************

    //On crée une balise "enfant" ("img") vide en utilisant la méthode createElement().
    const image = document.createElement("img");
    //On définie ses attributs: chemin d'acces a l'image, descrption de l'image.
    image.src = produit.imageUrl;
    image.alt = produit.altTxt;
    //On l'insére au "parent"(".item__img") dans le DOM.
    document.querySelector(".item__img").appendChild(image);
    //autre méthode avec innerHTML =>
    // document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}">`;

    //********************************* Modification du titre "h1" *********************************
    //On sélectionne la balise ("title").
    const title = document.getElementById("title");
    //On insert la propriété "name" du produit.
    title.innerHTML = produit.name;

    //********************************* Modification du prix *********************************
    //On sélectionne la balise ("#price").
    const price = document.querySelector("#price");
    //On insert la propriété "price" du produit.
    price.innerHTML = produit.price;

    //********************************* Modification de la description *********************************
    //On sélectionne la balise ("#description").
    const description = document.querySelector("#description");
    //On insert la propriété "description" du produit.
    description.innerHTML = produit.description;

    //********************************* Insertion des options de couleurs *********************************
    // On parcour la promesse (produit) pour itérer le tableau (colors) de l'article.
    for (let color of produit.colors) {
      //On crée un input "enfant" ("option") vide en utilisant la méthode "createElement()".
      const couleur = document.createElement("option");
      //On définie ses attributs: les couleurs contenus dans le tableau (colors), l'insertion dans l'input avec "innerHTML"
      couleur.value = color;
      couleur.innerHTML = color;
      //On l'insére au "parent"("#colors") dans le DOM.
      document.querySelector("#colors").appendChild(couleur);
    }
  })
  .catch(function (erreur) {
    //Renvoie une réponse "(erreur)"
    alert("Une erreur est survenue" + erreur);
  });

//******************************************************** Fonctionnalité ********************************************************

//********************************* Ajout au Panier *********************************
//On sélectionne la balise ("addToCart").
const button = document.getElementById("addToCart");
//On observe l'évènement "au click" sur le bouton "ajouter au panier".
button.addEventListener("click", addToCart);

//fonction "addToCart" qui va ajouter un article dans le panier.
function addToCart(e) {
  //********************************* On récupère la couleur choisi par l'utilisateur *********************************
  //********************************* Méthode 1 *********************************
  //On sélectionne l'input ("#colors").
  const colorValue = document.querySelector("#colors");
  // on récupère la couleur choisie par l'utilisateur.
  let color = colorValue.value;
  //********************************* Méthode 2 *********************************
  //const colorValue = document.querySelector("#colors").value;

  //Si l'utilisateur n'a choisi aucune couleur ==>.
  if (color === "") {
    //On lance une alerte
    alert("Aucune couleur choisie, veuillez choisir une couleur!");
    // return false empêche la function de continuer jusqu'a que l'utilisateur choisisse une couleur.
    return false;
  }

  //********************************* On récupère la quantitée choisi par l'utilisateur  *********************************
  //********************************* Méthode 1 *********************************
  //On sélectionne l'input ("#quantity").
  const quantityValue = document.querySelector("#quantity");
  // on récupère la valeur qui correspond au nombre d'article choisie par l'utilisateur.
  let nombreValue = quantityValue.value;
  //********************************* Méthode 2 *********************************
  // 2 eme méthode: const quantityValue = document.querySelector("#quantity").value;

  // On récupère les paramêtre de l'article dans un objet (article) que l'on va envoyer dans un localStorage ("articleLocalStorage").
  let article = {
    id: id,
    color: color,
    nombre: Number(nombreValue),
  };

  //********************************* Initialisation du local storage *********************************
  //********************************* Méthode 1 *********************************
  //On récupère l'article du localStorage ("articleLocalStorage") pour ajouter un nouvel article.
  let articleLocalStorage = JSON.parse(localStorage.getItem("article"));
  //********************************* Méthode 2 *********************************
  // let recupArticle = localStorage.getItem("article");
  // let articleStocké = JSON.parse(recupArticle);

  //********************************* Importation dans le local storage ("articleLocalStorage") *********************************

  if (articleLocalStorage == null) {
    //Si le panier est vide, alors =>
    // On crée un "array" panier vide.
    articleLocalStorage = [];
    // On "push" l'objet "article" dans "l'array" LocalStorage ("articleLocalStorage").
    articleLocalStorage.push(article);
    // On ajoute dans le localStorage un "article" qu'on va pouvoir recupérer (en charactere "string") avec "getItem" et stocker "JSON.pars" qui est un "array" qui contient un "objet" contenant les paramêtre de l'article.
    localStorage.setItem("article", JSON.stringify(articleLocalStorage));
    // Utilisation de ".table" pour afficher un tableau dans la console.
    console.table(articleLocalStorage);
  } else {
    //Si le panier comporte déjà au moins 1 article, alors ==>.

    //On initialise une variable avec "false" par défault qui permêttra de définir si une conditions est vrai ou faux.
    let find = false;

    // On parcour le localStorage ("articleLocalStorage").
    for (let produit of articleLocalStorage) {
      //Si l'ID et la couleur de l'article contenue dans le localStorage ("articleLocalStorage") est égale à l'article que l'utilisateur veut ajouter au panier.
      //Par défault la condition est en "false".
      if (produit.id === article.id && produit.color === article.color) {
        //On rajoute le nombre d'article choisi par l'utilisateur.
        produit.nombre = article.nombre + produit.nombre;

        //Si le nombre d'article dans le localStorage ("articleLocalStorage") est déja de "100".
        //********************************* Méthode 1 *********************************
        if (produit.nombre > 100) {
          produit.nombre = 100;
          //On lance une alerte.
          alert("il y à déja 100 articles dans votre panier");
        }
        //********************************* Méthode 2 *********************************
        // produit.nombre =
        //   article.nombre + produit.nombre > 100
        //     ? 100
        //     : article.nombre + produit.nombre;

        //On met a jour le localStorage ("articleLocalStorage") l'article sous frome de "string" avec JSON.stringify.
        localStorage.setItem("article", JSON.stringify(articleLocalStorage));
        //On valide la condition avec "true".
        find = true;
        console.table(articleLocalStorage);
      }
    }
    //Si la première condition est "false"
    if (find === false) {
      // On "push" l'objet "article" dans "l'array" LocalStorage ("articleLocalStorage").
      articleLocalStorage.push(article);
      //On met a jour le localStorage ("articleLocalStorage") l'article sous frome de "string" avec JSON.stringify.
      localStorage.setItem("article", JSON.stringify(articleLocalStorage));
      console.table(articleLocalStorage);
    }
  }
}
