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


/* -------------------------------
التحقق من الايميل
--------------------------------*/

async function checkEmail(){

let email=document.getElementById("emailInput").value.trim()

if(!email){
alert("ادخل البريد الالكتروني")
return
}

const res=await fetch(API+"/users?email="+email)
const data=await res.json()

if(data.length===0){

// مستخدم جديد
localStorage.setItem("tempEmail",email)
localStorage.removeItem("user")
location="register.html"

}else{

// مستخدم موجود
localStorage.setItem("tempEmail",email)
localStorage.removeItem("user")
location="login.html"

}

}


/* -------------------------------
إنشاء حساب
--------------------------------*/

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
localStorage.setItem("tempEmail",email)

location="dashboard.html"

}


/* -------------------------------
تسجيل الدخول (كلمة المرور)
--------------------------------*/

async function loginUser(){

let email=document.getElementById("emailInput").value.trim()
let password=document.getElementById("passwordInput").value

if(!email || !password){
alert("ادخل الايميل وكلمة المرور")
return
}

const res=await fetch(API+"/users?email="+email)
const data=await res.json()

if(data.length===0){
alert("المستخدم غير موجود")
return
}

let user=data[0]

if(user.password===password){

localStorage.setItem("user",JSON.stringify(user))
localStorage.setItem("tempEmail",email)

location="dashboard.html"

}else{

document.getElementById("errorMsg").style.display="block"

}

}


/* -------------------------------
تعبئة الايميل في register
--------------------------------*/

if(location.pathname.includes("register")){

setTimeout(()=>{

const savedEmail=localStorage.getItem("tempEmail")

if(savedEmail && document.getElementById("email")){
document.getElementById("email").value=savedEmail
}

},100)

}


/* -------------------------------
Google / Apple (لاحقاً)
--------------------------------*/

function loginGoogle(){
alert("تسجيل Google سيتم تفعيله لاحقاً")
}

function loginApple(){
alert("تسجيل Apple سيتم تفعيله لاحقاً")
}


/* -------------------------------
Dashboard
--------------------------------*/

if(location.pathname.includes("dashboard")){

let user=JSON.parse(localStorage.getItem("user"))

let div=document.getElementById("roles")

if(user && user.roles){

user.roles.forEach(r=>{

let btn=document.createElement("button")

btn.innerText=r

btn.onclick=()=>{

alert("فتح واجهة "+r)

}

div.appendChild(btn)

})

}

}
