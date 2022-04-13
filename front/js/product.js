console.log("product.js");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let productPageTitle = document.querySelector("title");
let productPageDescription = document.querySelector(`meta[content]`);

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors");

let addToCartButton = document.getElementById("addToCart");

let productPrice = 0;
let imageUrlProduct = "";
let alternativeText = "";
let productName = "";
let productDescription = "";

let productId = getParameter("id");

/*
Cette fonction nous permet d'afficher les données/détails du produit par appel d'API grâce à son ID récupéré précedemment 
*/

let showProductDetailsinHTML = (
  imageUrl,
  altTxt,
  colors,
  name,
  price,
  description
) => {
  productPageTitle.textContent = name;
  productName = name;

  productPageDescription.setAttribute(
    "content",
    `Description du produit ${name}: ${description}`
  );

  itemImage.innerHTML = `
      <img src="${imageUrl}" alt="${altTxt}">
              `;
  imageUrlProduct = imageUrl;
  alternativeText = altTxt;
  itemTitle.textContent = name;
  itemPrice.textContent = price;
  productPrice = price;

  itemDescription.textContent = description;
  productDescription = description;
  for (color of colors) {
    itemColors.innerHTML += `
        <option value="${color}">${color}</option>
        `;
  }
};

async function showProductDetails() {
  try {
    let response = await fetch(urlProductsAPI + productId);
    let couchProduct = await response.json();

    const { imageUrl, altTxt, colors, name, price, description } = couchProduct;

    showProductDetailsinHTML(
      imageUrl,
      altTxt,
      colors,
      name,
      price,
      description
    );

    console.log(
      imageUrlProduct +
        "\n" +
        alternativeText +
        "\n" +
        productPrice +
        "\n" +
        productDescription
    );
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

let quantityProduct = document.getElementById("quantity");
let valid = true;

class classProductCartDetails {
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
  }
}

/*
Evènment qui va écouter au click du bouton "Ajouter au panier" qui va les produits dans le panier
*/
addToCartButton.addEventListener("click", function () {
  let colorValue = itemColors.value;
  let quantityValue = quantityProduct.value;

  if (quantityValue > 0 && quantityValue <= 100 && colorValue != 0) {
    let objectProduct = new classProductCartDetails(
      productId,
      colorValue,
      Number(quantityValue)
    );

    console.table(objectProduct);

    addedToCart(objectProduct);
    alert("Votre produit a bien été ajouté au panier!");
  }
  if (colorValue == 0 && (quantityValue <= 0 || quantityValue > 100)) {
    alert("Attention! Veuillez ajouter les détails du produits");
  } else if (colorValue == 0) {
    alert("Attention! Vous devez choisir une couleur");
  } else if (quantityValue <= 0 || quantityValue > 100) {
    alert("Attention! La quantité saisie est invalide");
  }
});
