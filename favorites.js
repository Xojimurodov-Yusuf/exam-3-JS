let allProduct = document.querySelector(".all-products");
let getProduct = JSON.parse(localStorage.getItem("product")) || []

if (!(getProduct || []).length) {
  allProduct.innerHTML = `
   <div class="favoriteError">
        <p class="favorite-text">Savatchangizda mahsulotlar yo'q</p>
        <img width="24" height="24" src="saveError.svg" alt="saveError">
    </div>
  `;
} else {
  getProduct.forEach((productInformationBasket) => {
    let creatediv = document.createElement("div");
    creatediv.innerHTML = `
          <div data-id="${productInformationBasket.id}" class="product">
                        <img class="product-image" src="${
                          productInformationBasket.image
                        }" alt="">
                        <div class="product-items">
                            <h1 class="product-name">${productInformationBasket.title.slice(
                              0,
                              19
                            )}</h1>
                            <p class="product-price">Price: ${
                              productInformationBasket.price
                            }$</p>
                            <p class="product-description">${productInformationBasket.description.slice(
                              0,
                              59
                            )}</p>
                            <p class="product-category">Category: ${
                              productInformationBasket.category
                            }</p>
                            <div class="product-rating">
                            <p class="rating-text">Rating: </p>
                              <img class="star-icon" src="star.png" alt="star">
                                <p class="rating">${
                                  productInformationBasket.rating.rate
                                }</p>
                            </div>
                            <button onclick="deleteProduct(${
                              productInformationBasket.id
                            })" class="product-delete">Delete</button>
                        </div>
                    </div>
        `;
    allProduct.append(creatediv);
  });
}

function deleteProduct(id) {
  getProduct = getProduct.filter((card) => card.id !== id);
  localStorage.setItem("product", JSON.stringify(getProduct));

  let cardToRemove = document.querySelector(`.product[data-id="${id}"]`);
  if (cardToRemove) {
    cardToRemove.remove();
  }

  if (getProduct.length === 0) {
    allProduct.innerHTML = `
     <div class="favoriteError">
        <p class="favorite-text">Savatchangizda mahsulotlar yo'q</p>
        <img width="24" height="24" src="saveError.svg" alt="saveError">
    </div>
    `;
  }
}

let modeInput = document.getElementById("checkbox");
modeInput.addEventListener("change", () => {
  document.body.classList.toggle("active", !modeInput.checked);
});

let searchInput = document.querySelector(".search-product");
searchInput.addEventListener("input", () => {
  function productFilter(filterName) {
    let inputValue = searchInput.value.toLowerCase();
    let filterProductRender = filterName.filter((name) =>
      name.title.toLowerCase().includes(inputValue)
    );

    renderProducts(filterProductRender);
  }
  productFilter(product);
});
