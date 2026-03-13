let body = document.getElementById("body")
let button = document.getElementById("themeBtn")

// check saved theme

let savedTheme = localStorage.getItem("theme")

if(savedTheme === "dark"){
body.classList.add("dark")
button.innerHTML = "☀️"
}

// toggle theme

function toggleMode(){

body.classList.toggle("dark")

if(body.classList.contains("dark")){
localStorage.setItem("theme","dark")
button.innerHTML="☀️"
}else{
localStorage.setItem("theme","light")
button.innerHTML="🌙"
}

}