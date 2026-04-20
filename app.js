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

async function checkEmail(){

let email=document.getElementById("emailInput").value

if(!email){
alert("ادخل البريد الالكتروني")
return
}

const res=await fetch(API+"/users?email="+email)
const data=await res.json()

if(data.length===0){

localStorage.setItem("tempEmail",email)
location="register.html"

}else{

localStorage.setItem("user",JSON.stringify(data[0]))
location="dashboard.html"

}

}

async function createAccount(){

let name=document.getElementById("name").value
let phone=document.getElementById("phone").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

let roles=[...document.getElementById("role").selectedOptions].map(o=>o.value)

const res=await fetch(API+"/users",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
phone,
email,
password,
roles
})

})

const user=await res.json()

localStorage.setItem("user",JSON.stringify(user))

location="dashboard.html"

}

if(location.pathname.includes("register")){

const savedEmail=localStorage.getItem("tempEmail")

if(savedEmail){
document.getElementById("email").value=savedEmail
}

}

function loginGoogle(){
alert("تسجيل Google سيتم تفعيله لاحقاً")
}

function loginApple(){
alert("تسجيل Apple سيتم تفعيله لاحقاً")
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
