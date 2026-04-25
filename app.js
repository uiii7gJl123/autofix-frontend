const API = "https://autofix-backend-y8u9.onrender.com"

/* -------------------------------
رسالة الترحيب
--------------------------------*/

const text = "مرحبا بك, ماهي مشكلة سيارتك اليوم"
let i = 0

function typeWriter(){
  const el = document.getElementById("typing")

  if(!el) return

  if(i < text.length){
    el.innerHTML += text.charAt(i)
    i++
    setTimeout(typeWriter,80)
  }
}

if(document.getElementById("typing")){
  typeWriter()
}


/* -------------------------------
الوضع الداكن
--------------------------------*/

function toggleTheme(){
  document.body.classList.toggle("dark")
}


/* -------------------------------
اللغة
--------------------------------*/

function toggleLang(){
  alert("سيتم دعم لغات لاحقاً")
}


/* -------------------------------
الانتقال إلى صفحة تسجيل الدخول
--------------------------------*/

function goToLogin(){
  window.location.href = "login.html"
}


/* -------------------------------
إنشاء حساب
--------------------------------*/

async function createAccount(){

  let name = document.getElementById("name").value
  let phone = document.getElementById("phone").value
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  let roles = [...document.getElementById("role").selectedOptions].map(o=>o.value)

  const res = await fetch(API + "/users",{

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

  const user = await res.json()

  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("tempIdentifier", email)

  location = "dashboard.html"
}


/* -------------------------------
تسجيل الدخول عبر API
--------------------------------*/

async function loginUser(){

  let identifier = document.getElementById("identifierInput").value.trim()
  let password = document.getElementById("passwordInput").value

  let error = document.getElementById("errorMsg")

  error.style.display = "none"

  if(!identifier || !password){

    error.innerText = "ادخل البيانات كاملة"
    error.style.display = "block"
    return

  }

  try{

    const res = await fetch(API + "/auth/login",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        identifier,
        password
      })

    })

    const data = await res.json()

    if(!res.ok){

      error.innerText = data.error || "بيانات الدخول غير صحيحة"
      error.style.display = "block"
      return

    }

    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("tempIdentifier", identifier)

    location = "dashboard.html"

  }catch(err){

    console.error(err)

    error.innerText = "خطأ في الاتصال بالخادم"
    error.style.display = "block"

  }

}


/* -------------------------------
تعبئة register
--------------------------------*/

if(location.pathname.includes("register")){

  setTimeout(()=>{

    const saved = localStorage.getItem("tempIdentifier")

    if(saved && document.getElementById("email")){
      document.getElementById("email").value = saved
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

  let user = JSON.parse(localStorage.getItem("user"))

  let div = document.getElementById("roles")

  if(user && user.roles){

    user.roles.forEach(r=>{

      let btn = document.createElement("button")

      btn.innerText = r

      btn.onclick = ()=>{
        alert("فتح واجهة " + r)
      }

      div.appendChild(btn)

    })

  }

}
