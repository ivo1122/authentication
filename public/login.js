const button = document.getElementById("form");

button.addEventListener("submit", login);

async function login(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const result = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
  

  if (result.status === "ok") {
    console.log("Got the token!", result.data);
    localStorage.setItem("token", result.data);

    alert("success");
    window.location.href = "http://127.0.0.1:5500/public/password.html";
  } else {
    console.log("DID NOT GET THE TOKEN");
    alert("Invalid username/password!");
  }
}
