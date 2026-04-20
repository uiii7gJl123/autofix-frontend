const API="https://autofix-backend-y8u9.onrender.com"

const text="مرحبا بك, ماهي مشكلة سيارتك اليوم"
let i=0

function typeWriter(){
if(i<text.length){
document.getElementById("typing").innerHTML+=text.charAt(i)
i++
setTimeout(typeWriter,80)
}
}

if(document.getElementById("typing")){
typeWriter()
}

function toggleTheme(){
document.body.classList.toggle("dark")
}

function toggleLang(){
alert("سيتم دعم لغات لاحقاً")
}

function loginEmail(){

let email=prompt("ادخل الايميل")

fetch(API+"/users?email="+email)
.then(r=>r.json())
.then(data=>{

if(data.length===0){

localStorage.setItem("email",email)
location="register.html"

}else{

localStorage.setItem("user",JSON.stringify(data[0]))
location="dashboard.html"

}

})

}

function createAccount(){

let name=document.getElementById("name").value
let phone=document.getElementById("phone").value

let roles=[...document.getElementById("role").selectedOptions].map(o=>o.value)

fetch(API+"/users",{

method:"POST",
headers:{'Content-Type':'application/json'},

body:JSON.stringify({

name,
phone,
roles

})

})
.then(r=>r.json())
.then(user=>{

localStorage.setItem("user",JSON.stringify(user))

location="dashboard.html"

})

}

if(location.pathname.includes("dashboard")){

let user=JSON.parse(localStorage.getItem("user"))

let div=document.getElementById("roles")

user.roles.forEach(r=>{

let btn=document.createElement("button")

btn.innerText=r

btn.onclick=()=>{

alert("فتح واجهة "+r)

}

div.appendChild(btn)

})

}