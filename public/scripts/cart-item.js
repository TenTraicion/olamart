const cartItemForm = document.querySelectorAll(".cart-item-management");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const id = form.dataset.id;
  const csrf = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;

  try {
    response = await fetch(`/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        quantity: quantity,
        _csrf: csrf
      })
    });
  } catch (error) {
    return alert('Something went wrong. Please try again later.');
  }
  if (!response.ok) {
    return alert('Something went wrong. Please try again later.');
  }
  const responseData = await response.json();
}

for (const form of cartItemForm) {
  form.addEventListener('submit', updateCartItem);
}