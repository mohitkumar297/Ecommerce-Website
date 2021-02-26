import data from "./data.js";
import categories from "./categories.js";

const addNewProduct = document.getElementById('addNewProduct')
var newProductFileImg = ""
var allProducts = data
var allData = JSON.parse(localStorage.getItem('allData'))
if (allData != null) {
    allProducts = allData
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

function buildProducts(product) {
    // infoColumn.append(title)
    //         title.innerHTML = "Products"
    const row = document.createElement('div')
    row.className = 'row'
    infoColumn.append(row)

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
    row.append(leftInnerDiv)
    row.append(rightInnerDiv)
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
            while (infoColumn.firstChild) {
                console.log(infoColumn.firstChild);
                infoColumn.firstChild.remove()
            }
            infoColumn.append(title)
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
        while (infoColumn.firstChild) {
            console.log(infoColumn.firstChild);
            infoColumn.firstChild.remove()
        }
        infoColumn.append(title)
            title.innerHTML = "Products"
        allProducts.forEach(product => buildProducts(product))
    })
    // infoColumn.append(title)
    // title.innerHTML = "Products" 
}

function loadType(type) {
    switch (type) {
        case "Products":
            title.innerHTML = "Products"
            allProducts.forEach(product => buildProducts(product)) 
            break;
        case "Categories":
            
            while (infoColumn.firstChild) {
                infoColumn.firstChild.remove()
            }
            infoColumn.append(title)
            title.innerHTML = type
            break;
        case "Orders":
            title.innerHTML = type
            break;
        case "Users":
            title.innerHTML = type
            break;
        default:
            console.log("default");
            break;
    }
}

loadType("Products")


function createForm(){
    // Create a form synamically 
    var form = document.createElement("form"); 
    form.setAttribute("method", "post"); 
    form.setAttribute("action", "submit.php"); 
    // form.style.position = 'absolute'
    // form
    // Create an input element for Full Name 
    var FN = document.createElement("input"); 
    FN.setAttribute("type", "text"); 
    FN.setAttribute("name", "FullName"); 
    FN.setAttribute("placeholder", "Full Name"); 
  
    
                // create a submit button 
                var s = document.createElement("input"); 
                s.setAttribute("type", "submit"); 
                s.setAttribute("value", "Submit"); 
                  
                // Append the full name input to the form 
                form.appendChild(FN);  
                  
                // Append the submit button to the form 
                form.appendChild(s);  
  
                document.getElementsByTagName("body")[0] 
               .appendChild(form); 
            } 
var productType = 'men'
$(".dropdown-item").each(function(index){
    $(this).click(function(){
        productType = this.innerHTML
    }) 
})

addNewProduct.addEventListener('click', function(){
    
    $('.overlay').show()
    // createForm()
})
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
      while (infoColumn.firstChild) {
        infoColumn.firstChild.remove()
    }
    infoColumn.append(title)
        title.innerHTML = "Products"
    allProducts.forEach(product => buildProducts(product))
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
  