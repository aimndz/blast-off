/**********NAV RESPONSIVENESS**********/
const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = navLinks.getAttribute("data-visible");

  if (visibility === "false") {
    navLinks.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    navLinks.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

function searchItems() {
  // Get the search query
  const query = document.getElementById("search-input").value.trim();

  if (query !== "") {
    // Serialize the search query and store it in local storage
    localStorage.setItem("searchQuery", query);

    // Redirect the user to the search results page
    window.location.href = "search-result.html";
  }
}

updateCartQuantity();

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

/**********NAV RESPONSIVENESS**********/
