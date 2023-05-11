const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
  let response;
  try{
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        id: addToCartButtonElement.dataset.id,
        _csrf: addToCartButtonElement.dataset.csrf
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    alert('Failed to add item to cart!');
    return;
  }
  if (!response.ok) {
    alert('Response Failure!');
    return;
  }
  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  
  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener('click', addToCart);