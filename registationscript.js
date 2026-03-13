const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")

const strengthBar = document.getElementById("strengthBar")
const toggle = document.getElementById("toggle")

const form = document.getElementById("form")

// NAME VALIDATION
nameInput.addEventListener("input", () => {
if(nameInput.value.length < 3){
document.getElementById("nameError").innerText = "Name must be 3+ characters"
}else{
document.getElementById("nameError").innerText = ""
}
})

// EMAIL VALIDATION
emailInput.addEventListener("input", () => {
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

if(!emailPattern.test(emailInput.value)){
document.getElementById("emailError").innerText = "Invalid email"
}else{
document.getElementById("emailError").innerText = ""
}
})

// PHONE VALIDATION
phoneInput.addEventListener("input", () => {

if(phoneInput.value.length !== 10){
document.getElementById("phoneError").innerText = "Phone must be 10 digits"
}else{
document.getElementById("phoneError").innerText = ""
}

})

// PASSWORD STRENGTH
passwordInput.addEventListener("input", () => {

let strength = 0
let pass = passwordInput.value

if(pass.length >= 6) strength++
if(/[A-Z]/.test(pass)) strength++
if(/[0-9]/.test(pass)) strength++
if(/[!@#$%^&*]/.test(pass)) strength++

if(strength === 1){
strengthBar.style.width = "25%"
strengthBar.style.background = "red"
}

else if(strength === 2){
strengthBar.style.width = "50%"
strengthBar.style.background = "orange"
}

else if(strength === 3){
strengthBar.style.width = "75%"
strengthBar.style.background = "yellow"
}

else if(strength === 4){
strengthBar.style.width = "100%"
strengthBar.style.background = "green"
}

})

// SHOW / HIDE PASSWORD
toggle.addEventListener("click", () => {

if(passwordInput.type === "password"){
passwordInput.type = "text"
toggle.innerText = "Hide"
}
else{
passwordInput.type = "password"
toggle.innerText = "Show"
}

})

// FORM SUBMIT
form.addEventListener("submit", (e) => {

e.preventDefault()

const data = {
name: nameInput.value,
email: emailInput.value,
phone: phoneInput.value,
password: passwordInput.value
}

let submissions = JSON.parse(localStorage.getItem("submissions")) || []

submissions.push(data)

localStorage.setItem("submissions", JSON.stringify(submissions))

alert("Registration Saved!")

form.reset()
strengthBar.style.width = "0%"

})