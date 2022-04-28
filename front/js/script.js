DisplayProducts();

function DisplayProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      let products = data;
      for (let product of products) {
        const mySection = document.getElementById("items");

        // Links to Product
        let newLink = document.createElement("a");
        newLink.href = "./product.html?id=" + product._id;

        mySection.appendChild(newLink);

        //Article containing IMG, Title and P
        let newArticle = document.createElement("article");
        newArticle.innerHTML = "";

        newLink.appendChild(newArticle);

        //IMG with URl
        let newImg = document.createElement("img");
        newImg.src = product.imageUrl;
        newImg.alt = product.altText;

        newArticle.appendChild(newImg);

        //Heading H3 Tag
        let newTitle = document.createElement("h3");
        newTitle.className = "productName";
        newTitle.innerText = product.name;

        newArticle.appendChild(newTitle);

        //Paragraph with class name and description
        let newParagraph = document.createElement("p");
        newParagraph.className = "productDescription";
        newParagraph.innerText = product.description;
        newArticle.appendChild(newParagraph);
      }
    })

    .catch(function (error) {
      console.error(error);
    });
}
