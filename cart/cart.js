let cartDiscount = document.getElementById("cart-discount");
let cartSubtotal = document.getElementById("cart-subtotal");
let cartShipping = document.getElementById("cart-shipping");
let cartGrandTotal = document.getElementById("cart-grandtotal");

let grandTotal = parseFloat(cartGrandTotal.textContent);
let subTotal = parseFloat(cartSubtotal.textContent);
let discount = parseFloat(cartDiscount.textContent);
let shipping = 80;

let cartEmptyEl = document.querySelector(".cart-empty");
let cartTotalEl = document.querySelector(".cart-total");
let cartContinue = document.querySelector(".cart-items-continue");

let cartItemsLocal = localStorage.getItem("cartItems");
let cartItems = JSON.parse(cartItemsLocal);

if (cartItemsLocal) {
  let cartItems = JSON.parse(cartItemsLocal);

  cartEmptyEl.style.display = "none";
  cartTotalEl.style.display = "block";
  cartContinue.style.display = "block";

  // Iterate over the cart items and display them in the cart
  for (var i = 0; i < cartItems.length; i++) {
    let product = cartItems[i];

    addCartItem(
      product.name,
      parseFloat(product.price),
      product.img,
      product.quantity,
      product.link
    );

    subTotal += updateTotalMultiply(
      parseFloat(product.price),
      product.quantity
    );

    updateCartQuantity();
    updateTotalCart(subTotal);
  }
}

function updateTotalSubtract(productPrice, productQuantity) {
  let quantityTotal = parseFloat(productPrice) * productQuantity;

  quantityTotal =
    quantityTotal - parseFloat(productPrice) * (productQuantity - 1);

  subTotal -= quantityTotal;

  updateTotalCart(subTotal);
}

function updateTotalRemove(productPrice, productQuantity) {
  let quantityTotal = parseFloat(productPrice) * productQuantity;

  subTotal -= quantityTotal;

  updateTotalCart(subTotal);
}

function updateTotalMultiply(productPrice, productQuantity) {
  let quantityTotal = parseFloat(productPrice) * parseFloat(productQuantity);
  return quantityTotal;
}

function updateTotalCart(subTotal) {
  cartSubtotal.textContent = subTotal.toLocaleString();
  cartDiscount.textContent = discount.toLocaleString();

  cartShipping.textContent = shipping.toLocaleString();

  cartGrandTotal.textContent = updateGrandTotal(
    subTotal,
    discount,
    shipping
  ).toLocaleString();
}

function updateGrandTotal(subTotal, discount, shipping) {
  return subTotal + discount + shipping;
}

/**********CART ITEM**********/
function addCartItem(
  productName,
  productPrice,
  productImg,
  productQuantity,
  productLink
) {
  // Get the parent element
  const parentElement = document.getElementById("cart-items");
  // Create the outer div element
  const outerDiv = document.createElement("div");
  outerDiv.className = "cart-item";

  // Create the img element and set its attributes
  const imgElement = document.createElement("img");
  imgElement.className = "cart-item-img";
  imgElement.src = productImg;
  imgElement.alt = "";
  outerDiv.appendChild(imgElement);

  // Create the inner div element with class "cart-item-details"
  const innerDiv = document.createElement("div");
  innerDiv.className = "cart-item-details";
  outerDiv.appendChild(innerDiv);

  // Create the left section of the inner div
  const leftDiv = document.createElement("div");
  leftDiv.className = "cart-item-details-left";
  innerDiv.appendChild(leftDiv);

  // Create the anchor element with a link
  const anchorElement = document.createElement("a");
  anchorElement.href = productLink;
  leftDiv.appendChild(anchorElement);

  // Create the p element with class "cart-item-name" and set its text content
  const nameElement = document.createElement("p");
  nameElement.className = "cart-item-name";
  nameElement.textContent = productName;
  anchorElement.appendChild(nameElement);

  // Create the quantity container
  const qtyContainerDiv = document.createElement("div");
  qtyContainerDiv.className = "cart-item-qty-container";
  leftDiv.appendChild(qtyContainerDiv);

  // Create the "Quantity:" text
  const quantityText = document.createElement("p");
  quantityText.textContent = "Quantity:";
  qtyContainerDiv.appendChild(quantityText);

  // Create the minus button
  const minusButton = document.createElement("button");
  minusButton.className = "cart-item-qty-minus";
  minusButton.textContent = "-";
  qtyContainerDiv.appendChild(minusButton);

  minusButton.addEventListener("click", quantityDecrease);

  // Create the quantity display
  const quantityDisplay = document.createElement("p");
  quantityDisplay.className = "cart-item-qty";
  quantityDisplay.textContent = productQuantity;
  qtyContainerDiv.appendChild(quantityDisplay);

  // Create the plus button
  const plusButton = document.createElement("button");
  plusButton.className = "cart-item-qty-add";
  plusButton.textContent = "+";
  qtyContainerDiv.appendChild(plusButton);

  plusButton.addEventListener("click", quantityIncrease);

  // Create the right section of the inner div
  const rightDivContainer = document.createElement("div");
  rightDivContainer.className = "cart-item-details-right-container";
  const rightDiv = document.createElement("div");
  rightDiv.className = "cart-item-details-right";
  rightDivContainer.appendChild(rightDiv);
  innerDiv.appendChild(rightDivContainer);

  // Create the price element and set its text content
  const priceElement = document.createElement("p");
  priceElement.className = "cart-item-price";
  priceElement.textContent = `₱ ${productPrice.toLocaleString()}`;
  rightDiv.appendChild(priceElement);

  // Create the trash icon element
  const trashIcon = document.createElement("i");
  trashIcon.className = "fa-regular fa-trash-can";
  rightDiv.appendChild(trashIcon);

  // Append the outer div element to the parent element
  parentElement.appendChild(outerDiv);
}

