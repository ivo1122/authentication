const button = document.getElementById("form");

button.addEventListener("submit", changePassword);

async function changePassword(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;

  const result = await fetch("http://localhost:3000/api/change-password", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      newpassword: password,
      token: localStorage.getItem("token"),
    }),
  }).then((res) => res.json());


  if (result.status === "ok") {
    console.log("Success")
    alert("success");
    window.location.href = "http://127.0.0.1:5500/public/login.html";

   } else {
    console.log("DID NOT GET THE TOKEN");
    alert(result.error); 
  }
}
