// --------------------------------CODE EXCUTÉ------------------------------------//

let myOrders = GetOrdersFromLocalStorage();
let formData = {
  contact: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  },
  products: [],
};

Main();

// --------------------------------FONCTIONS------------------------------------//

//Fonction principale pour exécuter l'ensemble du code de la page
async function Main() {
  await GetOrdersFromAPI();
  DisplayProducts();
  CalculateTotal();
  DisplayErrorsInForm();
}

//Fonction pour incrementer l'objet MyOrders avec des informations additionnelles
async function GetOrdersFromAPI() {
  for (let order of myOrders) {
    let orderDetail = await GetOneOrder(order.productId);
    order.data = orderDetail;
  }
}

//Fonction fonction pour fetch les données d'un seul produit
function GetOneOrder(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.error(error);
    });
}

//Function pour extraire les orders du local storage et les convertir en un objet JSON utilisable
function GetOrdersFromLocalStorage() {
  const items = { ...localStorage };

  let orders = [];
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      orders.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  return orders;
}

//Function pour utiliser les objets JSON et les intégrer dans le HTML
function DisplayProducts() {
  for (let order of myOrders) {
    const myCart = document.getElementById("cart__items");

    //Creating a new article(1) inside SECTION
    let cartArticles = document.createElement("article");
    cartArticles.innerHTML = "";
    cartArticles.className = "cart__item";
    cartArticles.dataset.id = order.productId;
    cartArticles.dataset.color = order.color;

    myCart.appendChild(cartArticles);

    //Creating a new DIV inside ARTICLE(1)
    let cartImageContainer = document.createElement("div");
    cartImageContainer.innerHTML = "";
    cartImageContainer.className = "cart__item__img";

    cartArticles.appendChild(cartImageContainer);

    // //IMG with URl
    let newImg = document.createElement("img");
    newImg.src = order.data.imageUrl;
    newImg.alt = order.data.altTxt;

    cartImageContainer.appendChild(newImg);

    //Creating a new DIV(1) inside ARTICLE(1)
    let cartItemContainer = document.createElement("div");
    cartItemContainer.innerHTML = "";
    cartItemContainer.className = "cart__item__content";

    cartArticles.appendChild(cartItemContainer);

    //Creating a new DIV(2) inside DIV(1)
    let cartItemContainerDescription = document.createElement("div");
    cartItemContainerDescription.innerHTML = "";
    cartItemContainerDescription.className = "cart__item__content__description";

    cartItemContainer.appendChild(cartItemContainerDescription);

    //Creating Heading H2 Tag inside DIV(2)
    let cartTitle = document.createElement("h2");
    cartTitle.innerText = order.data.name;

    cartItemContainerDescription.appendChild(cartTitle);

    //Creating p inside DIV(2)
    let cartColor = document.createElement("p");
    cartColor.innerText = order.color;

    cartItemContainerDescription.appendChild(cartColor);

    //Creating p inside DIV(2)
    let cartPrice = document.createElement("p");
    cartPrice.innerText = order.data.price + " €";

    cartItemContainerDescription.appendChild(cartPrice);

    //Creating a new DIV(3) inside DIV(1)
    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.innerHTML = "";
    cartItemContentSettings.className = "cart__item__content__settings";

    cartItemContainer.appendChild(cartItemContentSettings);

    //Creating a new DIV(4) inside DIV(3)
    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.innerHTML = "";
    cartItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    //Creating p inside DIV(4)
    let productQuantity = document.createElement("p");
    productQuantity.innerText = "Qté : ";

    cartItemContentSettingsQuantity.appendChild(productQuantity);

    //Creating input inside DIV(4)
    let productQuantityInput = document.createElement("input");
    productQuantityInput.type = "number";
    productQuantityInput.className = "itemQuantity";
    productQuantityInput.name = "itemQuantity";
    productQuantityInput.min = "1";
    productQuantityInput.max = "100";
    productQuantityInput.value = order.quantity;

    cartItemContentSettingsQuantity.appendChild(productQuantityInput);

    //Creating a new DIV(5) inside DIV(3)
    let cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.innerHTML = "";
    cartItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    //Creating p inside DIV(5) = Delete Button
    let deleteItem = document.createElement("p");
    deleteItem.innerText = "Supprimer";
    deleteItem.className = "deleteItem";
    cartItemContentSettingsDelete.appendChild(deleteItem);

    //Adding eventlistener to update quantity directly in LocalStorage
    productQuantityInput.addEventListener("input", function (e) {
      order.quantity = e.target.value;
      localStorage.setItem(
        order.productId + "-" + order.color,
        JSON.stringify(order)
      );
    });

    //Adding eventlistener to delete item directly in LocalStorage
    deleteItem.addEventListener("click", function (e) {
      order.quantity = 0;
      localStorage.removeItem(
        cartArticles.dataset.id + "-" + cartArticles.dataset.color
      );
      deleteItem.closest("article").style.display = "none";
    });

    //Adding eventlistener to call the function calculating the total
    productQuantityInput.addEventListener("input", CalculateTotal);

    //Adding eventlistener to call the function calculating the total
    deleteItem.addEventListener("click", CalculateTotal);
  }
}

