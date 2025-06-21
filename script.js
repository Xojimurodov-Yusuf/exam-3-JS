let product = [];

function basketProduct(id) {
  const productFilterId = product.find((productId) => productId.id === id);
  let getStrogage = JSON.parse(localStorage.getItem("product")) || [];
  getStrogage.push(productFilterId);
  let setStrogage = localStorage.setItem(
    "product",
    JSON.stringify(getStrogage)
  );
  alert("Sizning mahsulotingiz savatchaga tushirildi");
}

try {
  let getProducts = async function name() {
    const products = await fetch("https://fakestoreapi.com/products");
   product = await products.json();
    function renderProducts(renderProduct) {
      let allProducts = document.querySelector(".all-products");
      allProducts.innerHTML = "";
      renderProduct.forEach((productInformation) => {
        let createProduct = document.createElement("div");
        createProduct.innerHTML = `
         <div class="product">
                        <img class="product-image" src="${
                          productInformation.image
                        }" alt="">
                        <div class="product-items">
                            <h1 class="product-name">${productInformation.title.slice(
                              0,
                              19
                            )}</h1>
                            <p class="product-price">Price: ${
                              productInformation.price
                            }$</p>
                            <p class="product-description">${productInformation.description.slice(
                              0,
                              59
                            )}</p>
                            <p class="product-category">Category: ${
                              productInformation.category
                            }</p>
                            <div class="product-rating">
                            <p class="rating-text">Rating: </p>
                              <img class="star-icon" src="star.png" alt="star">
                                <p class="rating">${
                                  productInformation.rating.rate
                                }</p>
                            </div>
                            <button onclick="basketProduct(${
                              productInformation.id
                            })" class="product-basket">Basket</button>
                        </div>
                    </div>
        `;
        allProducts.append(createProduct);
      });
    }
    renderProducts(product);

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

    let modeInput = document.getElementById("checkbox");
    modeInput.addEventListener("change", () => {
      document.body.classList.toggle("active", !modeInput.checked);
    });

    let priceSelect = document.querySelector(".filter-select");
    priceSelect.addEventListener("change", () => {
      let priceSelectValue = priceSelect.value;
      let filteredPrice;
      if (priceSelectValue === "all") {
        renderProducts(product);
        return;
      } else if (priceSelectValue === "expensive-cheap")
        filteredPrice = [...product].sort((a, b) => b.price - a.price);
      else if (priceSelectValue === "cheap-expensive")
        filteredPrice = [...product].sort((a, b) => a.price - b.price);
      renderProducts(filteredPrice);
    });

    let categoryFiterSelect = document.querySelector(".category-fiter-select");
    categoryFiterSelect.addEventListener("change", () => {
      let categorySelectValue = categoryFiterSelect.value;
      let filterCategory;
      if (categorySelectValue === "all") {
        renderProducts(product);
        return;
      } else if (categorySelectValue === "mens-clothing")
        filterCategory = [...product].filter(
          (category) => category.category === "men's clothing"
        );
      else if (categorySelectValue === "womens-clothing")
        filterCategory = [...product].filter(
          (category) => category.category === "women's clothing"
        );
      else if (categorySelectValue === "electronics")
        filterCategory = [...product].filter(
          (category) => category.category === "electronics"
        );
      else if (categorySelectValue === "jewelery")
        filterCategory = [...product].filter(
          (category) => category.category === "jewelery"
        );

      renderProducts(filterCategory);
    });
  };
  getProducts();
} catch (e) {
  alert(e + "error");
}
