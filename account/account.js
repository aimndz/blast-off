const signUpBtn = document.getElementById("sign-up-btn");
const loginBtn = document.getElementById("login-btn");

const inputs = document.getElementsByTagName("input");

let allFilled = true;

signUpBtn.addEventListener("click", signUp);

inputs.forEach((input) => {
  if (input.value === "") {
    allFilled = false;
  }
});

function signUp() {
  const userFirstName = document.getElementById("first-name").value;
  const userLastName = document.getElementById("last-name").value;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  const userConfirmPassword = document.getElementById("confirm-password").value;

  let userData = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    password: userPassword,
    confirmPassword: userConfirmPassword,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  console.log("Sign-up successful!");
}
