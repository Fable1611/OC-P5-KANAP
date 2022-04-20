function displayProducts () { 
    
fetch('http://localhost:3000/api/products')
    .then(response => {
        if (response.ok) {        
        return response.json();
        }
    })
    .then(function(data) {
        
        console.log(data);
       

      for ( let product of data ) {

        const mySection = document.getElementById('items');

        // Links to Product
        let newLink = document.createElement('a');
        newLink.href ='./product.html?id='+product._id;
        
        mySection.appendChild(newLink);

        let newArticle = document.createElement('article');
        newArticle.innerHTML = "";
        
        newLink.appendChild(newArticle);

        let newImg = document.createElement('img');
        newImg.src = product.imageUrl;
        newImg.alt = product.altText;

        newArticle.appendChild(newImg);
        
        let newTitle = document.createElement('h3');
        newTitle.className = 'productName';
        newTitle.innerText = product.name;
        newArticle.appendChild(newTitle);

        let newParagraph = document.createElement('p');
        newParagraph.className = 'productDescription';
        newParagraph.innerText = product.description;
        newArticle.appendChild(newParagraph);

        }
        
    })
 
    .catch(function(error){
        console.error(error);
    });
    
};

displayProducts();



/* TEMPLATE JS


    const supportsTemplate = function() {
    return 'content' in document.createElement('template');
}

document.addEventListener('DOMContentLoaded', () => {
    
    if (supportsTemplate()) {

            console.log('templates are supported');
            
            let myTemplate = document.getElementById('items');
            let content = myTemplate.content;
            
            document.body.appendChild(content);

    } else {
            alert('Does not support Templates');
    }

}) */

















/* 

    .then(res=> {
        if(res.ok) {
           console.log('success') 
        } else {
            console.log('not successful')
        }

    })



data.then(response => response.json()).then(data => console.log(data));

let myTitle = document.getElementById('myTitle');

myTitle.innerHTML = data[0];

console.log(myTitle.innerHTML);

*/