import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  const {
    email,
    name,
    passwordCurrent,
    password,
    confirmPassword,
    photo
  } = data;

  const url =
    type === 'password'
      ? '/api/v1/users/updatePassword'
      : '/api/v1/users/updateMe';
  try {
    const res = await fetch(url, {
      method: 'PATCH',

      body: JSON.stringify({
        email,
        name,
        photo,
        passwordCurrent,
        password,
        confirmPassword
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    if (data.status === 'success')
      showAlert('success', 'Data was successfully updated');
    else throw new Error('Please input correct data');
  } catch (err) {
    showAlert('error', err.message);
  }
};
