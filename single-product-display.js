import data from './data.js';

var selectedItems = []
const addToCart = document.getElementById('addToCart')
const viewCart = document.getElementById('viewCart')


const productImage = document.getElementById('productImage')
const productName = document.getElementById('productName')
const price = document.getElementById('price')

var selectedProduct = localStorage.getItem('selectedProduct')
var convertedProduct = JSON.parse(selectedProduct);
productImage.setAttribute('src',convertedProduct.pic)
productName.innerHTML = convertedProduct.name
price.innerHTML = "$"+convertedProduct.price

addToCart.addEventListener('click',function(){
    var existingProducts = []
    var getProducts = JSON.parse(localStorage.getItem('addedToCart'))
    if (getProducts != null){
        getProducts.forEach(product =>{
            // product.user = localStorage.getItem('currentUser')
            console.log(product);
            existingProducts.push(product)
        })   
    }
    console.log(existingProducts);
    existingProducts.push(convertedProduct)
    localStorage.setItem('addedToCart',JSON.stringify(existingProducts))
    // console.log(selectedItems);
})

// Footer
const footerDiv = document.createElement('div')
footerDiv.setAttribute('id',"footer-placeholder")

$(function(){
    $("#footer-placeholder").load("footer.html");
});
