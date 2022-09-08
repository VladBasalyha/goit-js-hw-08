import throttle from 'lodash.throttle';
// variable for locale storage name
const STORAGE_NAME = 'feedback-form-state';
// objct for data from elements of form
let formData = {};

// references for inputs and forms
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
  submitBtn: document.querySelector('button'),
};

const { form, email, textarea, submitBtn } = refs;

// events listeners
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(inputText, 500));

// to get values of our forms and add it to local storage
function inputText(evt) {
  const emailInput = form.elements.email.value;
  const messageInput = textarea.value;

  formData = { email: emailInput, message: messageInput };

  localStorage.setItem(STORAGE_NAME, JSON.stringify(formData));
}

// to save elements of our email and message if page was reloaded
function populateTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_NAME);

  if (savedMessage) {
    const parsedMessage = JSON.parse(savedMessage);
    email.value = parsedMessage.email;
    textarea.value = parsedMessage.message;
  }
}
populateTextArea();

// instructions if form was submitted
function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_NAME)));
  localStorage.removeItem(STORAGE_NAME);
}
