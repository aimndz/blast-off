let addToCartBtn = document.getElementById("add-to-cart");

addToCartBtn.addEventListener("click", () => {
  addToCart();
});

function disableBtn() {
  if (!addToCartBtn.classList.contains("selected")) {
    addToCartBtn.classList.add("selected");

    addToCartBtn.disabled = true;
    addToCart();
  }
}

function addToCart() {
  // Retrieve product information
  let productName = document.getElementById("product-name").innerText;
  let productPrice = document
    .getElementById("product-price")
    .innerText.replace(/,/g, "");
  let productImg = document.getElementById("product-img").src;
  // Create an object to hold the product details
  let productLink = window.location.href;

  let product = {
    name: productName,
    price: productPrice,
    img: productImg,
    quantity: 1,
    link: productLink,
  };

  let cartItems = localStorage.getItem("cartItems");

  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    let itemExists = false;

    cartItems.forEach((item) => {
      if (item.name === productName) {
        item.quantity += 1;
        addToCartBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> This item is already in your cart`;
        itemExists = true;
      }
    });

    if (!itemExists) {
      addToCartBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added';
      cartItems.push(product);
    }
  } else {
    cartItems = [product];
    addToCartBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added';
  }

  // Store the updated cart items back to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCartQuantity();
}

function updateCartQuantity() {
  cartItemsLocal = localStorage.getItem("cartItems");

  const shoppingCart = document.querySelector(".shopping-cart");
  let style = window.getComputedStyle(shoppingCart, "::after");
  let contentValue = style.getPropertyValue("content");
  let numberValue = contentValue.replace(/["'"]/g, "");

  if (cartItemsLocal) {
    let cartItems = JSON.parse(cartItemsLocal);
    let cartItemsQuantity = cartItems.length;

    contentValue = `"${cartItemsQuantity}"`;
    shoppingCart.style.setProperty("--cart-content", contentValue);
  }
}
