//Recuperation de l'ID pour FETCH

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

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

//console.log(localStorage);

async function AddToCart() {
  let orderDetails = {
    productId: id,
    quantity: 0,
    color: "",
    price: "",
    imgUrl: "",
    altTxt: "",
    name: "",
  };

  await fetch("http://localhost:3000/api/products/" + id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      orderDetails.price = data.price;
      orderDetails.imgUrl = data.imageUrl;
      orderDetails.altTxt = data.altTxt;
      orderDetails.name = data.name;
    })
    .catch(function (error) {
      console.error(error);
    });

  orderDetails.color = document.getElementById("colors").value;

  if (localStorage.getItem(id + "-" + orderDetails.color)) {
    orderDetails = JSON.parse(
      localStorage.getItem(id + "-" + orderDetails.color)
    );
  }

  orderDetails.quantity += parseInt(document.getElementById("quantity").value);

  localStorage.setItem(
    id + "-" + orderDetails.color,
    JSON.stringify(orderDetails)
  );
}

DisplayOneProduct();
