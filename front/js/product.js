//Recuperation de l'ID pour FETCH
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

function Main() {
  DisplayOneProduct();
}

//Fetch des donnes du produit
function DisplayOneProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      let product = data;
      //console.log(product);

      // Image of product
      const imgContainer = document.getElementById("imageContainer");
      let newImg = document.createElement("img");
      newImg.src = product.imageUrl;
      newImg.alt = product.altTxt;
      imgContainer.appendChild(newImg);

      // Name, Price and Description of the product
      document.getElementById("title").innerText = product.name;
      document.getElementById("price").innerText = product.price;
      document.getElementById("description").innerText = product.description;

      // Color Selector
      for (let color of product.colors) {
        //console.log(color);

        const optionSet = document.getElementById("colors");
        let newOption = document.createElement("option");
        newOption.value = color;
        newOption.innerText = color;
        optionSet.appendChild(newOption);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

//Remplit le cart avec les informations de la page
document.getElementById("addToCart").addEventListener("click", AddToCart);
function AddToCart() {
  //Creating an object for the local storage
  let orderDetails = {
    productId: id,
    quantity: 0,
    color: "",
  };

  let colorOption = document.getElementById("colors");
  let kanapQuantity = document.getElementById("quantity");

  //Controlling for orders with negative values or empty color values
  if (!colorOption.value || kanapQuantity.value < "1") {
    alert("Veuillez renseigner une valeur adéquate");
  } else {
    orderDetails.color = colorOption.value;

    //S'il y a deja un objet avec la même couleur, il sera extrait du local storage, parsé et sa propriété quantité sera ajouté à la nouvelle quantité
    if (localStorage.getItem(id + "-" + orderDetails.color)) {
      orderDetails = JSON.parse(
        localStorage.getItem(id + "-" + orderDetails.color)
      );
    }

    orderDetails.quantity += parseInt(
      document.getElementById("quantity").value
    );

    //Envoie l'objet order details en créant une clef avec le ID et la couleur
    localStorage.setItem(
      id + "-" + orderDetails.color,
      JSON.stringify(orderDetails)
    );
  }
}

Main();
