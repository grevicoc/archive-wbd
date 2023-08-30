import { getAPI } from "./api.js";

const inputEmail = document.getElementById("email");
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const submitButton = document.querySelector(".register-button");

let emailIsValid = false;
let usernameIsValid = false;
let passwordIsValid = false;

function formIsValid () {
    if (emailIsValid && usernameIsValid && passwordIsValid) {
        submitButton.removeAttribute("disabled");
    }
}

function checkIsUnameValid(data, value){
    let usernames = [];
    for (let uname of data){
        usernames.push(uname.username);
    }

    if (value !== undefined && usernames.includes(value)){
        inputUsername.style.border = "1px solid red";
        submitButton.setAttribute("disabled","true");
    } else if (value.split(' ').join('').length === 0) {
        inputUsername.style.border = "1px solid red";
        submitButton.setAttribute("disabled","true");
    }
    else {
        inputUsername.style.border = "1px solid black";
        usernameIsValid = true;
    }
}

inputUsername.addEventListener('blur', (e)=> {
    getAPI('/validation').then(
        data => { 
            const response = JSON.parse(data);
            checkIsUnameValid(response.data, e.target.value); 
        }
    )
})

inputEmail.addEventListener('blur', (e)=>{
    const val = e.target.value;
    const input = val.split(' ').join('');
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const reTest = re.test(String(input).toLowerCase());

    if (input.split(' ').join('').length === 0) {
        inputEmail.style.border = "1px solid red";
        submitButton.setAttribute("disabled","true");
    } else if (!reTest) {
        inputEmail.style.border = "1px solid red";
        submitButton.setAttribute("disabled","true");
    } else {
        inputEmail.style.border = "1px solid black";
        emailIsValid = true;
    }
});

inputPassword.addEventListener('blur', (e)=>{
    const val = e.target.value;
    const input = val.split(' ').join('');

    if (input.split(' ').join('').length === 0) {
        inputPassword.style.border = "1px solid red";
        submitButton.setAttribute("disabled","true");
    } else {
        inputPassword.style.border = "1px solid black";
        passwordIsValid = true;

        formIsValid();
    }
});