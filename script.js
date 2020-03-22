const form = document.getElementById ('form');
const username = document.getElementById ('username');
const email = document.getElementById ('email');
const password = document.getElementById ('password');
const password2 = document.getElementById ('password2');

const showError = (field, msg) => {
  const formControl = field.parentElement;
  formControl.className = 'form-control error';
  formControl.querySelector ('small').innerText = msg;
};

const showSuccess = field => {
  const formControl = field.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test (input.value.trim ())) {
    showSuccess (input);
  } else {
    showError (input, 'Email is not valid');
  }
};

const getFieldName = input => {
  return input.id.charAt (0).toUpperCase () + input.id.slice (1);
};

const checkRequired = inputArr => {
  inputArr.forEach (input => {
    if (input.value.trim () === '') {
      showError (input, `${getFieldName (input)} is required`);
    } else {
      showSuccess (input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min || input.value.length > max) {
    showError (
      input,
      `${getFieldName (input)} must be between ${min} and ${max}`
    );
  } else {
    showSuccess (input);
  }
};

const checkPassMatch = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError (pass2, 'Passwords do not match!');
  }
};

form.addEventListener ('submit', function (e) {
  e.preventDefault ();
  checkRequired ([username, email, password, password2]);
  checkLength (username, 3, 15);
  checkLength (password, 6, 25);
  checkEmail (email);
  checkPassMatch (password, password2);
});
