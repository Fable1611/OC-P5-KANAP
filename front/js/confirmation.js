//Recuperation de l'ID pour FETCH

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("confirmationId");

document.getElementById("orderId").innerText = id;
