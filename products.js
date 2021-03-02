import data from "./data.js";
import categories from "./categories.js"

var allProducts = data
var allCategories = categories

var allData = JSON.parse(localStorage.getItem('allData'))
if (allData != null){
    allProducts = allData
}
var allCat = JSON.parse(localStorage.getItem('allCategories'))
if (allCat != null){
    allCategories = allCat   
}
console.log(allProducts);

// ----------Targeting Elements----------
const body = document.querySelector('body');
const typeOfProduct = localStorage.getItem("typeOfProduct");
const category = typeOfProduct.split(" ")[0]
console.log(typeOfProduct);
var sortedProducts = []
const divContainerFluid = document.createElement('div')
const divRow = document.createElement('div');

const divColSide = document.createElement('div');
const divColRight = document.createElement('div');
const h1 = document.createElement('h1');
divColRight.append(h1)

h1.innerHTML = typeOfProduct
document.title = typeOfProduct


// -----------Sorting Dropdown--------------
const divDrop = document.createElement('div');
divDrop.className = 'dropdown'
const btnDrop = document.createElement('button');
btnDrop.className = "btn btn-secondary dropdown-toggle"
btnDrop.type = 'button'
btnDrop.id = 'dropdownMenuButton1'
btnDrop.drop = 'dropdown';
btnDrop.setAttribute('data-toggle','dropdown')

btnDrop.innerHTML = "Sort"
const ul = document.createElement('ul');
ul.className = 'dropdown-menu'
ul.setAttribute('aria-labelledby','dropdownMenuButton1')
const li1 = document.createElement('li');
const a1 = document.createElement('a');
li1.append(a1)
const li2 = document.createElement('li');
const a2 = document.createElement('a');
li2.append(a2)
a1.className = 'dropdown-item'
a2.className = 'dropdown-item'
a1.innerHTML = "Price : Low to High"
a2.innerHTML = 'Price : High to Low'

// -------------Sort Functions-------------
a1.addEventListener('click', function(){
    while (row2.firstChild) {
        row2.firstChild.remove()
    }
        sortedProducts = sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        sortedProducts.forEach(product => buildProductCard(product));
})
a2.addEventListener('click', function(){
    while (row2.firstChild) {
        row2.firstChild.remove()
    }
        sortedProducts = sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        sortedProducts.forEach(product => buildProductCard(product));
})

ul.append(li1)
ul.append(li2)
btnDrop.append(ul)
divDrop.append(btnDrop)
divColRight.append(divDrop)

body.append(divContainerFluid)
divContainerFluid.append(divRow)

divContainerFluid.setAttribute('class',"container-fluid")
divRow.setAttribute('class','row')
divRow.append(divColSide)
divRow.append(divColRight)

divColSide.setAttribute('class','col-3')
divColRight.setAttribute('class','col-9')
const row2 = document.createElement('div')
row2.setAttribute('class','row feature-images-rowd')
divColRight.append(row2)

// --------Category Sidebar----------
const buildCategories = category => {
    const a = document.createElement('a')
    a.className = 'goToProduct nav-link text-dark'
 
    a.href = 'product-display.html'
    a.type = category.name
    divColSide.append(a)
    a.innerHTML = category.name
}

allCategories.forEach(category => buildCategories(category));
var numberOfProductLinks = document.querySelectorAll(".goToProduct");
console.log(numberOfProductLinks.length);

numberOfProductLinks.forEach((link,index) => {

    document.querySelectorAll(".goToProduct")[index].addEventListener("click",function(){
        localStorage.setItem('typeOfProduct',category + " " +this.type)
    })
});
// ----------Product Cards-------------
const buildProductCard = product => {
const linkDiv = document.createElement('a')
const divCol = document.createElement('div')
const img = document.createElement('img')
const nameOfProduct = document.createElement('h6')
const priceOfProduct = document.createElement('p')

divCol.append(linkDiv)
linkDiv.append(img)
linkDiv.append(nameOfProduct)
linkDiv.append(priceOfProduct)
row2.append(divCol)



divCol.setAttribute('class','col-lg-3 col-md-4 col-sm-6')
//img.setAttribute('class','feature-images')
img.setAttribute('src',product.pic)
img.setAttribute('width',"100%")
// img.setAttribute('height',"100%")
nameOfProduct.innerHTML = product.name;
priceOfProduct.innerHTML = "$"+product.price
linkDiv.className = 'product-link'
linkDiv.type = product.id
linkDiv.href = 'single-product-display.html'

linkDiv.addEventListener('click', function(){
    // console.log(JSON.stringify(product));
    localStorage.setItem('selectedProduct',JSON.stringify(product)) 
})
}

// Footer Holder

const footerDiv = document.createElement('div')
footerDiv.setAttribute('id',"footer-placeholder")
body.append(footerDiv)

$(function(){
    $("#footer-placeholder").load("footer.html");
});
// data.forEach(product => buildProductCard(product));

// ------------Load Products-----------

function loadProducts(types){
    if (types === "Men's Products"){
        sortedProducts = allProducts.filter(function(product){
            return product.type.startsWith("Men's")
        })
}
else if(types === "Women's Products") {
    sortedProducts = allProducts.filter(function(product){
        return product.type.startsWith("Women's")
    })

}else{
var x = localStorage.getItem('typeOfProduct')
    if (x.split(' ')[0] === "Men's"){
        sortedProducts = allProducts.filter(function(product){
            return product.type.includes(types) && product.type.startsWith("Men's")
        })
    }else{
        sortedProducts = allProducts.filter(function(product){
            return product.type.includes(types) && product.type.startsWith("Women's")
        })
    }
}
    sortedProducts.forEach(product => buildProductCard(product));
}
loadProducts(typeOfProduct)