const qtyAdd = document.querySelectorAll(".cart-item-qty-add");
const qtyMinus = document.querySelectorAll(".cart-item-qty-minus");
const qtyElements = document.querySelectorAll(".cart-item .cart-item-qty");

const trashIcon = document.querySelectorAll(".fa-trash-can");
let cartItemsEl = document.querySelectorAll(".cart-item");

qtyAdd.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    let clickedQty = qtyElements[index];

    quantityIncrease(clickedQty, index);
    updateTotalCart(subTotal);
  });
});

function quantityIncrease(clickedQty, index) {
  let quantity = parseInt(clickedQty.textContent);

  if (index >= 0 && index < cartItems.length) {
    let product = cartItems[index];

    quantity++;
    clickedQty.textContent = quantity;
    cartItems[index].quantity = quantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    subTotal += parseFloat(product.price);
    cartSubtotal.textContent = subTotal.toLocaleString();
    cartGrandTotal.textContent = updateGrandTotal(
      subTotal,
      discount,
      shipping
    ).toLocaleString();
  }
}

qtyMinus.forEach((button, index) => {
  button.addEventListener("click", () => {
    let clickedQty = qtyElements[index];
    quantityDecrease(clickedQty, index);
  });
});

function quantityDecrease(clickedQty, index) {
  let quantity = parseInt(clickedQty.textContent);

  if (index >= 0 && index < cartItems.length) {
    let product = cartItems[index];

    if (quantity > 1) {
      quantity--;
      clickedQty.textContent = quantity;

      cartItems[index].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      updateTotalSubtract(product.price, product.quantity);
    } else {
      updateTotalSubtract(product.price, product.quantity);
      removeItem(index);
      updateCartQuantity();
      location.reload();
    }
  }

  let cartLocal = localStorage.getItem("cartItems");
  if (!cartLocal) {
    updateEmptyPage();
  }
}

trashIcon.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index >= 0 && index < cartItems.length) {
      let product = cartItems[index];

      if (product && product.price !== undefined) {
        updateTotalRemove(product.price, product.quantity);
        location.reload();
      } else {
        console.error("Invalid product or missing price property.");
      }

      removeItem(index);
      updateCartQuantity();

      let cartLocal = localStorage.getItem("cartItems");

      if (!cartLocal) {
        updateEmptyPage();
      }
    } else {
      console.error(
        "Invalid index or item does not exist in the cartItems array."
      );
      location.reload();
      console.log(index);
    }
  });
});

function removeItem(index) {
  cartItemsEl[index].parentNode.removeChild(cartItemsEl[index]);

  cartItemsEl = Array.from(cartItemsEl);
  cartItems.splice(index, 1);
  cartItemsEl.splice(index, 1);

  cartItemsEl.forEach((item, i) => {
    item.setAttribute("data-index", i);
  });

  if (cartItems.length > 0) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    localStorage.removeItem("cartItems");
  }
}

function removeItemPrice(productPrice, productQuantity) {}

function updateEmptyPage() {
  cartEmptyEl.style.display = "block";
  cartContinue.style.display = "none";
  cartTotalEl.style.display = "none";

  updateCartQuantity();
}

const checkOutButton = document.getElementById("checkout-btn");

checkOutButton.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

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
  } else {
    shoppingCart.style.setProperty("--cart-content", `"0"`);
  }
}
