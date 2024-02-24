import catchAsync from '../../utils/catchAsync';
import { showAlert } from './alerts';

export const signup = async (name, email, password, confirmPassword) => {
  try {
    let res = await fetch('/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
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
