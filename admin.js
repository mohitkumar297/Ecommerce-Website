import data from "./data.js";
import categories from "./categories.js";
import users from "./user.js"
import orders from './order.js'

var savedUsers = users

var allUsers = JSON.parse(localStorage.getItem('savedUsers'))
if (allUsers != null) {
    savedUsers = allUsers
}

const addNewProduct = document.getElementById('addNewProduct')
var newProductFileImg = ""
var allProducts = data
var allData = JSON.parse(localStorage.getItem('allData'))
if (allData != null) {
    allProducts = allData
}
var allCategories = categories
var allCat = JSON.parse(localStorage.getItem('allCategories'))
if (allCat != null) {
    allCategories = allCat
}

const title = document.getElementById('title')
const infoColumn = document.getElementById('container-info')
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
    if (links[i].className == 'nav-link') {
        links[i].onclick = function () {
            loadType(this.type)
        }
    }
}

const outerRow = document.createElement('div')
outerRow.className = 'row'
infoColumn.append(outerRow)


// ------------BUILDING ALL PRODUCTS--------------
function buildProducts(product) {
    // infoColumn.append(title)
    //         title.innerHTML = "Products"
    const row = document.createElement('div')
    row.className = 'row'
    outerRow.append(row)

    const leftInnerDiv = document.createElement('div')
    leftInnerDiv.className = 'col-6'
    // row.append(leftInnerDiv)
    const img = document.createElement('img')
    leftInnerDiv.append(img)
    // row.setAttribute('height','200px')
    const priceTag = document.createElement('input')
    const productName = document.createElement('input')
    leftInnerDiv.append(productName)
    leftInnerDiv.append(priceTag)
    // row.append(leftInnerDiv)
    img.src = product.pic
    img.setAttribute('width', "100px")
    productName.value = product.name
    if (priceTag.value.includes("$")){
        priceTag.value = product.price
    }
   else{
    priceTag.value ="$"+ product.price
   }
    productName.readOnly = true
    priceTag.readOnly = true

    const rightInnerDiv = document.createElement('div')
    rightInnerDiv.className = 'col-6'
    // row.append(rightInnerDiv)
    const editBtn = document.createElement('button')
    editBtn.innerHTML = "Edit"
    rightInnerDiv.append(editBtn)
    editBtn.className = "btn btn-dark"
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "Delete"
    rightInnerDiv.append(deleteBtn)
    deleteBtn.className = "btn btn-danger"
    outerRow.append(leftInnerDiv)
    outerRow.append(rightInnerDiv)
    editBtn.addEventListener('click', function () {
        if (this.innerHTML === "Edit") {
            productName.readOnly = false
            priceTag.readOnly = false
            this.innerHTML = "Save"
        }
        else if (this.innerHTML === "Save") {
            var index = allProducts.findIndex(obj => obj.id == product.id);
            if (index > -1) {
                allProducts[index].name = productName.value   
                allProducts[index].price = parseFloat(priceTag.value.substring(1))
                console.log(allProducts);
            }
            localStorage.setItem('allData', JSON.stringify(allProducts))
            while (outerRow.firstChild) {
                console.log(infoColumn.firstChild);
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            title.innerHTML = "Products"
            allProducts.forEach(product => buildProducts(product))
            this.innerHTML = "Edit"
            productName.readOnly = true
            priceTag.readOnly = true
        }


    })
    deleteBtn.addEventListener('click', function () {
        var index = allProducts.findIndex(obj => obj.id == product.id);
        allProducts.splice(index, 1)
        localStorage.setItem('allData', JSON.stringify(allProducts))
        while (outerRow.firstChild) {
            console.log(outerRow.firstChild);
            outerRow.firstChild.remove()
        }
        outerRow.append(title)
            title.innerHTML = "Products"
        allProducts.forEach(product => buildProducts(product))
    })
    // infoColumn.append(title)
    // title.innerHTML = "Products" 
}


// ------------BUILDING ALL CATEGORIES--------------
function buildCategories(category){
    const row = document.createElement('div')
    row.className = 'row'
    outerRow.append(row)
    row.style.marginBottom = '20px'

    const divCol6 = document.createElement('div')
    divCol6.className = 'col-6'
    const categoryName = document.createElement('input')
    categoryName.value = category.name
    divCol6.append(categoryName)
    outerRow.append(divCol6)

    const divCol31 = document.createElement('div')
    divCol31.className = 'col-2'
    const editBtn = document.createElement('button')
    editBtn.innerHTML = "Edit"
    divCol31.append(editBtn)
    outerRow.append(divCol31)
    // rightInnerDiv.append(editBtn)
    const divCol32 = document.createElement('div')
    divCol32.className = 'col-2'
    editBtn.className = "btn btn-dark"
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "Delete"
    // rightInnerDiv.append(deleteBtn)
    deleteBtn.className = "btn btn-danger"
    divCol32.append(deleteBtn)
    outerRow.append(divCol32)

    categoryName.readOnly = true

    editBtn.addEventListener('click', function () {
        if (this.innerHTML === "Edit") {
            categoryName.readOnly = false
            this.innerHTML = "Save"
        }
        else if (this.innerHTML === "Save") {
            var index = allCategories.findIndex(obj => obj.id == category.id);
            if (index > -1) {
                allCategories[index].name = categoryName.value
            }
            localStorage.setItem('allCategories', JSON.stringify(allCategories))
            while (outerRow.firstChild) {
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            title.innerHTML = "Categories"
            allCategories.forEach(category => buildCategories(category))
            this.innerHTML = "Edit"
            categoryName.readOnly = true     
        }
    })

    deleteBtn.addEventListener('click', function(){
        var index = allCategories.findIndex(obj => obj.id == category.id);
        allCategories.splice(index, 1)
        console.log(index);
        localStorage.setItem('allCategories', JSON.stringify(allCategories))
        while (outerRow.firstChild) {
            // console.log(infoColumn.firstChild);
            outerRow.firstChild.remove()
        }
        outerRow.append(title)
            title.innerHTML = "Categories"
            allCategories.forEach(cat => buildCategories(cat))
})
}
// ------------BUILDING ALL USERS--------------
    function buildUsers(user){
        const row = document.createElement('div')
        row.className = 'row'
        outerRow.append(row)
        row.style.marginBottom = '20px'
    
        const divCol6 = document.createElement('div')
        divCol6.className = 'col-6'
        const userName = document.createElement('input')
        userName.value = user.email
        divCol6.append(userName)
        outerRow.append(divCol6)
    
        // const divCol31 = document.createElement('div')
        // divCol31.className = 'col-2'
        // const editBtn = document.createElement('button')
        // editBtn.innerHTML = "Edit"
        // divCol31.append(editBtn)
        // outerRow.append(divCol31)

        // rightInnerDiv.append(editBtn)
        const divCol32 = document.createElement('div')
        divCol32.className = 'col-3'
        // editBtn.className = "btn btn-dark"
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "Delete"
        // rightInnerDiv.append(deleteBtn)
        deleteBtn.className = "btn btn-danger"
        divCol32.append(deleteBtn)
        outerRow.append(divCol32)
    
        userName.readOnly = true
}

// ------------BUILDING ALL ORDERS-------------

function buildOrders(order){
    const row = document.createElement('div')
        row.className = 'row'
        outerRow.append(row)
        row.style.margin = "20px"
        row.style.padding = "20px"
        row.style.border = "1px solid black"
        row.style.backgroundColor = "#faf9f8"

        const divCol4 = document.createElement('div')
        divCol4.className = 'col-4'
        const orderUser = document.createElement('input')
        orderUser.readOnly = true

        var a = savedUsers.filter(user =>{
            return user.userId === order.userId
        } 
        )
        orderUser.value = a[0].email;

        divCol4.append(orderUser)
        row.append(divCol4)

        const divCol61 = document.createElement('div')
        divCol61.className = 'col-4'
        const orderType = document.createElement('input')
        orderType.value = order.orderType
        divCol61.append(orderType)
        row.append(divCol61)
        orderType.readOnly = true

        const divCol62 = document.createElement('div')
        divCol62.className = 'col-4'
        const orderStatus = document.createElement('input')
        orderStatus.value = order.orderStatus
        divCol62.append(orderStatus)
        row.append(divCol62)
        // orderType.readOnly = true

// ----------- Dropdown--------------
// const divCol62 = document.createElement('div')
//     divCol62.className = 'col-4'
// const divDrop = document.createElement('div');
// divDrop.className = 'dropdown'
// const btnDrop = document.createElement('button');
// btnDrop.className = "btn btn-secondary dropdown-toggle"
// btnDrop.type = 'button'
// btnDrop.id = 'dropdownMenuButton1'
// btnDrop.drop = 'dropdown';
// btnDrop.setAttribute('data-toggle','dropdown')
// divCol62.append(divDrop)
// outerRow.append(divCol62)
// divDrop.append(btnDrop)

// btnDrop.innerHTML = order.orderStatus
// const ul = document.createElement('ul');
// ul.className = 'dropdown-menu'
// ul.setAttribute('aria-labelledby','dropdownMenuButton1')
// const li1 = document.createElement('li');
// const a1 = document.createElement('a');
// li1.append(a1)
// const li2 = document.createElement('li');
// const a2 = document.createElement('a');
// li2.append(a2)
// const li3 = document.createElement('li');
// const a3 = document.createElement('a');
// li3.append(a3)
// const li4 = document.createElement('li');
// const a4 = document.createElement('a');
// li4.append(a4)

// a1.className = 'dropdown-item'
// a2.className = 'dropdown-item'
// a1.innerHTML = "Pending"
// a2.innerHTML = 'Ready To be shipped'
// a3.className = 'dropdown-item'
// a4.className = 'dropdown-item'
// a3.innerHTML = "Shipped"
// a4.innerHTML = 'Completed'
// ul.append(li1)
// ul.append(li2)
// ul.append(li3)
// ul.append(li4)
// btnDrop.append(ul)
// var numberOfLinks = document.querySelectorAll(".dropdown-item").length;

// for(i=0;i<numberOfLinks;i++){
//     document.querySelectorAll(".dropdown-item")[i].addEventListener("click",function(){
//         btnDrop.innerHTML = this.innerHTML
//     })
// }
}
function loadType(type) {
    switch (type) {
        case "Products":
            while (outerRow.firstChild) {
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            outerRow.append(addNewProduct)
            addNewProduct.addEventListener('click', addBtnClick)
            title.innerHTML = "Products"
            allProducts.forEach(product => buildProducts(product)) 
            break;

        case "Categories":
            while (outerRow.firstChild) {
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            title.innerHTML = type
            allCategories.forEach(category => buildCategories(category))
            break;

        case "Orders":
            while (outerRow.firstChild) {
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            title.innerHTML = type
            orders.forEach(order => buildOrders(order))
            break;
        case "Users":
            while (outerRow.firstChild) {
                outerRow.firstChild.remove()
            }
            outerRow.append(title)
            title.innerHTML = type
            savedUsers.forEach(user => buildUsers(user))
            break;
        default:
            console.log("default");
            break;
    }
}

loadType("Products")

var productType = 'men'
$(".dropdown-item").each(function(index){
    $(this).click(function(){
        productType = this.innerHTML
    }) 
})

// addNewProduct.addEventListener('click', function()
function addBtnClick()
{
    console.log('click');
    $('.overlay').show()
    // createForm()
}

$('.close').click(function () {
    $('.overlay').hide();
  })

  $('#addNewBtn').click(function(){

    console.log(productType);
      const newProduct = {
          id : allProducts.length,
          name: $("#addNewName").val(),
          price: $("#addNewPrice").val(),
          pic : newProductFileImg,
          type : productType
      }
      console.log(newProduct);
      allProducts.push(newProduct)
      localStorage.setItem('allData', JSON.stringify(allProducts))
      while (outerRow.firstChild) {
        outerRow.firstChild.remove()
    }
    outerRow.append(title)
        title.innerHTML = "Products"
    allProducts.forEach(product => buildProducts(product))
    $('.overlay').hide();
  })


//   ----------Dropbox--------------
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newProductFileImg = reader.result
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
  