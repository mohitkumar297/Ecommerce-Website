import data from './data.js';

const checkoutBtn = document.getElementById('checkoutBtn')

const listSection = document.getElementById('listSection') 

const orderValue = document.getElementById('orderValue') 
const deliveryPrice = document.getElementById('deliveryPrice') 
const totalAmount = document.getElementById('totalAmount') 

function buildCart(product){
    const divRow = document.createElement('div')
divRow.className = 'row items'
listSection.append(divRow)
    const imgCol = document.createElement('div')
    divRow.append(imgCol)
    imgCol.className = 'col-3 img'
    const infoCol = document.createElement('div')
    divRow.append(infoCol)
    infoCol.className = 'col-9'

    const productImage = document.createElement('img')
    productImage.src = product.pic
    imgCol.append(productImage)
    productImage.setAttribute('width','100px');

    const productName = document.createElement('p')
    productName.innerHTML = product.name
    infoCol.append(productName)

const productPrice = document.createElement('p')
productPrice.innerHTML = "$"+product.price
infoCol.append(productPrice)

const removeLink = document.createElement('button')
removeLink.className = 'btn btn-danger'
    
    removeLink.innerHTML = "Remove"
    infoCol.append(removeLink)
    removeLink.addEventListener('click', function(){
        var existingProducts = []
        var getProducts = JSON.parse(localStorage.getItem('addedToCart'))
        if (getProducts != null){
            getProducts.forEach(prod =>{
                existingProducts.push(prod)
            })
        }
        var index = existingProducts.findIndex(function (value) {
            return value.id == product.id;
            });
        if (index > -1) {
            existingProducts.splice(index, 1);
          }
          while (listSection.firstChild) {
            listSection.firstChild.remove()
        }
        localStorage.setItem('addedToCart',JSON.stringify(existingProducts))
        getProductsInCart()
    })
}


function getProductsInCart(){
    var price = 0
    var existingProducts = JSON.parse(localStorage.getItem('addedToCart'))
    existingProducts.forEach(product =>{
        buildCart(product)
        price += product.price
    })
    orderValue.innerHTML = "Order Value : $"+price.toFixed(2)
        deliveryPrice.innerHTML = "Delivery Price : $9.99"
        totalAmount.innerHTML = "Total Amount : $" + (price+9.99).toFixed(2)
}

checkoutBtn.addEventListener('click', function(){
    // product.user = localStorage.getItem('currentUser')
})


// Footer
const footerDiv = document.createElement('div')
footerDiv.setAttribute('id',"footer-placeholder")

$(function(){
    $("#footer-placeholder").load("footer.html");
});
getProductsInCart()


