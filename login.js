import users from "./user.js";

var savedUsers = users

var allUsers = JSON.parse(localStorage.getItem('savedUsers'))
if (allUsers != null) {
    savedUsers = allUsers
}
console.log(savedUsers);
const loginBtn = document.querySelector('.auth .login');
const signupBtn = document.querySelector('.auth .signup');

// Login
const Lemail = document.getElementById('Lemail')
const Lpassword = document.getElementById('Lpassword')

// Signup
const Semail = document.getElementById('Semail')
const Spassword = document.getElementById('Spassword')
const SCpassword = document.getElementById('SCpassword')

const loginSection = document.querySelector('#login');
const signupSection = document.querySelector('#signup');

const Lbtn = document.getElementById("loginInBtn");
const Sbtn = document.getElementById("signUpBtn")

signupBtn.addEventListener('click', function() {
    signupBtn.style.backgroundColor = "#212529";
    signupBtn.style.color = 'white';
    loginBtn.style.backgroundColor = "white";
    loginBtn.style.color = '#212529';
  loginSection.classList.remove('show');
  signupSection.classList.add('show');
  loginBtn.classList.remove('selected');
  signupBtn.classList.add('selected');
});

loginBtn.addEventListener('click', function() {
    loginBtn.style.backgroundColor = "#212529";
    loginBtn.style.color = 'white';
    signupBtn.style.backgroundColor = "white";
    signupBtn.style.color = '#212529';
  signupSection.classList.remove('show');
  loginSection.classList.add('show');
  signupBtn.classList.remove('selected');
  loginBtn.classList.add('selected');
});

    Lbtn.addEventListener('click', function() {
        var flag = false
        savedUsers.filter(element => {
            if (Lemail.value === element.email && Lpassword.value === element.password){
                flag = true
                localStorage.setItem('currentUser',element.email)
            }            
        });
        if (flag){
            window.location.replace("http://127.0.0.1:5500/index.html")
        }


    //     var em = localStorage.getItem('email')
    //     var pa = localStorage.getItem('password')
    //    if (em === Lemail.value && pa === Lpassword.value){
    //     window.location.replace("http://127.0.0.1:5500/index.html")
    //        console.log('logged');
    //    }
    //    else{
    //      console.log("dc");
    //        alert("Invalid user")
    //    }
      });

Sbtn.addEventListener('click', function() {
    let newUser = {email:Semail.value,
    password:Spassword.value,
    userId:savedUsers.length+1}
        savedUsers.push(newUser)
        console.log(savedUsers);
   localStorage.setItem('savedUsers',JSON.stringify(savedUsers))
  });
  
     