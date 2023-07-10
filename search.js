const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const searchWrapper = document.querySelector(".search-wrapper");
const xButton = document.querySelector(".fa-xmark ");
const searchIconInside = document.querySelector(".search-icon-inside");

const searchResultsContainer = document.getElementById("search-results");

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    searchItems();
  }
});

searchIcon.addEventListener("click", () => {
  searchWrapper.classList.toggle("show");
  searchInput.focus();
});

xButton.addEventListener("click", () => {
  if (searchInput.value === "") {
    searchWrapper.classList.toggle("show");
  } else {
    searchInput.value = "";
  }
});

searchIconInside.addEventListener("click", () => {
  searchItems();
});

function searchItems() {
  const query = document.getElementById("search-input").value.trim();

  if (query !== "") {
    localStorage.setItem("searchQuery", query);

    window.location.href = "/search-result.html";
  }
}
