const form = document.getElementById("form");
const email = document.getElementById("email");
const email2 = document.getElementById("email2");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const nickName = document.getElementById("nickname");

// Show Error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.className = "error";
  small.textContent = message;
}
function success(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.className = "";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    success(input);
  } else {
    showError(input, "유효한 이메일 주소를 입력하십시오.");
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${min}~${max}글자 사이로 입력해야 합니다. 다시 시도하십시오.`
    );
  } else {
    success(input);
  }
}

function checkMatch(input1, input2) {
  if (input1.value !== input2.value) {
    const fieldName = input2.placeholder;
    let message;
    if (fieldName === "이메일 재입력") {
      message = "이메일이 일치하지 않습니다.";
    } else {
      message = "비밀번호가 일치하지 않습니다.";
    }
    showError(input2, message);
  } else {
    success(input2);
  }
}

// Add EventListner
email.addEventListener("focusout", function (e) {
  checkEmail(e.target);
});

email2.addEventListener("focusout", function (e) {
  checkMatch(email, e.target);
});

password.addEventListener("focusout", function (e) {
  checkLength(e.target, 8, 25);
});

password2.addEventListener("focusout", function (e) {
  checkMatch(password, e.target);
});

nickName.addEventListener("focusout", function (e) {
  checkLength(e.target, 6, 16);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputArr = [email, email2, password, password2, nickName];
  for (let i = 0; i < inputArr.length; i++) {
    console.log(inputArr[i]);
    if (inputArr[i].value.trim() === "") {
      showError(inputArr[i], `${inputArr[i].placeholder} 필드를 입력해주세요.`);
    } else {
      success(inputArr[i]);
    }
  }
});
