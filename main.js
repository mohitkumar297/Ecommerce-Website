
// const menProductType = document.getElementById('menAllProductType')
// menProductType.addEventListener('click', function(){
//     localStorage.setItem('typeOfProduct',"Men's Products")
// })

// const womenProductType = document.getElementById('womenAllProductType')
// womenProductType.addEventListener('click', function(){
//     localStorage.setItem('typeOfProduct',"Women's Products")
// })
// const searchBar = document.getElementById('searchBar')
// searchBar.addEventListener('click', function(){
//     console.log(this.innerHTML);
// })


var numberOfProductLinks = document.querySelectorAll(".goToProduct").length;

for(i=0;i<numberOfProductLinks;i++){
    document.querySelectorAll(".goToProduct")[i].addEventListener("click",function(){
        localStorage.setItem('typeOfProduct',this.type)
    })
}

