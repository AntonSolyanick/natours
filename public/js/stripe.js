import { showAlert } from './alerts';

// const stripe = Stripe(
//   'pk_test_51OmtHfHBCJMgom8OoJlqJPRJeMw8Jeqz3K575lxBuWiI2OXVaRGKX7bBLlhewtvRDshJAHFgbfQuhCUmSnMj5Ae900AanXk3pI'
// );

export const bookTour = async tourId => {
  try {
    const session = await fetch(
      '/api/v1/bookings/checkout-session/5c88fa8cf4afda39709c2955'
    );

    // await stripe.redirectToCheckout({
    //   sessionId: session.url
    // });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
