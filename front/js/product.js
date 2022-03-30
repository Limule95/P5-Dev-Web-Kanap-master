fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (catalogue) {
    console.log(catalogue);
  })
  .catch(function (erreur) {
    // Une erreur est survenue
  });