//Fonction pour calculer la quantité totale ainsi que le prix de la commande
function CalculateTotal() {
  let totalOrders = 0;
  let totalPrice = 0;

  for (order of myOrders) {
    let totalQuantityContainer = document.getElementById("totalQuantity");
    let totalCalculated = (totalOrders += parseInt(order.quantity));
    totalQuantityContainer.innerHTML = totalCalculated;
    // console.log(totalOrders);

    let totalPriceContainer = document.getElementById("totalPrice");
    let totalPriceCalculated = (totalPrice +=
      parseInt(order.data.price) * order.quantity);
    totalPriceContainer.innerHTML = totalPriceCalculated;
    // console.log(totalPrice);
  }
}

//Fonction pour valider l'input des Forms
function DisplayErrorsInForm() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const emailInput = document.getElementById("email");

  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  const formulaire = document.getElementById("cartForm");

  formulaire.addEventListener("submit", (e) => {
    let errorMessages = {
      firstName: "",
      lastName: "",
      city: "",
      email: "",
    };

    if (!firstNameInput.value.match(/^[A-Za-z]+$/)) {
      errorMessages.firstName = "Veuillez n'utiliser que des lettres :)";
    }
    if (!lastNameInput.value.match(/^[A-Za-z]+$/)) {
      errorMessages.lastName = "Veuillez n'utiliser que des lettres :)";
    }
    if (!cityInput.value.match(/^[A-Za-z]+$/)) {
      errorMessages.city = "Veuillez n'utiliser que des lettres :)";
    }
    if (!emailInput.value.match(/\S+@\S+\.\S+/)) {
      errorMessages.email = "Veuillez renseigner une addresse email correcte";
    }

    if (
      errorMessages.firstName != "" ||
      errorMessages.lastName != "" ||
      errorMessages.city != "" ||
      errorMessages.email != ""
    ) {
      e.preventDefault();
      firstNameErrorMsg.innerText = errorMessages.firstName;
      lastNameErrorMsg.innerText = errorMessages.lastName;
      cityErrorMsg.innerText = errorMessages.city;
      emailErrorMsg.innerText = errorMessages.email;
    } else {
      e.preventDefault();
      CreateObjectOrder();
    }
  });
}

//Fonction pour créer l'objet qui sera posté dans l'API
function CreateObjectOrder() {
  formData.contact.firstName = firstName.value;
  formData.contact.lastName = lastName.value;
  formData.contact.address = address.value;
  formData.contact.city = city.value;
  formData.contact.email = email.value;
  console.log(formData);

  for (order of myOrders) {
    if (order.quantity != 0) {
      formData.products.push(order.productId);
    }
  }

  PostObjectOrder();
}

//Fonction pour poster l'objet dans l'API
async function PostObjectOrder() {
  console.log(formData);

  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      confirmationData = data;
      console.log(data.orderId);

      //calling function to redirect URl
      window.location.href =
        "./confirmation.html?" + "confirmationId=" + confirmationData.orderId;
    })
    .catch(function (error) {
      console.error(error);
    });
}
