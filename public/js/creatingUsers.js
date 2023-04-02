async function signUp() {
  const name = document.getElementById("creatingUsername").value;
  const email = document.getElementById("creatingEmail").value;
  const password = document.getElementById("creatingPassword").value;
  const repeatPassword = document.getElementById(
    "creatingRepeatPassword"
  ).value;
  const option = document.getElementById("form-select");
  const selectedIdValue = option.value;
  const selectedTextValue = option.options[option.selectedIndex];
  const selectedTextTeam = selectedTextValue.text;

  const validate = { email, password };
  let regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z{}[\],$^?~=+\-_*\-+.|@]{6,}$/;
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validationEmail = regexEmail.test(validate.email);
  const validationPassword = regexPassword.test(validate.password);

  const errors = {
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
  };

  function hasErrors() {
    return Object.values(errors).some((error) => error === true);
  }

  function setError(field, message) {
    if (!errors[field]) {
      const errorDiv = document.getElementById(`returnErrorsScreenCreateUsers`);
      const pError = document.createElement("p");
      pError.innerHTML = message;
      pError.className = "error";
      errorDiv.appendChild(pError);
      errors[field] = true;
    }
  }

  const errorDivs = document.querySelectorAll(".returnErrorsScreenCreateUsers");
  errorDivs.forEach((div) => {
    div.innerHTML = "";
  });

  if (name.trim() === "") {
    setError("name", "Enter a name");
  }

  if (email.trim() === "") {
    if (hasErrors()) {
      return;
    }
    setError("email", "Enter a email");
  } else if (!validationEmail) {
    if (hasErrors()) {
      return;
    }
    setError("email", "Enter a valid email");
  }

  if (password.trim() === "") {
    if (hasErrors()) {
      return;
    }
    setError("password", "Enter a password");
  } else if (!validationPassword) {
    if (hasErrors()) {
      return;
    }
    setError("password", "Enter a valid password");
  } else if (repeatPassword.trim() === "") {
    if (hasErrors()) {
      return;
    }
    setError("repeatPassword", "please repeat the password");
  } else if (repeatPassword.trim() != password.trim()) {
    if (hasErrors()) {
      return;
    }
    setError("password", "password does not match");
  }

  if (hasErrors()) {
    return;
  } else {
    try {
      const teamId = parseInt(selectedIdValue);

      const response = await fetch(`http://localhost:3000/createUser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          team: teamId,
          admin: false
        }),
      });
      const results = await response.json();
0
      if (results.message === "Email Already exists!") {
        setError("email", "Email Already exists!");
      } else if (results.message === "Username already exists!") {
        setError("name", "Username already exists!");
      } else {
        if (name && email && password && repeatPassword) {
          name.value = "";
          email.value = "";
          password.value = "";
          repeatPassword.value = "";
        }

        setTimeout(function () {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const btnSignUp = document.querySelector("#btn_signUp");
const form = document.querySelector("#formCreate");

btnSignUp.addEventListener("click", signUp);

form.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    signUp();
  }
});
