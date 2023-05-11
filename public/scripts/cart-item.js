const cartItemForm = document.querySelectorAll(".cart-item-management");
const cartBadges = document.querySelectorAll('.nav-items .badge');
const cartTotal = document.getElementById('cart-total-price');

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const id = form.dataset.id;
  const csrf = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;

  try {
    response = await fetch(`/cart/items`, {
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

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPrice = form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPrice.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }
  cartTotal.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);
  for (const cartBadge of cartBadges){
    cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
  }
}

for (const form of cartItemForm) {
  form.addEventListener('submit', updateCartItem);
}