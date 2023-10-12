import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextAreaInput, 500));

populateMessage();

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget.elements;
  console.log({ email: email.value.trim(), message: message.value.trim() });

  event.target.reset();

  localStorage.removeItem('KEY_STORAGE');
}
function onTextAreaInput(event) {
  const formData = {
    email: refs.input.value.trim(),
    message: refs.textarea.value.trim(),
  };
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
}

function populateMessage() {
  const validateForm = event => {
    event.preventDefault();
    if (email === '' || message === '') {
      alert('Будь-ласка, заповніть всі поля форми!');
    } else {
      const formData = {
        email: `${email.value.trim()}`,
        message: `${message.value.trim()}`,
      };
      console.log(formData);
      form.reset();
      localStorage.removeItem('KEY_STORAGE');
    }
  };
  form.addEventListener('submit', validateForm);
}
