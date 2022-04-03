console.log("product.js");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let productPageTitle = document.querySelector("title");
let productPageDescription = document.querySelector(`meta[content]`);

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors");

const urlProductsAPI = "http://localhost:3000/api/products/";

//Cette fonction permet de nous retourner la valeur du paramètre dans l'URL
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  if (parameters.has(parameterName)) {
    console.log("Le paramètre: " + parameterName + " est présent dans l'URL");
  }
  return parameters.get(parameterName);
}

/*
Cette fonction nous permet d'afficher les données/détails du produit grâce à son ID par appel d'API
*/

let productId = getParameter("id");

async function showProductDetails() {
  try {
    

    let response = await fetch(urlProductsAPI + productId);
    let couchProduct = await response.json();

    const { imageUrl, altTxt, colors, name, price, description } = couchProduct;

    productPageTitle.textContent = name;
    productPageDescription.setAttribute(
      "content",
      `Description du produit ${name}: ${description}`
    );

    itemImage.innerHTML = `
        <img src="${imageUrl}" alt="${altTxt}">
                `;
    itemTitle.textContent = name;
    itemPrice.textContent = price;
    itemDescription.textContent = description;
    for (color of colors) {
      itemColors.innerHTML += `
          <option value="${color}">${color}</option>
          `;
    }
    return productId;
  } catch (error) {
    console.log(
      "%c↓ Attention erreur dans la fonction showProductDetails() de product.js " +
        error +
        " ↓",
      "background-color: crimson;"
    );
    console.error(error);
  }
}



showProductDetails();




//---------------TEST----------------//

let quantityProduct = document.getElementById("quantity");
let valid = true;

itemColors.addEventListener("change", function(event){
  let colorValue = event.target.value;
  console.log(colorValue);
});

quantityProduct.addEventListener("input", function(event){
  let quantityValue = event.target.value;
  console.log(quantityValue);
});
