let cartSubtotal = document.getElementById("cart-subtotal");
let cartDiscount = document.getElementById("cart-discount");
let cartShipping = document.getElementById("cart-shipping");

let subTotal = parseFloat(cartSubtotal.textContent);
let discount = parseFloat(cartDiscount.textContent);
let shipping = 80;
let cartGrandTotal = document.getElementById("cart-grandtotal");

let cartItemsLocal = localStorage.getItem("cartItems");

if (cartItemsLocal) {
  let cartItems = JSON.parse(cartItemsLocal);

  for (var i = 0; i < cartItems.length; i++) {
    let product = cartItems[i];

    addCheckOutItem(
      product.name,
      parseFloat(product.price),
      product.img,
      product.quantity
    );

    updateTotalMultiply(parseFloat(product.price), product.quantity);
  }
}

function updateTotalMultiply(productPrice, productQuantity) {
  let quantityTotal = parseFloat(productPrice) * productQuantity;

  subTotal += quantityTotal;

  updateTotalCart(parseFloat(subTotal), discount);
}

function updateTotalCart(subTotal, discount) {
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

function addCheckOutItem(
  productName,
  productPrice,
  ProductImg,
  productQuantity
) {
  const parentElement = document.getElementById("checkout-items");

  let checkoutItem = document.createElement("div");
  checkoutItem.classList.add("checkout-item");

  // Create the img element
  let img = document.createElement("img");
  img.src = ProductImg;
  img.alt = "";

  // Create the div element for the image
  let checkoutItemImg = document.createElement("div");
  checkoutItemImg.classList.add("checkout-item-img");
  checkoutItemImg.appendChild(img);

  // Create the p element for the item name
  let itemName = document.createElement("p");
  itemName.classList.add("checkout-item-name");
  itemName.textContent = productName;

  // Create the span element for the item quantity
  let itemQuantity = document.createElement("span");
  itemQuantity.id = "checkout-item-quantity";
  itemQuantity.textContent = productQuantity;

  // Create the p element for the quantity
  let quantity = document.createElement("p");
  quantity.classList.add("checkout-item-quantity");
  quantity.textContent = "Quantity: ";
  quantity.appendChild(itemQuantity);

  // Create the span element for the item price
  let itemPrice = document.createElement("span");
  itemPrice.classList.add("checkout-item-price");
  itemPrice.textContent = productPrice;

  // Create the p element for the price container
  let priceContainer = document.createElement("p");
  priceContainer.classList.add("checkout-item-price-container");
  priceContainer.innerHTML = "₱ ";
  priceContainer.appendChild(itemPrice);

  // Create the div element for the content
  let checkoutItemContent = document.createElement("div");
  checkoutItemContent.classList.add("checkout-item-content");
  checkoutItemContent.appendChild(itemName);
  checkoutItemContent.appendChild(quantity);
  checkoutItemContent.appendChild(priceContainer);

  // Append the inner divs to the main div
  checkoutItem.appendChild(checkoutItemImg);
  checkoutItem.appendChild(checkoutItemContent);

  // Return the created checkout item
  parentElement.appendChild(checkoutItem);
}

const fullNameEl = document.getElementById("full-name-value");
const houseNoEl = document.getElementById("house-no-value");
const addressEl = document.getElementById("address-value");
const emailEl = document.getElementById("email-value");
const phoneNoEl = document.getElementById("phone-no-value");

let shippingInfoLocal = localStorage.getItem("shippingInfo");

if (shippingInfoLocal) {
  let shippingInfo = JSON.parse(shippingInfoLocal)[0];

  let fullName = `${shippingInfo.firstName} ${shippingInfo.lastName}`;
  let houseNo = `${shippingInfo.houseNo}`;
  let address = `${shippingInfo.barangay}, ${shippingInfo.city}, ${shippingInfo.province}, ${shippingInfo.zipCode}`;

  let email = shippingInfo.email;
  let phone = shippingInfo.phone;

  fullNameEl.textContent = fullName;
  houseNoEl.textContent = houseNo;
  addressEl.textContent = address;
  emailEl.textContent = email;
  phoneNoEl.textContent = phone;
}

const paymentMethod = document.getElementById("payment-method");

paymentMethod.addEventListener("submit", (event) => {
  event.preventDefault();

  window.location.href = "order-done.html";

  localStorage.clear();
});

function selectRadioButton(radioButtonId) {
  document.getElementById(radioButtonId).checked = true;
}
