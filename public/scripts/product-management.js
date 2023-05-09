const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
  const button = event.target;
  const id = button.dataset.id;
  const csrf = button.dataset.csrf;

  const response = await fetch(`/admin/products/${id}?_csrf=${csrf}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    return alert('Something went wrong!');
  }
  button.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const button of deleteProductButtonElements) {
  button.addEventListener('click', deleteProduct);
}