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

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userFirstName = document.getElementById("first-name").value;
  const userLastName = document.getElementById("last-name").value;

  const userHouseNo = document.getElementById("house-no").value;
  const userBarangay = document.getElementById("barangay").value;
  const userCity = document.getElementById("city").value;
  const userProvice = document.getElementById("province").value;
  const userZipCode = document.getElementById("zip-code").value;

  const userEmailAddress = document.getElementById("email-address").value;
  const userPhoneNumber = document.getElementById("phone-number").value;

  let info = {
    firstName: userFirstName,
    lastName: userLastName,

    houseNo: userHouseNo,
    barangay: userBarangay,
    city: userCity,
    province: userProvice,
    zipCode: userZipCode,

    email: userEmailAddress,
    phone: userPhoneNumber,
  };

  let shippingInfo = localStorage.getItem("shippingInfo");

  if (shippingInfo) {
    shippingInfo = JSON.parse(shippingInfo);

    shippingInfo[0].firstName = userFirstName;
    shippingInfo[0].lastName = userLastName;

    shippingInfo[0].houseNo = userHouseNo;
    shippingInfo[0].barangay = userBarangay;
    shippingInfo[0].city = userCity;
    shippingInfo[0].province = userProvice;
    shippingInfo[0].zipCode = userZipCode;

    shippingInfo[0].email = userEmailAddress;
    shippingInfo[0].phone = userPhoneNumber;
  } else {
    shippingInfo = [];
    shippingInfo.push(info);
  }

  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

  window.location.href = "placeorder.html";
});

// Set default values if shipping info exists in local storage
let shippingInfo = localStorage.getItem("shippingInfo");

if (shippingInfo) {
  shippingInfo = JSON.parse(shippingInfo);

  // Set default values for the input fields
  document.getElementById("first-name").value = shippingInfo[0].firstName;
  document.getElementById("last-name").value = shippingInfo[0].lastName;
  document.getElementById("house-no").value = shippingInfo[0].houseNo;
  document.getElementById("barangay").value = shippingInfo[0].barangay;
  document.getElementById("city").value = shippingInfo[0].city;
  document.getElementById("province").value = shippingInfo[0].province;
  document.getElementById("zip-code").value = shippingInfo[0].zipCode;
  document.getElementById("email-address").value = shippingInfo[0].email;
  document.getElementById("phone-number").value = shippingInfo[0].phone;
}
