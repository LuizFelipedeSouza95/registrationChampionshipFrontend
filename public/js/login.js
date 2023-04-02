async function signIn() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  //const validate = { email /* password */ };
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validationEmail = regexEmail.test(email);

  const errors = {
    email: false,
    password: false,
  };

  function hasErrors() {
    return Object.values(errors).some((error) => error === true);
  }

  function setError(field, message) {
    if (!errors[field]) {
      //${field.charAt(0).toUpperCase() + field.slice(1)}
      const errorDiv = document.getElementById("returnErrorsLogin");
      const pError = document.createElement("p");
      pError.innerHTML = message;
      pError.className = "error";
      errorDiv.appendChild(pError);
      errors[field] = true;
    }
  }

  const errorDivs = document.querySelectorAll(".returnErrorsLogin");
  errorDivs.forEach((div) => {
    div.innerHTML = "";
  });

  if (email.trim() === "") {
    setError("email", "Enter a email");
  } else if (password.trim() === "") {
    setError("password", "Enter a password");
  } else if (!validationEmail) {
    setError("email", "Enter a valid email");
  } else if (hasErrors()) {
    return;
  } else {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:3003/authenticate?email=${email}&password=${password}`,
      requestOptions
    );
    const result = await response.json();

    if (result.email === false) {
      setError("email", "Incorrect email");
    } else if (result.password === false) {
      setError("password", "Incorrect password");
    } else {
      try {
        window.location.href = `/classificacao`;
        /* setTimeout(function () {
          window.location.href = `/classificacao`;
        }, 1000); */
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
}

const btnSignIn = document.querySelector("#btn_signIn");
const form = document.querySelector("#formLogin");

btnSignIn.addEventListener("click", signIn);

form.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    signIn();
  }
});
