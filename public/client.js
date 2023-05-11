const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const password2 = document.getElementById("password2");
let isValid = false;

const button = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (isValid) {
    window.location.href = "http://127.0.0.1:5500/public/login.html";
  } else {
    e.preventDefault();
  }
});




function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  isValid = true;

  if (usernameValue === "") {

    setErrorFor(username, `Username cannot be empty`);
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, `Email cannot be empty`);
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, `Email is not valid!`);
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, `Password cannot be empty`);
  } else {
    setSuccessFor(password);
  }

  if (password2Value === "") {
    setErrorFor(password2, `Password2 cannot be empty`);
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, `Passwords does not match`);
  } else {
    setSuccessFor(password2);
  }
}

function setErrorFor(input, message) {
  isValid = false;
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}






button.addEventListener("submit", registerUser)

async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const result = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({username, password})
  }).then((res) => res.json())


  if (result.status === "ok") {
    console.log("GOT IT", result.data)
  } else {
    console.log("DIDNT GOT IT")
  }

}





