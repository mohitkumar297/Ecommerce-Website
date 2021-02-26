import data from './data.js';

const searchedProduct = localStorage.getItem('searchedProduct')
var results = []
const row = document.getElementById('row')



function buildProduct(product){
    const divCol = document.createElement('div')
    divCol.className = 'col-3'
    row.append(divCol)
    const linkDiv = document.createElement('a')
    divCol.append(linkDiv) 

    const img = document.createElement('img')
    img.className = 'img'
    img.src = product.pic
    img.setAttribute('width','300px')
    linkDiv.append(img)
    
    const productName = document.createElement('p')
    const productPrice = document.createElement('p')
    productName.innerHTML = product.name
    productPrice.innerHTML = "$"+product.price
    linkDiv.append(productName)
    linkDiv.append(productPrice)
    linkDiv.className = 'product-link'
linkDiv.type = product.id
linkDiv.href = 'single-product-display.html'

linkDiv.addEventListener('click', function(){
    // console.log(JSON.stringify(product));
    localStorage.setItem('selectedProduct',JSON.stringify(product)) 
})
}


results = data.filter(function(product){
    // var type = product.type.toLowerCase()
    // var name = product.name.toLowerCase()
    return product.type.toLowerCase().includes(searchedProduct) || product.name.toLowerCase().includes(searchedProduct)
})

results.forEach(product => buildProduct(product))
