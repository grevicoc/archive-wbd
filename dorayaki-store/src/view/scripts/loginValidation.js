const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const submitButton = document.querySelector(".submit-button");

let usernameValid = false;
let passwordValid = false;

inputUsername.addEventListener('blur', (e)=>{
  const val = e.target.value;
  const input = val.split(' ').join('');

  if (input.split(' ').join('').length === 0) {
      inputUsername.style.border = "1px solid red";
      submitButton.setAttribute("disabled","true");
  } else {
      inputUsername.style.border = "1px solid black";
      usernameValid = true;

      if (usernameValid && passwordValid) {
        submitButton.removeAttribute("disabled");
      }
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
      passwordValid = true;

      if (usernameValid && passwordValid) {
        submitButton.removeAttribute("disabled");
      }
  }
});
