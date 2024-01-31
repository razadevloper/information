document.addEventListener("DOMContentLoaded", function () {
  let closedEye = document.querySelector("#closedeye");
  let passwordInput = document.querySelector("#password");
  let closedEye2 = document.querySelector("#closedEye2");
  let passwordInput2 = document.querySelector("#password2");
  let signupForm = document.querySelector("#signup");
  let logInForm = document.querySelector("#logIn");
  let email = document.querySelector("#email");
  let alertMessage = document.querySelector("#message");
  let loginMessage = document.querySelector("#loginMessage");
  let name = document.querySelector("#name");
  let signupEmail = document.querySelector("#signupEmail");
  let passwordMsg = document.querySelector("passwordMsg");

  // Password Visiblity Function 
  function togglePasswordVisibility(inputField, eyeIcon) {
    if (inputField.type === "password") {
      inputField.type = "text";
      eyeIcon.classList.remove("bi-eye-slash");
      eyeIcon.classList.add("bi-eye");
    } else {
      inputField.type = "password";
      eyeIcon.classList.remove("bi-eye");
      eyeIcon.classList.add("bi-eye-slash");
    }
  };

  // Signup Form validation start here
  function handleSignUpForm(event) {
    event.preventDefault();

    const signupName = name.value.trim();
    const emailValue2 = signupEmail.value.trim();
    const signupPassword = passwordInput.value.trim();

    signupResetFormStyle();

    if (!validateSignupName(signupName)) {
      return false;
    }

    if(!valiadteSignupEmail(emailValue2)){
      return false;
    }

    if(!validateSignupPassword(signupPassword)){
      return false;
    }

    alertMessage.innerHTML = "";

    return true;
  }

  function signupResetFormStyle() {
    name.style.border = "";
    signupEmail.style.border = "";
    passwordInput.style.border = "";
    name.classList.remove("shake");
    signupEmail.classList.remove("shake");
    passwordInput.classList.remove("shake");
  }

  function validateSignupName(signupName) {
    if (signupName.length === 0) {
      signupShowError(name, "* Name cannot be blank");
      return false;
    } else if (signupName.length < 3) {
      signupShowError(name, "* Name is too short");
      return false;
    } else if (signupName.length > 30) {
      signupShowError(name, "* Name is too long");
      return false;
    }
    return true;
  }

  function valiadteSignupEmail(emailValue2){
    if(emailValue2.length === 0){
      signupShowError(signupEmail, "* Email con not be blank");
      return false;
    }else if(!emailValue2.includes("@gmail.com")){
      signupShowError(signupEmail, "* Invalid Email id! please Eneter Valid Email");
      return false;
    }else if(signupEmail.length > 30){
      signupShowError(signupEmail, "* Email is too long");
      return false;
    }
    return true;
  }

  function validateSignupPassword(signupPassword) {
    if (signupPassword.length === 0) {
      signupShowError(passwordInput, "* Password cannot be blank");
      return false;
    } else if (!isSignupPasswordValid(signupPassword)) {
      signupShowError(passwordInput, "* Enter a Strong Password like Demo@123");
      return false;
    }
    return true;
  }
  
  function isSignupPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }
  
  function signupShowError(element, message) {
    element.style.border = "1px solid red";
    alertMessage.innerHTML = message;
    element.classList.add("shake");
    setTimeout(() => {
      element.classList.remove("shake");
    }, 500);
  }


  // Login form start here
  function handleLogInForm(event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = passwordInput2.value.trim();

    resetFormStyles();

    if (!validateEmail(emailValue)) {
      return false;
    }

    if (!validatePassword(passwordValue)) {
      return false;
    }

    alertMessage.innerHTML = "";

    if (isLoginCredentialsValid(emailValue, passwordValue)) {
      console.log("Login details matched");
      alert("Login Successfully! Now we are redirecting to another page");
      window.location.href = './index.html';
    } else {
      console.log("Credentials not matched");
      alert("Credentials not matched");
    }

    return true;
  }

  function resetFormStyles() {
    email.style.border = "";
    passwordInput2.style.border = "";
    loginMessage.innerHTML = "";
    email.classList.remove("shake");
    passwordInput2.classList.remove("shake");
  }

  function validateEmail(emailValue) {
    if (emailValue.length === 0) {
      showError(email, "* Email cannot be blank");
      return false;
    } else if (!emailValue.includes("@gmail.com")) {
      showError(email, "* Invalid email format (must be @gmail.com)");
      return false;
    } else if (emailValue.length > 30) {
      showError(email, "* Email is too long");
      return false;
    }
    return true;
  }

  function validatePassword(passwordValue) {
    if (passwordValue.length === 0) {
      showError(passwordInput2, "* Password cannot be blank");
      return false;
    } else if (!isPasswordValid(passwordValue)) {
      showError(passwordInput2, "* Invalid Password! Please Enter Valid Password");
      return false;
    }
    return true;
  }

  function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }
  

  function isLoginCredentialsValid(emailValue, passwordValue) {
    return emailValue === "sohailraja6654@gmail.com" && passwordValue === "Password@123";
  }

  function showError(element, message) {
    element.style.border = "1px solid red";
    loginMessage.innerHTML = message;
    element.classList.add("shake");
    setTimeout(() => {
      element.classList.remove("shake");
    }, 500);
  }

  closedEye.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, closedEye);
  });

  closedEye2.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput2, closedEye2);
  });

  signupForm.addEventListener("click", handleSignUpForm);

  logInForm.addEventListener("click", handleLogInForm);
});
