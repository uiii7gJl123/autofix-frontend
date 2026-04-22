
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
التحقق (مبدئي)
--------------------------------*/

async function checkEmail(){

let identifier=document.getElementById("emailInput").value.trim()

if(!identifier){
alert("ادخل البيانات")
return
}

const res=await fetch(API+"/users")
const data=await res.json()

let user=data.find(u =>
u.email === identifier ||
u.phone === identifier ||
u.username === identifier
)

localStorage.setItem("tempIdentifier",identifier)

if(!user){

localStorage.removeItem("user")
location="register.html"

}else{

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
localStorage.setItem("tempIdentifier",email)

location="dashboard.html"

}

/* -------------------------------
تسجيل الدخول (موحد)
--------------------------------*/

async function loginUser(){

let identifier=document.getElementById("identifierInput").value.trim()
let password=document.getElementById("passwordInput").value

if(!identifier || !password){
document.getElementById("errorMsg").innerText="ادخل البيانات كاملة"
document.getElementById("errorMsg").style.display="block"
return
}

const res=await fetch(API+"/users")
const data=await res.json()

let user=data.find(u =>
u.email === identifier ||
u.phone === identifier ||
u.username === identifier
)

if(!user){
document.getElementById("errorMsg").innerText="المستخدم غير موجود"
document.getElementById("errorMsg").style.display="block"
return
}

if(user.password === password){

localStorage.setItem("user",JSON.stringify(user))
localStorage.setItem("tempIdentifier",identifier)

location="dashboard.html"

}else{

document.getElementById("errorMsg").innerText="كلمة المرور غير صحيحة"
document.getElementById("errorMsg").style.display="block"

}

}

/* -------------------------------
تعبئة register
--------------------------------*/

if(location.pathname.includes("register")){

setTimeout(()=>{

const saved=localStorage.getItem("tempIdentifier")

if(saved && document.getElementById("email")){
document.getElementById("email").value=saved
}

},100)

}

/* -------------------------------
Google / Apple
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
