import '@babel/polyfill';

import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutButton = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');
const savePasswordButton = document.querySelector('.btn--save-password');
const bookButton = document.querySelector('#book-tour');

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    signup(name, email, password, confirmPassword);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

if (updateUserForm) {
  updateUserForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const photo = document.querySelector('#photo').files[0];

    // const form = new FormData();
    // form.append('name', document.getElementById('name').value);
    // form.append('email', document.getElementById('email').value);
    // form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);

    updateSettings({ email, name, photo }, 'data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#password-confirm').value;

    savePasswordButton.textContent = '...saving Password';
    await updateSettings(
      { passwordCurrent, password, confirmPassword },
      'password'
    );
    savePasswordButton.textContent = 'save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookButton) {
  bookButton.addEventListener('click', bookTour);
}
