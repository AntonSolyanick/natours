import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    let res = await fetch('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    res = await res.json();

    if (res.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    if (res.status !== 'success') throw new Error(`${res.message}`);
  } catch (err) {
    showAlert('error', err);
  }
};

export const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout');
    const data = await res.json();
    if ((data.status = 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
